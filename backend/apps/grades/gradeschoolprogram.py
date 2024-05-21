class GradeSchoolProgram(Program):
    def __init__(self, name, description, age_range, curriculum_subjects):
        super().__init__(name, description, age_range)
        self.curriculum_subjects = curriculum_subjects

    def track_student_progress(self):
        # Implementation for tracking student progress in Grade School program
        pass

    def generate_evaluation_report(self):
        # Implementation for generating evaluation report based on curriculum subjects
        pass

    def manage_awards(self):
        # Implementation for managing awards specific to Grade School program
        pass
