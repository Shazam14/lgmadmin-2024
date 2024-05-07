from django.db import models
from django.core.exceptions import ValidationError
from django.core.validators import RegexValidator


class Subject(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class GradeLevel(models.Model):
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


class Grade(models.Model):
    student = models.ForeignKey(
        'students.Student', on_delete=models.CASCADE, related_name='grades')
    subject = models.ForeignKey(
        Subject, on_delete=models.CASCADE, related_name='grades')
    grade_level = models.ForeignKey(
        GradeLevel, on_delete=models.CASCADE, related_name='grades', default=1)
    academic_period_mapping = models.ForeignKey(
        AcademicPeriodMapping, on_delete=models.CASCADE, related_name='grades', default=1)
    school_year = models.CharField(
        max_length=9,
        validators=[RegexValidator(
            regex=r'^\d{4}-\d{4}$',
            message='School year must be in the format YYYY-YYYY'
        )]
    )

    GRADE_CHOICES = [
        ('A', 'A'),
        ('B', 'B'),
        ('C', 'C'),
        ('D', 'D'),
        ('F', 'F'),
    ]

    grade_section = models.CharField(max_length=20)
    q1_grade = models.CharField(max_length=1, choices=GRADE_CHOICES)
    q2_grade = models.CharField(max_length=1, choices=GRADE_CHOICES)
    q3_grade = models.CharField(max_length=1, choices=GRADE_CHOICES)
    q4_grade = models.CharField(max_length=1, choices=GRADE_CHOICES)
    final_grade = models.CharField(max_length=2)
    remarks = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.student} - {self.subject} - {self.school_year}"

    def convert_to_letter_grade(self, score):
        """Converts a numeric score to a letter grade based on predefined ranges."""
        if 90 <= score <= 100:
            return 'A'
        elif 85 <= score < 90:
            return 'P'
        elif 80 <= score < 85:
            return 'AP'
        elif 75 <= score < 80:
            return 'D'
        elif score < 75:
            return 'B'
        else:
            raise ValidationError(
                "Score must be within the range of 0 to 100.")

    def get_gpa(self):
        grade_mapping = {'A': 4, 'B': 3, 'C': 2, 'D': 1, 'F': 0}
        return grade_mapping.get(self.final_grade, 0)

    @property
    def is_passing(self):
        return self.final_grade in ['A', 'B', 'C']

    def save(self, *args, **kwargs):
        # Convert letter grades to numeric scores
        grade_mapping = {'A': 4, 'B': 3, 'C': 2, 'D': 1, 'F': 0}
        scores = [grade_mapping.get(x, 0) for x in [
            self.q1_grade, self.q2_grade, self.q3_grade, self.q4_grade]]

        # Calculate the final grade based on quarter grades
        if all(scores):
            average_score = sum(scores) / len(scores)
            self.final_grade = self.convert_to_letter_grade(average_score)

        super().save(*args, **kwargs)
