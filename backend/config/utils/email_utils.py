# config/utils/email_utils.py
from django.core.mail import send_mail
from django.conf import settings


def send_applicant_email(recipient_email, applicant_name):
    try:
        send_mail(
            subject='Application Confirmation',
            message=f'Dear Parent,\n\nThank you for submitting the application for {applicant_name}. We will review the application and get back to you soon.\n\nBest regards,\nYour School',
            from_email=settings.EMAIL_HOST_USER,
            recipient_list=[recipient_email],
        )
        return True
    except Exception as e:
        print(f"Error sending email: {e}")
        return False
