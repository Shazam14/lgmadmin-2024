# applicants/utils.py
from django.utils import timezone
from django.core.exceptions import ObjectDoesNotExist
from apps.applicants.models import Applicant
from apps.grades.models import Program


def generate_unique_student_id():
    # Generate a unique student ID using current date and time for uniqueness
    # Includes year, month, day, hour, minute, second
    return "AN" + timezone.now().strftime("%Y%m%d%H%M%S")


def get_program_based_on_applicant(applicant):
    if applicant.program_option and applicant.program_option.name == "SPED-T.E.A.C.H":
        return applicant.program_option

    age = float(applicant.age)
    if age <= 2.6:
        return Program.objects.get(name="Playgroup Program")
    elif 2.6 < age <= 6:
        return Program.objects.get(name="CASA Program")
    elif 6 < age <= 12:
        return Program.objects.get(name="Elementary Program")
    elif 12 < age:
        return Program.objects.get(name="Junior High School")

    return None
