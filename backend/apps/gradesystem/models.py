from django.db import models
from apps.students.models import Student


class GradeSystem(models.Model):
    GRADE_CHOICES = [
        ('Advanced', 'Advanced'),
        ('Proficient', 'Proficient'),
        ('Approaching Proficiency', 'Approaching Proficiency'),
        ('Developing', 'Developing'),
        ('Beginning', 'Beginning'),
    ]

    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    subject = models.CharField(max_length=100)
    written_work = models.FloatField(default=0)
    performance_task = models.FloatField(default=0)
    quarterly_exam = models.FloatField(default=0)
    quarterly_grade = models.FloatField(default=0)
    final_grade = models.FloatField(default=0)
    evaluation_code = models.CharField(max_length=30, choices=GRADE_CHOICES)
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
