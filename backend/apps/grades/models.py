from django.db import models
from django.core.exceptions import ValidationError


class Subject(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Grade(models.Model):
    student = models.ForeignKey(
        'students.Student', on_delete=models.CASCADE, related_name='grades')
    subject = models.ForeignKey(
        Subject, on_delete=models.CASCADE, related_name='grades')
    school_year = models.CharField(max_length=20)
    grade_section = models.CharField(max_length=20)
    q1_grade = models.CharField(max_length=2)
    q2_grade = models.CharField(max_length=2)
    q3_grade = models.CharField(max_length=2)
    q4_grade = models.CharField(max_length=2)
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

    def save(self, *args, **kwargs):
        # Convert numeric grades to letter grades before saving
        if self.q1_grade.isdigit():
            self.q1_grade = self.convert_to_letter_grade(int(self.q1_grade))
        if self.q2_grade.isdigit():
            self.q2_grade = self.convert_to_letter_grade(int(self.q2_grade))
        if self.q3_grade.isdigit():
            self.q3_grade = self.convert_to_letter_grade(int(self.q3_grade))
        if self.q4_grade.isdigit():
            self.q4_grade = self.convert_to_letter_grade(int(self.q4_grade))

        # Calculate the final grade based on quarter grades
        if all([self.q1_grade, self.q2_grade, self.q3_grade, self.q4_grade]):
            scores = [int(x) for x in [self.q1_grade, self.q2_grade,
                                       self.q3_grade, self.q4_grade] if x.isdigit()]
            if scores:
                average_score = sum(scores) / len(scores)
                self.final_grade = self.convert_to_letter_grade(
                    int(average_score))

        super().save(*args, **kwargs)
