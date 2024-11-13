# apps/portal/views.py
from apps.students.serializers import StudentSerializer
from apps.accounts.models import UserProfile, ParentProfile
from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User
from django.middleware.csrf import get_token
from django.http import JsonResponse
from apps.accounts.models import UserProfile
from apps.parents.models import Parent
from apps.students.models import Student
import logging

logger = logging.getLogger(__name__)


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

    @action(detail=True, methods=['GET'])
    def student_details(self, request, pk=None):
        """Get detailed information for a specific student"""
        try:
            # Verify parent has access to this student
            parent_profile = ParentProfile.objects.get(
                user_profile__user=request.user
            )
            student = get_object_or_404(
                Student,
                id=pk,
                parent_profiles=parent_profile
            )

            # Compile student information
            data = {
                'personal': {
                    'firstName': student.first_name,
                    'middleName': student.middle_name,
                    'lastName': student.last_name,
                    'birthday': student.birthday,
                    'gender': student.gender,
                    'email': student.email,
                },
                'academic': {
                    'grade': student.grade,
                    'section': student.section,
                    'program': student.program.name if student.program else None,
                    'studentId': student.student_id,
                    'attendance': f"{student.attendance_percentage}%",
                },
                'grades': [
                    {
                        'subject': grade.subject.name,
                        'q1': grade.q1_grade,
                        'q2': grade.q2_grade,
                        'q3': grade.q3_grade,
                        'q4': grade.q4_grade,
                        'final': grade.final_grade,
                    }
                    for grade in student.grades.all()
                ]
                # Add other sections as needed
            }

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

    @action(detail=True, methods=['PATCH'])
    def update_student(self, request, pk=None):
        """Update allowed student information"""
        try:
            # Verify parent has access to this student
            parent_profile = ParentProfile.objects.get(
                user_profile__user=request.user
            )
            student = get_object_or_404(
                Student,
                id=pk,
                parent_profiles=parent_profile
            )

            # Get section and data from request
            section = request.data.get('section')
            update_data = request.data.get('data', {})

            # Define which fields can be updated by parents
            ALLOWED_UPDATES = {
                'personal': ['email', 'phone_number'],
                'emergency': ['emergency_contact', 'emergency_phone'],
                # Add other allowed sections/fields
            }

            if section not in ALLOWED_UPDATES:
                return Response(
                    {"error": "Invalid section"},
                    status=status.HTTP_400_BAD_REQUEST
                )

            # Filter out non-allowed fields
            allowed_fields = ALLOWED_UPDATES[section]
            filtered_data = {
                k: v for k, v in update_data.items()
                if k in allowed_fields
            }

            # Update student
            for field, value in filtered_data.items():
                setattr(student, field, value)
            student.save()

            return Response({"message": "Student updated successfully"})

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

                response = JsonResponse({
                    "access": str(refresh.access_token),
                    "refresh": str(refresh),
                    "user_profile": {
                        "id": user.id,
                        "email": user.email,
                        "user_type": user_profile.user_type,
                        "first_name": user.first_name,
                        "last_name": user.last_name
                    }
                })

                # Set cookies
                response.set_cookie(
                    'portal_access_token',
                    str(refresh.access_token),
                    httponly=True,
                    secure=False,  # Set to True in production
                    samesite='Lax'
                )
                response.set_cookie(
                    'portal_refresh_token',
                    str(refresh),
                    httponly=True,
                    secure=False,  # Set to True in production
                    samesite='Lax'
                )

                # Set CSRF token
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
            children = parent.students.all()

            return Response([{
                'id': child.id,
                'first_name': child.first_name,
                'last_name': child.last_name,
                'grade': child.grade,
                'section': child.section,
                'program': child.program.name if child.program else None,
                'student_id': child.student_id
            } for child in children])
        except Exception as e:
            logger.exception("Error fetching children")
            return Response(
                {'error': 'Failed to fetch children'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    @action(detail=True, methods=['get'])
    def student_details(self, request, pk=None):
        """Get complete student details"""
        try:
            student = Student.objects.get(pk=pk)

            # Check if user has permission to access this student
            user_profile = request.user.userprofile
            if user_profile.user_type == 'PARENT':
                if not student.parent_profiles.filter(parent=user_profile.parent).exists():
                    return Response(
                        {'error': 'Not authorized to access this student'},
                        status=status.HTTP_403_FORBIDDEN
                    )

            return Response({
                'personal': {
                    'firstName': student.first_name,
                    'middleName': student.middle_name,
                    'lastName': student.last_name,
                    'birthday': student.birthday,
                    'gender': student.gender,
                    'nationality': student.nationality
                },
                'academic': {
                    'grade': student.grade,
                    'program': student.program.name if student.program else None,
                    'section': student.section,
                    'studentId': student.student_id,
                    'attendance': f"{student.attendance_percentage}%"
                },
                'medical': {
                    # Add medical history fields based on your model
                },
                'father': {
                    # Get father's info from parent relationship
                    'firstName': student.applicant.parent.first_name if student.applicant.parent.relationship == 'Father' else None,
                    # Add other father fields
                },
                'mother': {
                    # Get mother's info from parent relationship
                    'firstName': student.applicant.parent.first_name if student.applicant.parent.relationship == 'Mother' else None,
                    # Add other mother fields
                },
                'living': {
                    # Add living arrangement fields
                }
            })
        except Student.DoesNotExist:
            return Response(
                {'error': 'Student not found'},
                status=status.HTTP_404_NOT_FOUND
            )
        except Exception as e:
            logger.exception("Error fetching student details")
            return Response(
                {'error': 'Failed to fetch student details'},
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
