from django.contrib import admin
from .models import (
    Program, Subject, GradeLevel, AcademicPeriod, AcademicPeriodMapping,
    CASAProgram, GradeSchoolProgram, HighSchoolSubject, InstructionalProgram,
    SpecialEducationProgram, Grade
)


@admin.register(Program)
class ProgramAdmin(admin.ModelAdmin):
    list_display = ('name', 'description', 'age_range')
    search_fields = ('name', 'description')


@admin.register(Subject)
class SubjectAdmin(admin.ModelAdmin):
    list_display = ('name', 'description')
    search_fields = ('name', 'description')


@admin.register(GradeLevel)
class GradeLevelAdmin(admin.ModelAdmin):
    list_display = ('name', 'program')
    search_fields = ('name', 'program__name')
    filter_horizontal = ('subjects',)


@admin.register(AcademicPeriod)
class AcademicPeriodAdmin(admin.ModelAdmin):
    list_display = ('name',)
    search_fields = ('name',)


@admin.register(AcademicPeriodMapping)
class AcademicPeriodMappingAdmin(admin.ModelAdmin):
    list_display = ('academic_period', 'grade_level')
    search_fields = ('academic_period__name', 'grade_level__name')
    filter_horizontal = ('subjects',)


@admin.register(CASAProgram)
class CASAProgramAdmin(admin.ModelAdmin):
    list_display = ('program',)
    search_fields = ('program__name',)


@admin.register(GradeSchoolProgram)
class GradeSchoolProgramAdmin(admin.ModelAdmin):
    list_display = ('program',)
    search_fields = ('program__name',)


@admin.register(HighSchoolSubject)
class HighSchoolSubjectAdmin(admin.ModelAdmin):
    list_display = ('subject',)
    search_fields = ('subject__name',)


@admin.register(InstructionalProgram)
class InstructionalProgramAdmin(admin.ModelAdmin):
    list_display = ('name', 'description')
    search_fields = ('name', 'description')


@admin.register(SpecialEducationProgram)
class SpecialEducationProgramAdmin(admin.ModelAdmin):
    list_display = ('program',)
    search_fields = ('program__name',)
    filter_horizontal = ('instructional_programs',)


@admin.register(Grade)
class GradeAdmin(admin.ModelAdmin):
    list_display = ('student', 'subject', 'quarterly_grade',
                    'final_grade', 'evaluation_code', 'remedial_passed')
    search_fields = ('student__name', 'subject__name')
    list_filter = ('evaluation_code', 'remedial_passed')
