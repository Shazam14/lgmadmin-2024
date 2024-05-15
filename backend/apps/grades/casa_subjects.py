class CASASubject:
    def __init__(self, subject_name, description):
        self.subject_name = subject_name
        self.description = description

    def update_subject_info(self, description):
        self.description = description

    def generate_progress_report(self):
        # Implementation for generating progress report
        pass


class PracticalLifeSubject(CASASubject):
    # Implementation for Practical Life subject class
    pass


class SensorialMaterialsSubject(CASASubject):
    # Implementation for Sensorial Materials subject class
    pass


class LanguageSubject(CASASubject):
    # Implementation for Language subject class
    pass


class GeographySubject(CASASubject):
    # Implementation for Geography subject class
    pass


class BotanySubject(CASASubject):
    # Implementation for Botany subject class
    pass


class ZoologySubject(CASASubject):
    # Implementation for Zoology subject class
    pass


class ArtSubject(CASASubject):
    # Implementation for Art subject class
    pass


class MusicSubject(CASASubject):
    # Implementation for Music subject class
    pass


class MathematicsSubject(CASASubject):
    # Implementation for Mathematics subject class
    pass
