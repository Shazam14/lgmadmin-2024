# apps/portal/views.py
from django.conf import settings
from apps.students.serializers import StudentSerializer
from apps.accounts.models import UserProfile, ParentProfile
from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated, AllowAny, BasePermission
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.pagination import PageNumberPagination
from django.contrib.auth.models import User
from django.middleware.csrf import get_token
from django.http import JsonResponse
from django.db.models import Count, Q
from django.db import transaction
from apps.accounts.models import UserProfile
from apps.parents.models import Parent
from apps.students.models import Student
from apps.grades.models import Grade
from apps.enrollments.models import Enrollment
from apps.portal.serializers import PortalUserSerializer
from apps.applicants.models import Applicant
from django.db.models import Count, Q
from apps.enrollments.models import Enrollment
from apps.grades.models import Grade, Program
import logging

logger = logging.getLogger(__name__)


class IsAdminUser(BaseException):
    def has_permission(self, request, view):
        if not request.user.is_authenticated:
            return False
        user_profile = request.user.userprofile
        return user_profile.user_type in ['ADMIN', 'STAFF']


class PortalParentViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]

    @action(detail=False, methods=['GET'])
    def children(self, request):
        """Get all children for the authenticated parent"""
        try:
            # Get parent profile from the authenticated user
            parent_profile = ParentProfile.objects.get(
                user_profile__user=request.user
            )

            # Get all children linked to this parent
            children = parent_profile.children.all()

            # Serialize the children data
            data = [{
                'id': child.id,
                'first_name': child.first_name,
                'last_name': child.last_name,
                'grade': child.grade,
                'section': child.section,
                'student_id': child.student_id,
                'program': child.program.name if child.program else None
            } for child in children]

            return Response(data)

        except ParentProfile.DoesNotExist:
            return Response(
                {"error": "Parent profile not found"},
                status=status.HTTP_404_NOT_FOUND
            )
        except Exception as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class PortalViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]

    def get_permissions(self):
        if self.action in ['login', 'signup', 'status']:
            return [AllowAny()]
        return [IsAuthenticated()]

    @action(detail=False, methods=['post'])
    def login(self, request):
        try:
            logger.info(f"Portal login attempt with data: {request.data}")

            email = request.data.get('email')
            password = request.data.get('password')
            user_type = request.data.get('user_type')

            if not all([email, password, user_type]):
                return Response(
                    {"error": "Email, password and user type are required"},
                    status=status.HTTP_400_BAD_REQUEST
                )

            try:
                user = User.objects.get(email=email)
                user_profile = user.userprofile

                # Verify user type matches
                if user_profile.user_type != user_type:
                    return Response(
                        {"error": "Invalid user type"},
                        status=status.HTTP_400_BAD_REQUEST
                    )

                # Check password
                if not user.check_password(password):
                    return Response(
                        {"error": "Invalid credentials"},
                        status=status.HTTP_401_UNAUTHORIZED
                    )

                # Generate tokens
                refresh = RefreshToken.for_user(user)
                access_token = str(refresh.access_token)

                response = JsonResponse({
                    "access": access_token,
                    "refresh": str(refresh),
                    "user_profile": {
                        "id": user.id,
                        "email": user.email,
                        "user_type": user_profile.user_type,
                        "first_name": user.first_name,
                        "last_name": user.last_name
                    }
                })

                # Set CSRF token
                response.set_cookie('portal_access_token', access_token, httponly=True,
                                    secure=settings.DEBUG, samesite='Lax', max_age=3600)
                response['Authorization'] = f'Bearer {access_token}'
                response["X-CSRFToken"] = get_token(request)

                return response

            except User.DoesNotExist:
                return Response(
                    {"error": "Invalid credentials"},
                    status=status.HTTP_401_UNAUTHORIZED
                )

        except Exception as e:
            logger.exception(f"Portal login error: {str(e)}")
            return Response(
                {"error": "An error occurred during login"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    @action(detail=False, methods=['post'])
    def signup(self, request):
        try:
            # Your existing signup logic...
            pass
        except Exception as e:
            logger.exception(f"Portal signup error: {str(e)}")
            return Response(
                {"error": "An error occurred during signup"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    @action(detail=False, methods=['post'])
    def logout(self, request):
        response = Response({"message": "Successfully logged out"})
        response.delete_cookie('portal_access_token')
        response.delete_cookie('portal_refresh_token')
        return response

    @action(detail=False, methods=['get'])
    def status(self, request):
        token = request.COOKIES.get('portal_access_token')
        if token:
            try:
                # Add your token validation logic here
                return Response({"isAuthenticated": True})
            except Exception:
                pass
        return Response({"isAuthenticated": False})

    @action(detail=False, methods=['get'])
    def dashboard(self, request):
        """Get dashboard data for the authenticated user"""
        try:
            user_profile = request.user.userprofile

            if user_profile.user_type == 'PARENT':
                return self.get_parent_dashboard(user_profile)
            elif user_profile.user_type == 'STUDENT':
                return self.get_student_dashboard(user_profile)

            return Response(
                {'error': 'Invalid user type'},
                status=status.HTTP_400_BAD_REQUEST
            )
        except UserProfile.DoesNotExist:
            return Response(
                {'error': 'User profile not found'},
                status=status.HTTP_404_NOT_FOUND
            )

    def get_parent_dashboard(self, user_profile):
        """Get parent-specific dashboard data"""
        parent = user_profile.parent
        children = parent.students.all()

        return Response({
            'children': [{
                'id': child.id,
                'name': f"{child.first_name} {child.last_name}",
                'grade': child.grade,
                'section': child.section,
                'program': child.program.name,
                'attendance': child.attendance_percentage
            } for child in children],
            'notifications': self.get_notifications(user_profile.user),
            'recent_activities': self.get_activities(user_profile.user)
        })

    def get_student_dashboard(self, user_profile):
        """Get student-specific dashboard data"""
        student = user_profile.student

        return Response({
            'profile': {
                'name': f"{student.first_name} {student.last_name}",
                'grade': student.grade,
                'section': student.section,
                'program': student.program.name
            },
            'academic': {
                'attendance': student.attendance_percentage,
                'awards': student.check_awards(),
                'promoted': student.promoted
            },
            'notifications': self.get_notifications(user_profile.user),
            'recent_activities': self.get_activities(user_profile.user)
        })

    def get_notifications(self, user):
        """Get user notifications"""
        return PortalNotification.objects.filter(
            user=user,
            read=False
        ).values('title', 'message', 'created_at')[:5]

    def get_activities(self, user):
        """Get user activities"""
        return PortalActivity.objects.filter(
            user=user
        ).values('activity_type', 'description', 'timestamp')[:5]

    @action(detail=False, methods=['get'])
    def children(self, request):
        """Get list of children for parent"""
        try:
            user_profile = request.user.userprofile
            if user_profile.user_type != 'PARENT':
                return Response(
                    {'error': 'Only parents can access children list'},
                    status=status.HTTP_403_FORBIDDEN
                )

            parent = user_profile.parent
            if not parent:
                logger.error(
                    f"No parent profile found for user: {user_profile.user.email}")
                return Response(
                    {'error': 'Parent profile not found'},
                    status=status.HTTP_404_NOT_FOUND
                )

            # Get students through applicants
            children = Student.objects.filter(applicant__parent=parent)

            logger.debug(
                f"Found {children.count()} children for parent {parent.id}")

            children_data = []
            for child in children:
                try:
                    child_data = {
                        'id': child.id,
                        'firstName': child.first_name,  # Changed to match your frontend
                        'lastName': child.last_name,
                        'grade': child.grade,
                        'section': child.section,
                        'program': child.program.name if child.program else None,
                        'studentId': child.student_id,  # Changed to match your frontend
                        'attendance': child.attendance_percentage  # Added attendance
                    }
                    children_data.append(child_data)
                except AttributeError as e:
                    logger.error(f"Error accessing child attributes: {str(e)}")
                    continue

            return Response(children_data)

        except UserProfile.DoesNotExist:
            logger.error(f"UserProfile not found for user: {request.user.id}")
            return Response(
                {'error': 'User profile not found'},
                status=status.HTTP_404_NOT_FOUND
            )
        except Exception as e:
            logger.exception(
                f"Unexpected error in children endpoint: {str(e)}")
            return Response(
                {
                    'error': 'Failed to fetch children',
                    'detail': str(e) if settings.DEBUG else None
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    @action(detail=False, methods=['get'], url_path='student/(?P<pk>\d+)/details')
    def student_details(self, request, pk=None):
        """Get complete student details"""
        try:
            logger.info(f"Accessing student details for ID: {pk}")
            logger.info(
                f"Request user: {request.user.email if request.user else 'No user'}")
            logger.info(
                f"User type: {request.user.userprofile.user_type if hasattr(request.user, 'userprofile') else 'No profile'}")

            # Verify user is authenticated
            if not request.user.is_authenticated:
                logger.error("User is not authenticated")
                return Response(
                    {'error': 'Authentication required'},
                    status=status.HTTP_401_UNAUTHORIZED
                )

            # Verify user has a profile
            try:
                user_profile = request.user.userprofile
            except AttributeError:
                logger.error(f"User {request.user.email} has no profile")
                return Response(
                    {'error': 'User profile not found'},
                    status=status.HTTP_400_BAD_REQUEST
                )

        # Get student record
            try:
                student = Student.objects.get(pk=pk)
            except Student.DoesNotExist:
                logger.error(f"Student not found with ID: {pk}")
                return Response(
                    {'error': 'Student not found'},
                    status=status.HTTP_404_NOT_FOUND
                )
            # Check if user has permission to access this student
            user_profile = request.user.userprofile
            if user_profile.user_type == 'PARENT':
                has_access = Student.objects.filter(
                    applicant__parent=user_profile.parent,
                    id=pk
                ).exists()

                if not has_access:
                    logger.warning(
                        f"Parent {user_profile.parent.id} attempted unauthorized access to student {pk}"
                    )
                    return Response(
                        {'error': 'Not authorized to access this student'},
                        status=status.HTTP_403_FORBIDDEN
                    )

            # Build detailed student data
            student_data = {
                'personal': {
                    'firstName': student.first_name,
                    'middleName': student.middle_name,
                    'lastName': student.last_name,
                    'birthday': student.birthday,
                    'gender': student.gender,
                    'nationality': getattr(student, 'nationality', None)
                },
                'academic': {
                    'grade': student.grade,
                    'program': student.program.name if student.program else None,
                    'section': student.section,
                    'studentId': student.student_id,
                    'attendance': f"{student.attendance_percentage}%"
                },
                'medical': {
                    # Add medical fields based on your model
                    'bloodType': getattr(student, 'blood_type', None),
                    'allergies': getattr(student, 'allergies', None),
                    'medications': getattr(student, 'medications', None),
                }
            }

            # Get parent information
            try:
                applicant = student.applicant
                parent = applicant.parent

                # Add parent info
                student_data.update({
                    'father': {
                        'firstName': parent.first_name if parent.relationship == 'Father' else None,
                        'lastName': parent.last_name if parent.relationship == 'Father' else None,
                        'email': parent.email if parent.relationship == 'Father' else None,
                        'phone': str(parent.phone_number) if parent.relationship == 'Father' else None,
                    },
                    'mother': {
                        'firstName': parent.first_name if parent.relationship == 'Mother' else None,
                        'lastName': parent.last_name if parent.relationship == 'Mother' else None,
                        'email': parent.email if parent.relationship == 'Mother' else None,
                        'phone': str(parent.phone_number) if parent.relationship == 'Mother' else None,
                    }
                })

            except (Applicant.DoesNotExist, Parent.DoesNotExist) as e:
                logger.warning(
                    f"Parent info not found for student {pk}: {str(e)}")
                # Continue without parent info
                pass

            logger.debug(f"Successfully fetched details for student {pk}")
            return Response(student_data)

        except Student.DoesNotExist:
            logger.error(f"Student not found with ID: {pk}")
            return Response(
                {'error': 'Student not found'},
                status=status.HTTP_404_NOT_FOUND
            )
        except Exception as e:
            logger.exception(f"Unexpected error in student_details: {str(e)}")
            return Response(
                {
                    'error': 'An unexpected error occurred',
                    'detail': str(e) if settings.DEBUG else None
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    @action(detail=True, methods=['patch'])
    def update_student(self, request, pk=None):
        """Update student information"""
        try:
            student = Student.objects.get(pk=pk)

            # Verify permissions
            user_profile = request.user.userprofile
            if user_profile.user_type == 'PARENT':
                if not student.parent_profiles.filter(parent=user_profile.parent).exists():
                    return Response(
                        {'error': 'Not authorized to update this student'},
                        status=status.HTTP_403_FORBIDDEN
                    )

            # Update only allowed fields based on section
            section = request.data.get('section')
            if section in ['personal', 'living']:
                # Handle personal/living info updates
                pass
            elif section == 'medical':
                # Handle medical info updates
                pass

            student.save()
            return Response({'message': 'Student updated successfully'})

        except Student.DoesNotExist:
            return Response(
                {'error': 'Student not found'},
                status=status.HTTP_404_NOT_FOUND
            )
        except Exception as e:
            logger.exception("Error updating student")
            return Response(
                {'error': 'Failed to update student'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    @action(detail=False, methods=['get'])
    def verify(self, request):
        """Verify the current user's authentication and return profile data"""
        try:
            user_profile = request.user.userprofile
            profile_data = PortalUserSerializer(user_profile).data

            # Add additional data based on user type
            if user_profile.user_type == 'PARENT':
                parent_profile = ParentProfileSerializer(
                    user_profile.parent).data
                profile_data.update({
                    'parent_data': parent_profile,
                    'children': [
                        {
                            'id': child.id,
                            'name': f"{child.first_name} {child.last_name}",
                            'grade': child.grade,
                            'section': child.section,
                            'program': child.program.name if child.program else None
                        }
                        for child in user_profile.parent.children.all()
                    ]
                })
            elif user_profile.user_type == 'STUDENT':
                student_profile = StudentProfileSerializer(
                    user_profile.student).data
                profile_data.update({
                    'student_data': student_profile
                })

            return Response({
                'user_profile': profile_data,
                'isAuthenticated': True
            })

        except Exception as e:
            logger.exception(f"Verify endpoint error: {str(e)}")
            return Response(
                {'error': 'Authentication verification failed'},
                status=status.HTTP_401_UNAUTHORIZED
            )

        @action(detail=True, methods=['patch'], url_path='student/(?P<student_id>[^/.]+)/grades')
        def update_grades(self, request, student_id=None):
            """Update student grades with validation and proper error handling"""
            try:
                # Verify permissions
                user_profile = request.user.userprofile
                if user_profile.user_type not in ['ADMIN', 'STAFF']:
                    return Response(
                        {'error': 'Not authorized to update grades'},
                        status=status.HTTP_403_FORBIDDEN
                    )

                # Get student and verify access
                student = get_object_or_404(Student, id=student_id)
                grades_data = request.data.get('grades', [])

                with transaction.atomic():
                    updated_grades = []
                    for grade_data in grades_data:
                        grade = Grade.objects.get(
                            student=student,
                            subject_id=grade_data.get('subject_id')
                        )

                        # Update allowed fields with validation
                        if 'written_work' in grade_data:
                            grade.written_work = self._validate_grade_value(
                                grade_data['written_work'])
                        if 'performance_task' in grade_data:
                            grade.performance_task = self._validate_grade_value(
                                grade_data['performance_task'])
                        if 'quarterly_exam' in grade_data:
                            grade.quarterly_exam = self._validate_grade_value(
                                grade_data['quarterly_exam'])

                        # Calculate final grades based on your grading system
                        grade.quarterly_grade = self._calculate_quarterly_grade(
                            grade)
                        grade.save()
                        updated_grades.append(grade)

                    # Recalculate student's academic status
                    student.check_promotion_status()
                    student.check_awards()

                    # Create activity log
                    PortalActivity.objects.create(
                        user=request.user,
                        activity_type='GRADE_UPDATE',
                        description=f'Updated grades for student {student.student_id}'
                    )

                    # Return updated grades
                    serializer = GradeSerializer(updated_grades, many=True)
                    return Response({
                        'message': 'Grades updated successfully',
                        'updated_grades': serializer.data
                    })

            except Student.DoesNotExist:
                return Response(
                    {'error': 'Student not found'},
                    status=status.HTTP_404_NOT_FOUND
                )
            except Grade.DoesNotExist:
                return Response(
                    {'error': 'Invalid subject or grade record'},
                    status=status.HTTP_404_NOT_FOUND
                )
            except ValidationError as e:
                return Response(
                    {'error': str(e)},
                    status=status.HTTP_400_BAD_REQUEST
                )
            except Exception as e:
                logger.exception(f"Error updating grades: {str(e)}")
                return Response(
                    {'error': 'Failed to update grades'},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )

        def _validate_grade_value(self, value):
            """Validate grade values"""
            try:
                grade = float(value)
                if not 0 <= grade <= 100:
                    raise ValidationError('Grade must be between 0 and 100')
                return grade
            except (TypeError, ValueError):
                raise ValidationError('Invalid grade value')

        def _calculate_quarterly_grade(self, grade):
            """Calculate quarterly grade based on components"""
            try:
                # Example calculation - adjust according to your grading system
                written_weight = 0.30
                performance_weight = 0.50
                exam_weight = 0.20

                quarterly = (
                    (grade.written_work * written_weight) +
                    (grade.performance_task * performance_weight) +
                    (grade.quarterly_exam * exam_weight)
                )
                return round(quarterly, 2)
            except Exception as e:
                logger.error(f"Error calculating quarterly grade: {str(e)}")
                raise ValidationError('Error calculating quarterly grade')


class StudentPortalViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]  # Add this

    def get_permissions(self):
        if self.action in ['login', 'signup']:
            return [AllowAny()]
        return [IsAuthenticated()]

    def get_student(self):
        """Helper method to get student from user profile"""
        return self.request.user.userprofile.student_profile.student

    @action(detail=False, methods=['get'])
    def profile(self, request):
        """This will be available at /api/portal/student/profile/"""
        try:
            student_profile = request.user.userprofile.student_profile
            student = student_profile.student

            return Response({
                'personal': {
                    'first_name': student.first_name,
                    'middle_name': student.middle_name,
                    'last_name': student.last_name,
                    'gender': student.gender,
                    'age': student.age,
                    'birthday': student.birthday,
                    'email': student.email,
                    'student_id': student.student_id,
                    'student_status': student.student_status,
                    'grade': student.grade,
                    'section': student.section,
                },
                'academic': {
                    'program': student.program.name if student.program else None,
                    'promoted': student.promoted,
                    'attendance_percentage': student.attendance_percentage,
                },
                'tuition': {
                    'tuition_status': student.tuition_status,
                    'account_status': student.account_status,
                }
            })
        except (UserProfile.DoesNotExist, StudentProfile.DoesNotExist) as e:
            logger.error(f"Profile access error: {str(e)}")
            return Response(
                {'error': 'Student profile not found'},
                status=status.HTTP_404_NOT_FOUND
            )

    @action(detail=False, methods=['get'])
    def grades(self, request):
        """This will be available at /api/portal/student/grades/"""
        try:
            student = request.user.userprofile.student_profile.student
            grades = Grade.objects.filter(
                student=student).select_related('subject')
            print("Grades query result:", list(grades.values(
                'subject__name', 'written_work')))  # Debug log

            serializer = GradeSerializer(grades, many=True)
            print("Backend - Serialized grades:", serializer.data)
            return Response(serializer.data)
        except (UserProfile.DoesNotExist, StudentProfile.DoesNotExist) as e:
            logger.error(f"Grades access error: {str(e)}")
            return Response(
                {'error': 'Student not found'},
                status=status.HTTP_404_NOT_FOUND
            )

    @action(detail=False, methods=['get'])
    def details(self, request):
        """This will be available at /api/portal/student/details/"""
        try:
            student = self.get_student()
            grades = Grade.objects.filter(student=student)

            grades_data = []
            if grades.exists():
                grades_data = [{
                    'subject': grade.subject.name,
                    'written_work': grade.written_work,
                    'performance_task': grade.performance_task,
                    'quarterly_exam': grade.quarterly_exam,
                    'quarterly_grade': grade.quarterly_grade,
                    'final_grade': grade.final_grade,
                    'evaluation_code': grade.evaluation_code,
                    'remedial_passed': grade.remedial_passed,
                } for grade in grades]

            return Response({
                'program': {
                    'id': student.program.id,
                    'name': student.program.name,
                } if student.program else None,
                'promoted': student.promoted,
                'elementary_certificate': student.elementary_certificate,
                'junior_high_certificate': student.junior_high_certificate,
                'attendance_percentage': student.attendance_percentage,
                'grades': grades_data,
            })
        except Exception as e:
            logger.error(f"Details access error: {str(e)}")
            return Response(
                {'error': str(e)},
                status=status.HTTP_404_NOT_FOUND
            )

    @action(detail=False, methods=['get'])
    def enrollment(self, request):
        """This will be available at /api/portal/student/enrollment/"""
        logger.info("Enrollment access: {request.user.email}")
        try:
            # Get the student from the authenticated user
            student_profile = request.user.userprofile.student_profile
            student = student_profile.student

            # Try to get the enrollment record
            enrollment = Enrollment.objects.filter(student=student).first()

            if not enrollment:
                # Return a more detailed error message
                return Response(
                    {'error': 'No enrollment found', 'student_id': student.id},
                    status=status.HTTP_404_NOT_FOUND
                )

            # If enrollment exists, return the data
            return Response({
                'grade_level': enrollment.grade_level.name if enrollment.grade_level else None,
                'enrollment_date': enrollment.enrollment_date,
                'academic_year': enrollment.academic_year,
                'academic_period': enrollment.academic_period,
                'enrollment_status': enrollment.enrollment_status,
                'previous_school': enrollment.previous_school,
                'previous_school_address': enrollment.previous_school_address,
                'previous_school_phone': enrollment.previous_school_phone,
                'special_needs': enrollment.special_needs,
                'allergies': enrollment.allergies,
                'medications': enrollment.medications,
            })

        except UserProfile.DoesNotExist:
            return Response(
                {'error': 'Student profile not found'},
                status=status.HTTP_404_NOT_FOUND
            )
        except Exception as e:
            logger.error(f"Enrollment access error: {str(e)}")
            return Response(
                {'error': str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class AdminPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100


class AdminPortalViewSet(viewsets.GenericViewSet):
    permission_classes = [IsAuthenticated, IsAdminUser]
    authentication_classes = [JWTAuthentication]
    pagination_class = AdminPagination

    def paginate_queryset(self, queryset):
        """
        Return a single page of results, or `None` if pagination is disabled.
        """
        if self.paginator is None:
            return None
        return self.paginator.paginate_queryset(queryset, self.request, view=self)

    def get_paginated_response(self, data):
        """
        Return a paginated style `Response` object for the given output data.
        """
        assert self.paginator is not None
        return self.paginator.get_paginated_response(data)

    def get_permissions(self):
        """Ensure user has admin permissions"""
        # Add error logging
        try:
            if not self.request.user.is_authenticated:
                logger.warning(
                    "Unauthenticated access attempt to admin portal")
                return [IsAuthenticated()]

            user_profile = getattr(self.request.user, 'userprofile', None)
            if not user_profile:
                logger.info(
                    f"Creating new profile for admin user: {self.request.user.email}")
                user_type = 'ADMIN' if (self.request.user.is_superuser or
                                        self.request.user.is_staff) else 'STAFF'
                user_profile = UserProfile.objects.create(
                    user=self.request.user,
                    user_type=user_type
                )

            if user_profile.user_type not in ['ADMIN', 'STAFF']:
                logger.warning(
                    f"Unauthorized access attempt by user: {self.request.user.email}")
                return [IsAdminUser()]

            return super().get_permissions()

        except Exception as e:
            logger.error(f"Permission check error: {str(e)}")
            return [IsAdminUser()]

    @action(detail=False, methods=['get'])
    def dashboard_stats(self, request):
        """Get admin dashboard statistics"""
        try:
            # Add more detailed error handling and checks
            try:
                pending_applications = Applicant.objects.filter(
                    status='Pending').count()
            except Exception as e:
                logger.error(f"Error counting pending applications: {str(e)}")
                pending_applications = 0

            try:
                pending_enrollments = Enrollment.objects.filter(
                    enrollment_status='Pending').count()
            except Exception as e:
                logger.error(f"Error counting pending enrollments: {str(e)}")
                pending_enrollments = 0

            try:
                pending_grades = Grade.objects.filter(
                    final_grade__isnull=True).count()
            except Exception as e:
                logger.error(f"Error counting pending grades: {str(e)}")
                pending_grades = 0

            try:
                total_students = Student.objects.filter(
                    account_status='A').count()
            except Exception as e:
                logger.error(f"Error counting total students: {str(e)}")
                total_students = 0

            try:
                total_programs = Program.objects.count()
            except Exception as e:
                logger.error(f"Error counting total programs: {str(e)}")
                total_programs = 0

            try:
                recent_activities = list(PortalActivity.objects.all()
                                         .order_by('-timestamp')[:5]
                                         .values('activity_type', 'description', 'timestamp'))
            except Exception as e:
                logger.error(f"Error fetching recent activities: {str(e)}")
                recent_activities = []

            stats = {
                'pendingApplications': pending_applications,
                'pendingEnrollments': pending_enrollments,
                'pendingGrades': pending_grades,
                'totalStudents': total_students,
                'totalPrograms': total_programs,
                'recentActivities': recent_activities
            }

            logger.info(f"Successfully fetched dashboard stats: {stats}")
            return Response(stats)

        except Exception as e:
            logger.exception(f"Error fetching dashboard stats: {str(e)}")
            return Response(
                {
                    'error': 'Failed to fetch dashboard statistics',
                    'detail': str(e) if settings.DEBUG else None,
                    'stats': {
                        'pendingApplications': 0,
                        'pendingEnrollments': 0,
                        'pendingGrades': 0,
                        'totalStudents': 0,
                        'totalPrograms': 0,
                        'recentActivities': []
                    }
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    @action(detail=False, methods=['get'])
    def applicants(self, request):
        """Get filtered applicants list"""
        try:
            queryset = Applicant.objects.select_related(
                'parent', 'program_option').all()
            logger.info(
                f"Total applicants before filtering: {queryset.count()}")
            for app in queryset:
                logger.info(f"""
                    Applicant detail:
                    ID: {app.id}
                    Name: {app.first_name} {app.last_name}
                    Status: {app.status}
                    Has Student: {hasattr(app, 'students')}
                    Has Enrollment: {Enrollment.objects.filter(student__applicant=app).exists()}
                """)

            status_filter = request.query_params.get('status')
            program_filter = request.query_params.get('program')
            logger.info(
                f"Applied filters - Status: {status_filter}, Program: {program_filter}")

            # Only apply filters if they're not 'all'
            if status_filter and status_filter != 'all':
                queryset = queryset.filter(status=status_filter)
                logger.info(
                    f"After status filter: {queryset.count()} applicants")

            if program_filter and program_filter != 'all':
                queryset = queryset.filter(program_option_id=program_filter)
                logger.info(
                    f"After program filter: {queryset.count()} applicants")

            logger.info(f"""
            Final query results:
            Total count: {queryset.count()}
            Statuses: {[{'id': a.id, 'status': a.status} for a in queryset]}
        """)

            queryset = queryset.order_by('-applied_date')

            # Paginate the queryset
            page = self.paginate_queryset(queryset)
            if page is None:
                data = [{
                    'id': app.id,
                    'reference_number': f"APP-{app.id:06d}",  # Added this line
                    'first_name': app.first_name,
                    'last_name': app.last_name,
                    'status': app.status,
                    'applied_date': app.applied_date,
                    'parent_name': f"{app.parent.first_name} {app.parent.last_name}" if app.parent else "No Parent",
                    'program': app.program_option.name if app.program_option else None
                } for app in queryset]
                return Response(data)

            data = [{
                'id': app.id,
                'reference_number': f"APP-{app.id:06d}",
                'first_name': app.first_name,
                'last_name': app.last_name,
                'status': app.status,
                'applied_date': app.applied_date,
                'parent_name': f"{app.parent.first_name} {app.parent.last_name}" if app.parent else "No Parent",
                'program': app.program_option.name if app.program_option else None
            } for app in page]

            return self.get_paginated_response(data)

        except Exception as e:
            logger.exception(f"Error fetching applicants: {str(e)}")
            return Response(
                {
                    'error': 'Failed to fetch applicants',
                    'detail': str(e) if settings.DEBUG else None
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    @action(detail=False, methods=['post'])
    def bulk_approve_applicants(self, request):
        """Bulk approve applicants"""
        try:
            applicant_ids = request.data.get('applicant_ids', [])
            with transaction.atomic():
                for applicant_id in applicant_ids:
                    applicant = Applicant.objects.get(id=applicant_id)
                    applicant.status = 'Approved'
                    applicant.save()
                    student = Student.objects.create(
                        applicant=applicant,
                        program=applicant.program_option,
                        first_name=applicant.first_name,
                        last_name=applicant.last_name,
                    )
            return Response({'message': f'Successfully approved {len(applicant_ids)} applicants'})
        except Exception as e:
            logger.error(f"Error in bulk approval: {str(e)}")
            return Response({'error': 'Failed to process bulk approval'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    @action(detail=False, methods=['get'])
    def enrollments(self, request):
        """Get filtered enrollments list"""
        try:
            # Start with a base queryset
            queryset = Enrollment.objects.select_related(
                'student',
                'grade_level'
            ).all()

            # Apply filters only if they're not 'all'
            status_filter = request.query_params.get('status')
            grade_filter = request.query_params.get('grade')
            program_filter = request.query_params.get('program')
            section_filter = request.query_params.get('section')

            if status_filter and status_filter != 'all':
                queryset = queryset.filter(enrollment_status=status_filter)
            if grade_filter and grade_filter != 'all':
                queryset = queryset.filter(grade_level__name=grade_filter)
            if program_filter and program_filter != 'all':
                queryset = queryset.filter(student__program_id=program_filter)
            if section_filter and section_filter != 'all':
                queryset = queryset.filter(student__section=section_filter)

            # Order the queryset
            queryset = queryset.order_by('-enrollment_date')

            # Paginate the queryset
            page = self.paginate_queryset(queryset)

            # Transform the data
            def get_enrollment_data(enrollment):
                return {
                    'id': enrollment.id,
                    'student_id': enrollment.student.id,
                    'student_name': f"{enrollment.student.first_name} {enrollment.student.last_name}",
                    'enrollment_date': enrollment.enrollment_date,
                    'enrollment_status': enrollment.enrollment_status,
                    'academic_year': enrollment.academic_year,
                    'academic_period': enrollment.academic_period,
                    'grade_level': enrollment.grade_level.name if enrollment.grade_level else None,
                    'program': enrollment.student.program.name if enrollment.student.program else None,
                    'section': enrollment.student.section
                }

            if page is not None:
                data = [get_enrollment_data(enrollment) for enrollment in page]
                return self.get_paginated_response(data)

            # If pagination is disabled
            data = [get_enrollment_data(enrollment) for enrollment in queryset]
            return Response(data)

        except Exception as e:
            logger.exception(f"Error fetching enrollments: {str(e)}")
            return Response(
                {
                    'error': 'Failed to fetch enrollments',
                    'detail': str(e) if settings.DEBUG else None,
                    'enrollments': []  # Return empty list as fallback
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    @action(detail=False, methods=['get'])
    def programs(self, request):
        """Get programs with enrollment stats"""
        try:
            programs = Program.objects.annotate(
                total_students=Count('student'),
                active_students=Count('student', filter=Q(
                    student__account_status='A'))
            ).values(
                'id', 'name', 'description', 'age_range',
                'total_students', 'active_students'
            )
            return Response(programs)
        except Exception as e:
            logger.error(f"Error fetching programs: {str(e)}")
            return Response({'error': 'Failed to fetch programs'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    @action(detail=False, methods=['patch'])
    def bulk_update_grades(self, request):
        """Bulk update student grades"""
        try:
            grades_data = request.data.get('grades', [])
            with transaction.atomic():
                for grade_item in grades_data:
                    grade = Grade.objects.get(
                        student_id=grade_item['student_id'],
                        subject_id=grade_item['subject_id']
                    )
                    for field in ['written_work', 'performance_task', 'quarterly_exam']:
                        if field in grade_item:
                            setattr(grade, field, grade_item[field])
                    grade.save()
                    student = grade.student
                    student.check_promotion_status()
                    student.save()
            return Response({'message': 'Grades updated successfully'})
        except Exception as e:
            logger.error(f"Error updating grades: {str(e)}")
            return Response({'error': 'Failed to update grades'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    @action(detail=False, methods=['get'])
    def student_grades(self, request):
        """Get student grades with filtering"""
        try:
            grade_level = request.query_params.get('grade_level')
            section = request.query_params.get('section')
            subject = request.query_params.get('subject')
            queryset = Grade.objects.select_related(
                'student', 'subject'
            )
            if grade_level:
                queryset = queryset.filter(student__grade=grade_level)
            if section:
                queryset = queryset.filter(student__section=section)
            if subject:
                queryset = queryset.filter(subject_id=subject)
            grades_data = queryset.values(
                'student__first_name', 'student__last_name',
                'subject__name', 'written_work', 'performance_task',
                'quarterly_exam', 'quarterly_grade', 'final_grade'
            )
            return Response(grades_data)
        except Exception as e:
            logger.error(f"Error fetching student grades: {str(e)}")
            return Response({'error': 'Failed to fetch student grades'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    @action(detail=False, methods=['get'])
    def students(self, request):
        """Get filtered students list"""
        try:
            # Add ordering to make results consistent
            queryset = Student.objects.select_related(
                'program', 'applicant'
            ).order_by('last_name', 'first_name')

            logger.info(
                f"Students endpoint called. Initial count: {queryset.count()}")

            # Apply filters - add status filter and make filters case-insensitive
            grade_filter = request.query_params.get('grade')
            program_filter = request.query_params.get('program')
            status_filter = request.query_params.get('status')

            if grade_filter and grade_filter != 'all':
                queryset = queryset.filter(grade__iexact=grade_filter)
            if program_filter and program_filter != 'all':
                queryset = queryset.filter(
                    program__name__iexact=program_filter)
            if status_filter and status_filter != 'all':
                queryset = queryset.filter(
                    account_status__iexact=status_filter)

            # Transform the data maintaining nested structure
            students_data = [{
                'id': student.id,
                'student_id': student.student_id,
                'first_name': student.first_name,
                'last_name': student.last_name,
                'grade': student.grade,
                'section': student.section,
                'program': {
                    'id': student.program.id,
                    'name': student.program.name
                } if student.program else None,
                'account_status': student.account_status,
                'tuition_status': student.tuition_status,
                'promoted': student.promoted
            } for student in queryset]  # List comprehension instead of append loop

            logger.info(f"Returning {len(students_data)} students")
            if students_data:
                logger.debug(f"Sample student data: {students_data[0]}")

            return Response({
                'results': students_data,
                'count': len(students_data),
                'filters': {  # Add available filters info
                    'grade': grade_filter,
                    'program': program_filter,
                    'status': status_filter
                }
            })

        except Exception as e:
            logger.exception(f"Error in students endpoint: {str(e)}")
            return Response(
                {
                    'error': 'Failed to fetch students',
                    'detail': str(e) if settings.DEBUG else None
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
    # enrollment part
    # Add these to your AdminPortalViewSet

    # In your AdminPortalViewSet

    @action(detail=False, methods=['post'])
    def create_enrollment(self, request):
        """Create enrollment from approved applicant"""
        try:
            with transaction.atomic():
                applicant_id = request.data.get('applicant_id')
                applicant = Applicant.objects.get(id=applicant_id)

                # Verify applicant is approved
                if applicant.status != 'Approved':
                    return Response(
                        {'error': 'Applicant must be approved for enrollment'},
                        status=status.HTTP_400_BAD_REQUEST
                    )

                # Create or get student record
                student, created = Student.objects.get_or_create(
                    applicant=applicant,
                    defaults={
                        'first_name': applicant.first_name,
                        'last_name': applicant.last_name,
                        'email': applicant.email,
                        'program': applicant.program_option,
                        'grade': request.data.get('grade_level'),
                        'section': request.data.get('section'),
                        'student_status': 'Active',
                        'account_status': 'A'
                    }
                )

                # Create enrollment record
                enrollment = Enrollment.objects.create(
                    student=student,
                    academic_year=request.data.get('academic_year'),
                    academic_period=request.data.get('academic_period'),
                    enrollment_status='Pending',
                    grade_level=request.data.get('grade_level'),
                    previous_school=request.data.get('previous_school'),
                    previous_school_address=request.data.get(
                        'previous_school_address'),
                    special_needs=request.data.get('special_needs'),
                    allergies=request.data.get('allergies'),
                    medications=request.data.get('medications'),
                    enrollment_date=timezone.now()
                )

                # Update applicant status to reflect enrollment
                applicant.status = 'Enrolled'
                applicant.save()

                # Return the created enrollment data
                enrollment_data = {
                    'id': enrollment.id,
                    'student_id': student.student_id,
                    'student_name': f"{student.first_name} {student.last_name}",
                    'program': student.program.name if student.program else None,
                    'grade_level': enrollment.grade_level,
                    'enrollment_status': enrollment.enrollment_status,
                    'enrollment_date': enrollment.enrollment_date,
                    'academic_year': enrollment.academic_year,
                    'academic_period': enrollment.academic_period
                }

                return Response(enrollment_data, status=status.HTTP_201_CREATED)

        except Applicant.DoesNotExist:
            return Response(
                {'error': 'Applicant not found'},
                status=status.HTTP_404_NOT_FOUND
            )
        except Exception as e:
            logger.error(f"Enrollment creation failed: {str(e)}")
            return Response(
                {'error': 'Failed to create enrollment'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    @action(detail=True, methods=['post'])
    def enroll_student(self, request, pk=None):
        """Enroll an individual student"""
        try:
            with transaction.atomic():
                student = Student.objects.get(pk=pk)

                # Check if already enrolled
                if Enrollment.objects.filter(student=student, academic_year=request.data.get('academic_year')).exists():
                    return Response(
                        {'error': 'Student already enrolled for this academic year'},
                        status=status.HTTP_400_BAD_REQUEST
                    )

                # Create enrollment
                enrollment = Enrollment.objects.create(
                    student=student,
                    academic_year=request.data.get('academic_year', '2024'),
                    enrollment_status=request.data.get(
                        'enrollment_status', 'Enrolled'),
                    academic_period=request.data.get(
                        'academic_period', '1st Semester'),
                    enrollment_date=timezone.now(),
                    grade_level=student.grade  # Assuming grade field exists
                )

                # Log the activity
                PortalActivity.objects.create(
                    user=request.user,
                    activity_type="ENROLLMENT",
                    description=f"Enrolled student {student.first_name} {student.last_name}"
                )

                return Response({
                    'message': 'Student enrolled successfully',
                    'enrollment': {
                        'id': enrollment.id,
                        'student_name': f"{student.first_name} {student.last_name}",
                        'enrollment_date': enrollment.enrollment_date,
                        'status': enrollment.enrollment_status
                    }
                })

        except Student.DoesNotExist:
            logger.error(f"Enrollment failed - Student {pk} not found")
            return Response(
                {'error': 'Student not found'},
                status=status.HTTP_404_NOT_FOUND
            )
        except Exception as e:
            logger.error(f"Enrollment failed for student {pk}: {str(e)}")
            return Response(
                {'error': 'Failed to enroll student'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    @action(detail=False, methods=['post'])
    def bulk_enroll_students(self, request):
        """Bulk enroll multiple students"""
        try:
            student_ids = request.data.get('student_ids', [])
            academic_year = request.data.get('academic_year', '2024')
            academic_period = request.data.get(
                'academic_period', '1st Semester')

            if not student_ids:
                return Response(
                    {'error': 'No students provided for enrollment'},
                    status=status.HTTP_400_BAD_REQUEST
                )

            successful_enrollments = []
            failed_enrollments = []

            with transaction.atomic():
                for student_id in student_ids:
                    try:
                        student = Student.objects.get(pk=student_id)

                        # Skip if already enrolled
                        if Enrollment.objects.filter(
                            student=student,
                            academic_year=academic_year
                        ).exists():
                            failed_enrollments.append({
                                'student_id': student_id,
                                'reason': 'Already enrolled'
                            })
                            continue

                        enrollment = Enrollment.objects.create(
                            student=student,
                            academic_year=academic_year,
                            enrollment_status='Enrolled',
                            academic_period=academic_period,
                            enrollment_date=timezone.now(),
                            grade_level=student.grade
                        )

                        successful_enrollments.append({
                            'student_id': student_id,
                            'enrollment_id': enrollment.id,
                            'student_name': f"{student.first_name} {student.last_name}"
                        })

                    except Student.DoesNotExist:
                        failed_enrollments.append({
                            'student_id': student_id,
                            'reason': 'Student not found'
                        })
                    except Exception as e:
                        failed_enrollments.append({
                            'student_id': student_id,
                            'reason': str(e)
                        })

                # Log bulk activity
                PortalActivity.objects.create(
                    user=request.user,
                    activity_type="BULK_ENROLLMENT",
                    description=f"Bulk enrolled {len(successful_enrollments)} students"
                )

            return Response({
                'message': f'Enrolled {len(successful_enrollments)} students',
                'successful_enrollments': successful_enrollments,
                'failed_enrollments': failed_enrollments
            })

        except Exception as e:
            logger.error(f"Bulk enrollment failed: {str(e)}")
            return Response(
                {'error': 'Failed to process bulk enrollment'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    @action(detail=True, methods=['patch'])
    def update_enrollment_status(self, request, pk=None):
        """Update enrollment status"""
        try:
            enrollment = Enrollment.objects.get(pk=pk)
            new_status = request.data.get('status')

            if not new_status:
                return Response(
                    {'error': 'Status not provided'},
                    status=status.HTTP_400_BAD_REQUEST
                )

            enrollment.enrollment_status = new_status
            enrollment.save()

            return Response({
                'message': 'Enrollment status updated successfully',
                'enrollment_id': enrollment.id,
                'new_status': new_status
            })

        except Enrollment.DoesNotExist:
            return Response(
                {'error': 'Enrollment not found'},
                status=status.HTTP_404_NOT_FOUND
            )
        except Exception as e:
            logger.error(f"Error updating enrollment status: {str(e)}")
            return Response(
                {'error': 'Failed to update enrollment status'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
