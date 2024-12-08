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
    preferred_name = models.CharField(
        max_length=50, unique=True, blank=True, null=True)
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
    grade = models.CharField(max_length=50)
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
    access_code = models.CharField(
        max_length=20, unique=True, null=True, blank=True)
    portal_access_enabled = models.BooleanField(default=False)

    nationality = models.CharField(max_length=100, null=True, blank=True)
    # for awards
    exemplary_conduct_award = models.BooleanField(default=False)
    leadership_award = models.BooleanField(default=False)
    perfect_attendance_award = models.BooleanField(default=False)
    meritorious_award = models.BooleanField(default=False)

    def get_full_profile(self):
        """Get complete student profile for portal"""
        return {
            'personal': self.get_personal_info(),
            'academic': self.get_academic_info(),
            'characteristics': self.characteristics.get_data(),
            'medical': self.medical.get_data(),
            'awards': self.get_awards_info()
        }

    def generate_access_code(self):
        """Generate a unique access code for the student."""
        import random
        import string
        while True:
            code = ''.join(random.choices(
                string.ascii_letters + string.digits, k=8))
            if not Student.objects.filter(access_code=code).exists():
                self.access_code = code
                self.portal_access_enabled = True
                self.save()
                return code

    def enable_portal_access(self):
        """Enable portal access for the student."""
        if not self.access_code:
            self.generate_access_code()
        self.portal_access_enabled = True
        self.save()

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


class StudentCharacteristics(models.Model):
    student = models.OneToOneField(
        Student,
        on_delete=models.CASCADE,
        related_name='characteristics'
    )
    eye_color = models.CharField(max_length=50, blank=True)
    hair_color = models.CharField(max_length=50, blank=True)
    distinguishing_marks = models.TextField(blank=True)

    def get_data(self):
        """Format data for frontend"""
        return {
            'physical': {
                'height': self.height,
                'weight': self.weight,
                'eye_color': self.eye_color,
                'hair_color': self.hair_color,
            },
            'traits': {
                'temperament': self.temperament,
                'interests': self.interests,
                'strengths': self.strengths,
                'challenges': self.challenges,
                'selected_traits': self.selected_traits
            },
            'custom': self.custom_fields
        }


