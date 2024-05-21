from apps.grades.models import Grade, Program
from django.db import models


class Student(models.Model):
    TUITION_STATUS_CHOICES = [
        ('U', 'Unsettled'),
        ('FP', 'Fully Paid'),
    ]
    ACCOUNT_STATUS_CHOICES = [
        ('A', 'Active'),
        ('I', 'Inactive')
    ]

    applicant = models.OneToOneField(
        'applicants.Applicant', on_delete=models.CASCADE, related_name='students')
    program = models.ForeignKey(
        'grades.Program', on_delete=models.CASCADE, default=1)
    first_name = models.CharField(max_length=50)
    middle_name = models.CharField(max_length=50, blank=True)
    last_name = models.CharField(max_length=50)
    gender = models.CharField(max_length=10)
    age = models.PositiveIntegerField(
        default=2, help_text="Age of the applicant in years.")
    birthday = models.DateField(null=True, blank=True)
    email = models.EmailField()
    student_id = models.CharField(max_length=20, unique=True)
    student_status = models.CharField(max_length=20)
    grade = models.CharField(max_length=20)
    section = models.CharField(max_length=20)
    tuition_notes = models.TextField(blank=True)
    tuition_status = models.CharField(
        max_length=20, choices=TUITION_STATUS_CHOICES)
    account_status = models.CharField(
        max_length=20, choices=ACCOUNT_STATUS_CHOICES)
    # additional for Grading
    promoted = models.BooleanField(default=False)
    elementary_certificate = models.BooleanField(default=False)
    junior_high_certificate = models.BooleanField(default=False)
    attendance_percentage = models.FloatField(
        default=0.0, help_text="Percentage of classes attended.")

    def check_promotion_status(self):
        grades = Grade.objects.filter(student=self)
        failing_grades = grades.filter(final_grade__lt=75).count()

        if self.program.gradelevel.name in ['Grade 1', 'Grade 2', 'Grade 3']:
            if failing_grades == 0:
                self.promoted = True
            elif failing_grades <= 2:
                if all(grade.remedial_passed for grade in grades.filter(final_grade__lt=75)):
                    self.promoted = True
                else:
                    self.promoted = False
            else:
                self.promoted = False
        elif self.program.gradelevel.name in ['Grade 4', 'Grade 5', 'Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10']:
            if failing_grades == 0:
                self.promoted = True
                if self.program.gradelevel.name == 'Grade 6':  # End of Elementary
                    self.elementary_certificate = True
                elif self.program.gradelevel.name == 'Grade 10':  # End of Junior High School
                    self.junior_high_certificate = True
            elif failing_grades <= 2:
                if all(grade.remedial_passed for grade in grades.filter(final_grade__lt=75)):
                    self.promoted = True
                else:
                    self.promoted = False
            else:
                self.promoted = False
        self.save()

    def check_awards(self):
        grades = Grade.objects.filter(student=self)

        # Exemplary Conduct Award
        if all(grade.cle_mve_grade >= 92 for grade in grades) and not self.disciplinary_actions:
            self.exemplary_conduct_award = True

        # Leadership Award
        if all(grade.cle_mve_grade >= 92 for grade in grades) and self.leadership_score >= 92:
            self.leadership_award = True

        # Perfect Attendance Award
        if self.attendance_percentage == 100:
            self.perfect_attendance_award = True

        # Meritorious Award
        meritorious_subjects = ['Araling Panlipunan', 'MAPEH', 'HELE/TLE']
        if all(grade.final_grade >= 92 for grade in grades if grade.subject.name in meritorious_subjects):
            self.meritorious_award = True

        # Subject Excellence Award
        if all(grade.final_grade >= 92 for grade in grades) and all(grade.final_grade >= 75 for grade in grades):
            self.subject_excellence_award = True

        # Academic Excellence Award
        if all(grade.final_grade >= 92 for grade in grades):
            self.academic_excellence_award = True

        # Most Outstanding Student Award
        if self.program.gradelevel.name == 'Grade 10' and all(grade.final_grade >= 95 for grade in grades) and self.years_in_school >= 7 and not self.disciplinary_actions:
            self.most_outstanding_student_award = True

        # LGMS Loyalty Award
        if self.program.gradelevel.name == 'Grade 10' and self.years_in_school == 10:
            self.lgms_loyalty_award = True

        self.save()

    def __str__(self):
        return f"{self.first_name} {self.last_name} ({self.student_id})"
