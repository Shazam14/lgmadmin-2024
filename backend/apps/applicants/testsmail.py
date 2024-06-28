from django.core import mail
from rest_framework.test import APITestCase


class ApplicationFormTestCase(APITestCase):
    def test_form_submission_sends_email(self):
        # Prepare the form data
        form_data = {
            'parent_name': 'John Quincy Public',
            'applicant_name': 'Jane Doe Public',
            # Add other form fields as needed
        }

        # Send a POST request to the form submission endpoint
        response = self.client.post('/api/submit-form/', form_data)

        # Assert the response status code
        self.assertEqual(response.status_code, 201)

        # Assert that an email was sent
        self.assertEqual(len(mail.outbox), 1)

        # Assert the email details
        email = mail.outbox[0]
        self.assertEqual(email.subject, 'New Application Submitted')
        self.assertIn('Parent\'s Name: John Quincy Public', email.body)
        self.assertIn('Applicant Full Name: Jane Doe Public', email.body)
