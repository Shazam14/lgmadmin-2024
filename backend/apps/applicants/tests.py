from django.test import TestCase, override_settings
from django.urls import reverse
from rest_framework import status
from apps.applicants.models import Applicant
from apps.parents.models import Parent
from apps.grades.models import Program
from django.core import mail
from django.core.mail import EmailMessage
from apps.students.models import Student
from unittest.mock import patch, ANY, call
from apps.applicants.views import ApplicantApprovalView
import re


@override_settings(EMAIL_BACKEND="django.core.mail.backends.locmem.EmailBackend")
class ApplicantApprovalViewTest(TestCase):
    def setUp(self):
        # Create necessary Program entries in the database
        Program.objects.create(
            name="Playgroup Program", description="1.8 to 2.6 years old"
        )
        Program.objects.create(name="CASA Program",
                               description="2.6 to 6 years old")
        Program.objects.create(
            name="Elementary Program", description="6 to 12 years old"
        )
        Program.objects.create(name="Junior High School",
                               description="Grade 7 to 10")
        Program.objects.create(name="SPED-T.E.A.C.H", description="T.E.A.C.H")

        # Create a Parent entry in the database
        self.parent = Parent.objects.create(
            first_name="Jane",
            last_name="Doe",
            email="janedoe@example.com",
            phone_number="1234567890",
            street_address="123 Elm St",
            city="Springfield",
            state_province="State",
            parent_id="P100",
            relationship="Mother",
            primary_contact="1234567890",
        )

        # Create an Applicant entry in the database
        self.applicant = Applicant.objects.create(
            first_name="John", last_name="Doe", parent=self.parent, age=10
        )

        # URL for the 'applicant-approval' endpoint
        self.url = reverse(
            "applicant-approval", kwargs={"applicant_id": self.applicant.id}
        )

    @patch("apps.applicants.views.ApplicantApprovalView.send_mail")
    def test_approve_applicant(self, mock_send_mail):
        # Set up the mock send_mail method to return the expected values
        expected_email_body_regex = f"""
        Dear {self.parent.first_name} {self.parent.last_name},
        Your application for {self.applicant.first_name} {self.applicant.last_name} has been approved.
        Please complete your enrollment by following this link: https://example.com/enrollment/{self.applicant.id}/?ytoken=\\S+
        """
        mock_send_mail.return_value = (True, expected_email_body_regex.strip())

        response = self.client.post(self.url, {"status": "Approved"})
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Check if send_mail was called with the correct parameters
        expected_email = self.parent.email
        expected_subject = "Application Approved"
        mock_send_mail.assert_called_once()

        # Get the actual arguments passed to the mock send_mail method
        actual_args, actual_kwargs = mock_send_mail.call_args
        actual_to_email, actual_subject, actual_email_body = actual_args

        # Print the actual email body
        print(f"Actual Email Body: {actual_email_body}")

        # Check if the actual email, subject, and body match the expected values
        self.assertEqual(actual_to_email, expected_email)
        self.assertEqual(actual_subject, expected_subject)

        # Normalize the whitespace and newline characters in the actual email body
        actual_email_body = " ".join(actual_email_body.split())

        # Extract the token from the actual email body
        token_match = re.search(r"ytoken=([\w\.-]+)", actual_email_body)
        actual_token = token_match.group(1) if token_match else ""

        # Update the expected email body regex pattern with the actual token value
        expected_email_body = f"""
        Dear {self.parent.first_name} {self.parent.last_name},
        Your application for {self.applicant.first_name} {self.applicant.last_name} has been approved.
        Please complete your enrollment by following this link: https://example.com/enrollment/{self.applicant.id}/?ytoken={actual_token}
        """
        expected_email_body = " ".join(expected_email_body.split())

        # Check if the actual email body matches the expected email body
        self.assertEqual(actual_email_body, expected_email_body)


def test_reject_applicant(self):
    # Ensure the applicant's initial status isn't already 'Rejected'
    self.assertNotEqual(self.applicant.status, "Rejected")

    # Send a POST request to the 'applicant-approval' endpoint with 'Rejected' status
    response = self.client.post(self.url, {"status": "Rejected"})
    self.applicant.refresh_from_db()

    # Check the responses and status updates
    self.assertEqual(self.applicant.status, "Rejected")
    self.assertEqual(response.status_code, status.HTTP_200_OK)

    # Verify that an email has been sent
    self.assertEqual(len(mail.outbox), 1)
    self.assertEqual(mail.outbox[0].subject, "Application Rejected")
