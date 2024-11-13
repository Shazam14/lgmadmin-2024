# accounts/serializers.py
from rest_framework import serializers
from django.contrib.auth.models import User
from .models import UserProfile, ParentProfile, StudentProfile
from apps.students.models import Student
from apps.parents.models import Parent


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'last_name')
        read_only_fields = ('id',)


class UserProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = UserProfile
        fields = (
            'id',
            'user',
            'user_type',
            'last_login_ip',
            'created_at',
            'updated_at'
        )
        read_only_fields = ('id', 'created_at', 'updated_at')

    def to_representation(self, instance):
        data = super().to_representation(instance)
        # Add profile-specific data based on user type
        if instance.user_type == 'PARENT' and hasattr(instance, 'parent_profile'):
            data['parent_data'] = ParentProfileSerializer(
                instance.parent_profile).data
        elif instance.user_type == 'STUDENT' and hasattr(instance, 'student_profile'):
            data['student_data'] = StudentProfileSerializer(
                instance.student_profile).data
        return data


class ParentProfileSerializer(serializers.ModelSerializer):
    user_profile = UserProfileSerializer(read_only=True)
    children = serializers.SerializerMethodField()

    class Meta:
        model = ParentProfile
        fields = (
            'id',
            'user_profile',
            'parent',
            'children',
            'preferred_contact_method',
            'alternate_phone',
            'notification_preferences',
            'primary_contact'
        )
        read_only_fields = ('id', 'user_profile', 'parent', 'children')

    def get_children(self, obj):
        """Get simplified children data"""
        return [{
            'id': child.id,
            'name': f"{child.first_name} {child.last_name}",
            'grade': child.grade,
            'program': child.program.name if child.program else None,
            'student_id': child.student_id
        } for child in obj.children.all()]


class StudentProfileSerializer(serializers.ModelSerializer):
    user_profile = UserProfileSerializer(read_only=True)
    grade_level = serializers.ReadOnlyField()

    class Meta:
        model = StudentProfile
        fields = (
            'id',
            'user_profile',
            'student',
            'parent_profile',
            'grade_level'
        )
        read_only_fields = ('id', 'user_profile', 'student', 'parent_profile')

    def to_representation(self, instance):
        data = super().to_representation(instance)
        # Add student's academic data
        if instance.student:
            data['academic_info'] = {
                'grade': instance.student.grade,
                'program': instance.student.program.name if instance.student.program else None,
                'student_id': instance.student.student_id,
                'attendance': instance.student.attendance_percentage
            }
        return data


class PortalSignupSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)
    user_type = serializers.ChoiceField(choices=UserProfile.USER_TYPES)
    access_code = serializers.CharField()

    def validate(self, data):
        user_type = data.get('user_type')
        email = data.get('email')

        # Check if user already exists
        if User.objects.filter(email=email).exists():
            raise serializers.ValidationError("Email already registered")

        # Validate access code based on user type
        if user_type == 'PARENT':
            parent = Parent.objects.filter(email=email).first()
            if not parent:
                raise serializers.ValidationError("Parent not found")
        elif user_type == 'STUDENT':
            student = Student.objects.filter(email=email).first()
            if not student:
                raise serializers.ValidationError("Student not found")

        return data


class PortalLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        email = data.get('email')
        password = data.get('password')

        try:
            user = User.objects.get(email=email)
            if not user.check_password(password):
                raise serializers.ValidationError("Invalid credentials")
            data['user'] = user
        except User.DoesNotExist:
            raise serializers.ValidationError("Invalid credentials")

        return data
