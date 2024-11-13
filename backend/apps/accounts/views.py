from rest_framework import status, viewsets
from rest_framework.views import APIView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User
from .models import UserProfile, ParentProfile, StudentProfile
from .serializers import UserProfileSerializer, ParentProfileSerializer, StudentProfileSerializer


class ParentProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            profile = request.user.userprofile.parent_profile
            serializer = ParentProfileSerializer(profile)
            return Response(serializer.data)
        except AttributeError:
            return Response(
                {'error': 'Parent profile not found'},
                status=status.HTTP_404_NOT_FOUND
            )


class StudentProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            profile = request.user.userprofile.student_profile
            serializer = StudentProfileSerializer(profile)
            return Response(serializer.data)
        except AttributeError:
            return Response(
                {'error': 'Student profile not found'},
                status=status.HTTP_404_NOT_FOUND
            )


class AccountViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]

    def get_serializer_class(self):
        if self.request.user.userprofile.user_type == 'PARENT':
            return ParentProfileSerializer
        elif self.request.user.userprofile.user_type == 'STUDENT':
            return StudentProfileSerializer
        return UserProfileSerializer


@api_view(['POST'])
@permission_classes([AllowAny])
def portal_signup(request):
    """Handle portal user registration"""
    try:
        data = request.data
        user_type = data.get('user_type')
        email = data.get('email')
        access_code = data.get('access_code')

        # Validate access code
        if user_type == 'PARENT':
            parent = Parent.objects.filter(email=email).first()
            if not parent or parent.access_code != access_code:
                return Response(
                    {'error': 'Invalid access code or email'},
                    status=status.HTTP_400_BAD_REQUEST
                )
        elif user_type == 'STUDENT':
            student = Student.objects.filter(email=email).first()
            if not student or student.access_code != access_code:
                return Response(
                    {'error': 'Invalid access code or email'},
                    status=status.HTTP_400_BAD_REQUEST
                )

        # Create user and profile
        user = User.objects.create_user(
            username=email,
            email=email,
            password=data.get('password')
        )

        profile = UserProfile.objects.create(
            user=user,
            user_type=user_type
        )

        # Create specific profile based on user type
        if user_type == 'PARENT':
            ParentProfile.objects.create(
                user_profile=profile,
                parent=parent
            )
        elif user_type == 'STUDENT':
            StudentProfile.objects.create(
                user_profile=profile,
                student=student
            )

        # Generate tokens
        refresh = RefreshToken.for_user(user)

        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'user_type': user_type,
            'email': email
        })

    except Exception as e:
        return Response(
            {'error': str(e)},
            status=status.HTTP_400_BAD_REQUEST
        )


@api_view(['POST'])
@permission_classes([AllowAny])
def portal_login(request):
    """Handle portal user login"""
    try:
        email = request.data.get('email')
        password = request.data.get('password')

        user = User.objects.get(email=email)
        if not user.check_password(password):
            raise User.DoesNotExist

        profile = user.userprofile
        refresh = RefreshToken.for_user(user)

        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'user_type': profile.user_type,
            'email': email
        })

    except User.DoesNotExist:
        return Response(
            {'error': 'Invalid credentials'},
            status=status.HTTP_401_UNAUTHORIZED
        )
