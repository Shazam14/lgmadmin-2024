from django.db import models
from django.core.exceptions import ValidationError
from django.core.validators import RegexValidator


class Subject(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(default='Subject description')

    def __str__(self):
        return self.name


class Program(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    age_range = models.CharField(max_length=50, blank=True, null=True)

    def __str__(self):
        return self.name


class GradeLevel(models.Model):
    program = models.ForeignKey(
        Program, on_delete=models.CASCADE, default=1)
    name = models.CharField(max_length=100)
    subjects = models.ManyToManyField(Subject, related_name='grade_levels')

    def __str__(self):
        return self.name


class AcademicPeriod(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name


class AcademicPeriodMapping(models.Model):
    academic_period = models.ForeignKey(
        AcademicPeriod, on_delete=models.CASCADE)
    grade_level = models.ForeignKey(GradeLevel, on_delete=models.CASCADE)
    subjects = models.ManyToManyField(Subject)

    def __str__(self):
        return f"{self.academic_period} - {self.grade_level}"


class CASAProgram(models.Model):
    program = models.OneToOneField(
        Program, on_delete=models.CASCADE, primary_key=True)
    curriculum_areas = models.JSONField()
    evaluation_criteria = models.JSONField()

    def __str__(self):
        return self.program.name


class GradeSchoolProgram(models.Model):
    program = models.OneToOneField(
        Program, on_delete=models.CASCADE, primary_key=True)
    curriculum_subjects = models.JSONField()

    def __str__(self):
        return self.program.name


class HighSchoolSubject(models.Model):
    subject = models.OneToOneField(
        Subject, on_delete=models.CASCADE, primary_key=True)

    def __str__(self):
        return self.subject.name


class InstructionalProgram(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()

    def __str__(self):
        return self.name


class SpecialEducationProgram(models.Model):
    program = models.OneToOneField(
        Program, on_delete=models.CASCADE, primary_key=True)
    instructional_programs = models.ManyToManyField(InstructionalProgram)

    def __str__(self):
        return self.program.name


class Grade(models.Model):
    GRADE_CHOICES = [
        ('Advanced', 'Advanced'),
        ('Proficient', 'Proficient'),
        ('Approaching Proficiency', 'Approaching Proficiency'),
        ('Developing', 'Developing'),
        ('Beginning', 'Beginning'),
    ]

    student = models.ForeignKey(
        "students.Student", on_delete=models.CASCADE, related_name='student_grades')
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE)
    written_work = models.FloatField(default=0)
    performance_task = models.FloatField(default=0)
    quarterly_exam = models.FloatField(default=0)
    quarterly_grade = models.FloatField(default=0) #no input
    final_grade = models.FloatField(default=0)
    evaluation_code = models.CharField(
        max_length=30, choices=GRADE_CHOICES, default='Beginning')
    remedial_passed = models.BooleanField(default=False)
    cle_mve_grade = models.FloatField(default=0)

    def calculate_quarterly_grade(self):
        ww_weight = self.written_work * 0.4
        pt_weight = self.performance_task * 0.4
        qe_weight = self.quarterly_exam * 0.2
        self.quarterly_grade = ww_weight + pt_weight + qe_weight
        self.save()

    def calculate_final_grade(self):
        # Assuming there are four quarters
        q1 = Grade.objects.get(student=self.student,
                               subject=self.subject, quarter=1).quarterly_grade
        q2 = Grade.objects.get(student=self.student,
                               subject=self.subject, quarter=2).quarterly_grade
        q3 = Grade.objects.get(student=self.student,
                               subject=self.subject, quarter=3).quarterly_grade
        q4 = Grade.objects.get(student=self.student,
                               subject=self.subject, quarter=4).quarterly_grade
        self.final_grade = (q1 + q2 + q3 + q4) / 4
        self.save()

    def determine_evaluation_code(self):
        if self.final_grade >= 90:
            self.evaluation_code = 'Advanced'
        elif self.final_grade >= 85:
            self.evaluation_code = 'Proficient'
        elif self.final_grade >= 80:
            self.evaluation_code = 'Approaching Proficiency'
        elif self.final_grade >= 75:
            self.evaluation_code = 'Developing'
        else:
            self.evaluation_code = 'Beginning'
        self.save()

    def __str__(self):
        return f"{self.student.name} - {self.subject}"
