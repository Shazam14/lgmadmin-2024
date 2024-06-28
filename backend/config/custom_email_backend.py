from django.core.mail.backends.smtp import EmailBackend
from django.conf import settings


class CustomEmailBackend(EmailBackend):
    def send_messages(self, email_messages):
        if getattr(settings, 'EMAIL_OVERRIDE_RECIPIENT', None):
            for message in email_messages:
                # Override the 'to' email addresses with a dummy email
                message.to = [settings.EMAIL_OVERRIDE_RECIPIENT]
        return super().send_messages(email_messages)