class StudentMedical(models.Model):
    VACCINATION_STATUS_CHOICES = [
        ('COMPLETE', 'Complete'),
        ('PARTIAL', 'Partial'),
        ('PENDING', 'Pending'),
        ('EXEMPT', 'Exempt')
    ]

    student = models.OneToOneField(
        'Student',
        on_delete=models.CASCADE,
        related_name='medical'
    )

    # Basic Medical Info
    blood_type = models.CharField(
        max_length=10,
        choices=[
            ('O+', 'O+'), ('O-', 'O-'),
            ('A+', 'A+'), ('A-', 'A-'),
            ('B+', 'B+'), ('B-', 'B-'),
            ('AB+', 'AB+'), ('AB-', 'AB-'),
        ]
    )
    allergies = models.TextField(blank=True)
    medications = models.TextField(blank=True)
    conditions = models.TextField(blank=True)

    # Emergency Contacts
    emergency_contact = models.TextField()
    doctor_name = models.CharField(max_length=100)
    doctor_contact = models.CharField(max_length=100)

    # Medical History
    last_checkup = models.DateField(null=True, blank=True)
    medical_notes = models.TextField(blank=True)

    # Vaccination Records
    vaccination_status = models.CharField(
        max_length=20,
        choices=VACCINATION_STATUS_CHOICES,
        default='PENDING'
    )
    vaccination_records = models.JSONField(
        default=dict,
        help_text="""
        Format: {
            "vaccine_name": {
                "doses": [
                    {
                        "date": "YYYY-MM-DD",
                        "batch_number": "string",
                        "healthcare_provider": "string",
                        "next_due_date": "YYYY-MM-DD"
                    }
                ],
                "status": "complete/incomplete",
                "notes": "string"
            }
        }
        """
    )
    vaccination_exemption_reason = models.TextField(
        blank=True,
        help_text="Required if vaccination status is 'EXEMPT'"
    )

    # Health Insurance
    insurance_provider = models.CharField(max_length=100, blank=True)
    insurance_policy_number = models.CharField(max_length=100, blank=True)
    insurance_expiry_date = models.DateField(null=True, blank=True)

    class Meta:
        verbose_name = "Medical Record"
        verbose_name_plural = "Medical Records"

    def get_vaccination_summary(self):
        """Get a summary of vaccination status"""
        return {
            'status': self.vaccination_status,
            'complete_vaccines': self._get_complete_vaccines(),
            'pending_vaccines': self._get_pending_vaccines(),
            'upcoming_doses': self._get_upcoming_doses()
        }

    def _get_complete_vaccines(self):
        """Get list of completed vaccinations"""
        return [
            name for name, data in self.vaccination_records.items()
            if data.get('status') == 'complete'
        ]

    def _get_pending_vaccines(self):
        """Get list of pending vaccinations"""
        return [
            name for name, data in self.vaccination_records.items()
            if data.get('status') == 'incomplete'
        ]

    def _get_upcoming_doses(self):
        """Get list of upcoming vaccination doses"""
        upcoming = []
        for vaccine_name, data in self.vaccination_records.items():
            for dose in data.get('doses', []):
                next_due = dose.get('next_due_date')
                if next_due:
                    upcoming.append({
                        'vaccine': vaccine_name,
                        'due_date': next_due
                    })
        return sorted(upcoming, key=lambda x: x['due_date'])

    def add_vaccination(self, vaccine_name, dose_date, batch_number,
                        healthcare_provider, next_due_date=None):
        """Add a new vaccination record"""
        if not self.vaccination_records.get(vaccine_name):
            self.vaccination_records[vaccine_name] = {
                'doses': [],
                'status': 'incomplete',
                'notes': ''
            }

        self.vaccination_records[vaccine_name]['doses'].append({
            'date': dose_date,
            'batch_number': batch_number,
            'healthcare_provider': healthcare_provider,
            'next_due_date': next_due_date
        })

        if not next_due_date:
            self.vaccination_records[vaccine_name]['status'] = 'complete'

        self.save()

    def get_data(self):
        """Format medical data for frontend"""
        return {
            'basic': {
                'blood_type': self.blood_type,
                'allergies': self.allergies,
                'medications': self.medications,
                'conditions': self.conditions
            },
            'contacts': {
                'doctor_name': self.doctor_name,
                'doctor_contact': self.doctor_contact,
                'emergency_contact': self.emergency_contact
            },
            'history': {
                'last_checkup': self.last_checkup,
                'medical_notes': self.medical_notes
            },
            'vaccinations': {
                'status': self.vaccination_status,
                'summary': self.get_vaccination_summary(),
                'records': self.vaccination_records,
                'exemption_reason': self.vaccination_exemption_reason if self.vaccination_status == 'EXEMPT' else None
            },
            'insurance': {
                'provider': self.insurance_provider,
                'policy_number': self.insurance_policy_number,
                'expiry_date': self.insurance_expiry_date
            }
        }

    def __str__(self):
        return f"Medical Record - {self.student.first_name} {self.student.last_name}"


class StudentLivingArrangement(models.Model):
    student = models.OneToOneField(
        Student,
        on_delete=models.CASCADE,
        related_name='living_arrangement'
    )
    current_arrangement = models.CharField(
        max_length=50,
        choices=[
            ('BOTH_PARENTS', 'With Both Parents'),
            ('FATHER', 'With Father'),
            ('MOTHER', 'With Mother'),
            ('GUARDIAN', 'With Guardian')
        ]
    )
    address = models.TextField()
    transportation_method = models.CharField(max_length=50)
    bus_route = models.CharField(max_length=50, blank=True)
    pickup_time = models.TimeField(null=True)
    dropoff_time = models.TimeField(null=True)
    special_instructions = models.TextField(blank=True)


class AttendanceRecord(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    date = models.DateField()
    status = models.CharField(max_length=10, choices=[
                              ('Present', 'Present'), ('Absent', 'Absent')])
    remarks = models.CharField(max_length=100, blank=True, null=True)

    def __str__(self):
        return f"{self.student.first_name} {self.student.last_name} - {self.date} - {self.status}"
