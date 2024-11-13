from django.db import models


from django.db import models
from phonenumber_field.modelfields import PhoneNumberField


class Parent(models.Model):
    first_name = models.CharField(max_length=50)
    middle_name = models.CharField(max_length=50, null=True, blank=True)
    last_name = models.CharField(max_length=50)
    email = models.EmailField()
    phone_number = PhoneNumberField(null=True, blank=True)
    street_address = models.CharField(max_length=255)
    city = models.CharField(max_length=50)
    state_province = models.CharField(max_length=50)
    account_status = models.CharField(max_length=20, default='Active', choices=[
        ('Active', 'Active'), ('Inactive', 'Inactive')])
    relationship = models.CharField(max_length=50, choices=[
        ('Mother', 'Mother'), ('Father', 'Father'), ('Guardian', 'Guardian')
    ])
    primary_contact_value = PhoneNumberField(null=True, blank=True)
    contact_priority = models.CharField(max_length=20, choices=[
        ('Primary', 'Primary'), ('Secondary', 'Secondary')
    ])
    attended_conferences = models.BooleanField(default=False)
    participated_activities = models.BooleanField(default=False)
    returned_reply_slips = models.BooleanField(default=False)
    outstanding_parent_award = models.BooleanField(default=False)
    access_code = models.CharField(
        max_length=20, unique=True, null=True, blank=True)
    portal_access_enabled = models.BooleanField(default=False)

    # add employment fields
    occupation = models.CharField(max_length=100, null=True, blank=True)
    employer = models.CharField(max_length=200, null=True, blank=True)
    employer_address = models.TextField(null=True, blank=True)
    work_phone = PhoneNumberField(null=True, blank=True)

    employment_status = models.CharField(max_length=20, choices=[
        ('Employed', 'Employed'), ('Unemployed', 'Unemployed'),
        ('Self-Employed', 'Self-Employed'), ('Retired', 'Retired')
    ], default='Unemployed')
    # add other fields as needed

    def generate_access_code(self):
        """Generate a unique access code for the parent."""
        import random
        import string
        while True:
            code = ''.join(random.choices(
                string.ascii_letters + string.digits, k=8))
            if not Parent.objects.filter(access_code=code).exists():
                self.access_code = code
                self.portal_access_enabled = True
                self.save(update_fields=[
                          'access_code', 'portal_access_enabled'])
                return code

    def enable_portal_access(self):
        """Enable portal access for the parent."""
        if not self.access_code:
            self.generate_access_code()
        self.portal_access_enabled = True
        self.save(update_fields=['portal_access_enabled'])

    def save(self, *args, **kwargs):
        # Only check signed journals if the instance has been saved
        if self.pk:
            try:
                self.outstanding_parent_award = (
                    self.attended_conferences and
                    self.participated_activities and
                    self.returned_reply_slips and
                    self.signed_journals.exists()
                )
            except ValueError:
                # Handle case when related manager can't be accessed yet
                self.outstanding_parent_award = False
        else:
            self.outstanding_parent_award = False

        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"


class SignedJournal(models.Model):
    parent = models.ForeignKey(
        'parents.Parent', on_delete=models.CASCADE, related_name='signed_journals')
    teacher = models.ForeignKey(
        'teachers.Teacher', on_delete=models.CASCADE, related_name='provided_journals')
    student = models.ForeignKey(
        'students.Student', on_delete=models.CASCADE, related_name='signed_journals')
    date_signed = models.DateTimeField(auto_now_add=True)
    content = models.TextField()
    parent_notes = models.CharField(max_length=100, default='Remarks')
