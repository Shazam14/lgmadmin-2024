from django.db import models


class Parent(models.Model):
    first_name = models.CharField(max_length=50)
    middle_name = models.CharField(max_length=50, blank=True)
    last_name = models.CharField(max_length=50)
    email = models.EmailField()
    phone_number = models.CharField(max_length=15)
    street_address = models.CharField(max_length=255)
    city = models.CharField(max_length=50)
    state_province = models.CharField(max_length=50)
    parent_id = models.CharField(max_length=20, primary_key=True)
    account_status = models.CharField(max_length=20, default='Active', choices=[
                                      ('Active', 'Active'), ('Inactive', 'Inactive')])
    relationship = models.CharField(max_length=50, choices=[(
        'Mother', 'Mother'), ('Father', 'Father'), ('Guardian', 'Guardian')])
    primary_contact = models.CharField(max_length=15)
    secondary_contact = models.CharField(max_length=15, blank=True)
    contact_priority = models.CharField(
        max_length=20, choices=[('Primary', 'Primary'), ('Secondary', 'Secondary')])
    attended_conferences = models.BooleanField(default=False)
    participated_activities = models.BooleanField(default=False)
    returned_reply_slips = models.BooleanField(default=False)
    outstanding_parent_award = models.BooleanField(default=False)

    def save(self, *args, **kwargs):
        # Calculate the outstanding parent award status before saving
        self.outstanding_parent_award = (self.attended_conferences and
                                         self.participated_activities and
                                         self.returned_reply_slips and
                                         self.signed_journals.exists())
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.first_name} {self.last_name} ({self.parent_id})"


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
