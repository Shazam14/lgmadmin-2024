from django.test import TestCase
from django.core import mail
from apps.applicants.views import ApplicantApprovalView


class EmailSendingTestCase(TestCase):
    def setUp(self):
        self.view = ApplicantApprovalView()

    def test_send_mail(self):
        to_email = "test@example.com"
        subject = "Test Subject"
        body = "Test Body"

        self.view.send_mail(to_email, subject, body)

        # Check that an email has been sent
        self.assertEqual(len(mail.outbox), 1)
        self.assertEqual(mail.outbox[0].subject, subject)
        self.assertEqual(mail.outbox[0].body, body)
        self.assertEqual(mail.outbox[0].to, [to_email])
