# api/views.py
from django.http import JsonResponse
from django.middleware.csrf import get_token
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.reverse import reverse
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from config.auth.custom_authentication import BlacklistJWTAuthentication


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def api_root(request):
    return Response({
        'students': reverse('student-list', request=request),
        'courses': reverse('course-list', request=request),
        'teachers': reverse('teacher-list', request=request),
        'applicants': reverse('applicant-list', request=request),
        'enrollments': reverse('enrollment-list', request=request),
        'student_upload': reverse('student-upload', request=request),
        'parents': reverse('parent-list', request=request),
        'grades': reverse('grade-list', request=request)
    })


class SignupView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        username = request.data.get('username')
        password = request.data.get('password')
        email = request.data.get('email')

        if not username or not password or not email:
            return Response({'error': 'Please provide username, password, and email'}, status=status.HTTP_400_BAD_REQUEST)

        if User.objects.filter(username=username).exists():
            return Response({'error': 'Username already exists'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = User.objects.create_user(
                username=username, password=password, email=email)
            user.save()
            refresh = RefreshToken.for_user(user)
            response = JsonResponse({'message': 'Signup successful'})
            response.set_cookie('access_token', str(
                refresh.access_token), httponly=True)
            response.set_cookie('refresh_token', str(refresh), httponly=True)
            response.set_cookie('username', username, httponly=True)
            response['X-CSRFToken'] = get_token(request)
            return response
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        username = request.data.get('username')
        password = request.data.get('password')

        try:
            user = User.objects.get(username=username)
            if user.check_password(password):
                refresh = RefreshToken.for_user(user)
                response = JsonResponse({'message': 'Login successful'})
                response.set_cookie(
                    'access_token',
                    str(refresh.access_token),
                    httponly=True,
                    secure=False,
                    samesite='Lax'
                )
                response.set_cookie(
                    'refresh_token',
                    str(refresh),
                    httponly=True,
                    secure=False,
                    samesite='Lax'
                )
                response.set_cookie(
                    'username',
                    username,
                    httponly=True,
                    samesite='Lax'
                )
                response['X-CSRFToken'] = get_token(request)
                print('Response from LOGIN', response)
                return response
            else:
                return Response({'error': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)
        except User.DoesNotExist:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)


class LogoutView(APIView):
    def post(self, request):
        response = Response()
        response.delete_cookie('access_token')
        response.delete_cookie('refresh_token')
        response.data = {'message': 'Logout successful'}
        return response
