# LGMS API Structure Analysis


## Parents App


### Models


#### parent

**Fields:**

- id
- first_name
- middle_name
- last_name
- email
- phone_number
- street_address
- city
- state_province
- account_status
- relationship
- primary_contact_value
- contact_priority
- attended_conferences
- participated_activities
- returned_reply_slips
- outstanding_parent_award
- access_code
- portal_access_enabled

**Relationships:**

- signed_journals → signedjournal
- applicants → applicant
- user_profile → userprofile
- extended_profile → parentprofile

#### signedjournal

**Fields:**

- id
- parent
- teacher
- student
- date_signed
- content
- parent_notes

### Serializers


#### ApplicantSerializer

- Model: applicant
- Fields: All

#### ApplicationSerializer


#### ParentSerializer

- Model: parent
- Fields: All

#### ParentUploadSerializer


### Views


#### ParentViewSet

- Type: ModelViewSet
- Serializer: ParentSerializer
- Model: parent
- Methods:
  - check_object_permissions
  - check_permissions
  - check_throttles
  - create
  - destroy
  - determine_version
  - dispatch
  - filter_queryset
  - finalize_response
  - get_authenticate_header
  - get_authenticators
  - get_content_negotiator
  - get_exception_handler
  - get_exception_handler_context
  - get_extra_action_url_map
  - get_format_suffix
  - get_object
  - get_paginated_response
  - get_parser_context
  - get_parsers
  - get_permissions
  - get_queryset
  - get_renderer_context
  - get_renderers
  - get_serializer
  - get_serializer_class
  - get_serializer_context
  - get_success_headers
  - get_throttles
  - get_view_description
  - get_view_name
  - handle_exception
  - http_method_not_allowed
  - initial
  - initialize_request
  - list
  - options
  - paginate_queryset
  - partial_update
  - perform_authentication
  - perform_content_negotiation
  - perform_create
  - perform_destroy
  - perform_update
  - permission_denied
  - raise_uncaught_exception
  - retrieve
  - reverse_action
  - setup
  - throttled
  - update

#### ParenttUploadView

- Type: CreateAPIView
- Serializer: ParentUploadSerializer
- Methods:
  - check_object_permissions
  - check_permissions
  - check_throttles
  - create
  - determine_version
  - dispatch
  - filter_queryset
  - finalize_response
  - get_authenticate_header
  - get_authenticators
  - get_content_negotiator
  - get_exception_handler
  - get_exception_handler_context
  - get_format_suffix
  - get_object
  - get_paginated_response
  - get_parser_context
  - get_parsers
  - get_permissions
  - get_queryset
  - get_renderer_context
  - get_renderers
  - get_serializer
  - get_serializer_class
  - get_serializer_context
  - get_success_headers
  - get_throttles
  - get_view_description
  - get_view_name
  - handle_exception
  - http_method_not_allowed
  - initial
  - initialize_request
  - list
  - options
  - paginate_queryset
  - perform_authentication
  - perform_content_negotiation
  - perform_create
  - permission_denied
  - post
  - raise_uncaught_exception
  - retrieve
  - setup
  - throttled
  - update

---


## Students App


### Models


#### student

**Fields:**

- id
- applicant
- program
- first_name
- middle_name
- last_name
- gender
- age
- birthday
- email
- student_id
- student_status
- grade
- section
- tuition_notes
- tuition_status
- account_status
- promoted
- elementary_certificate
- junior_high_certificate
- access_code
- portal_access_enabled
- attendance_percentage

**Relationships:**

- signed_journals → signedjournal
- enrollment → enrollment
- student_grades → grade
- user_profile → userprofile
- parent_profiles → parentprofile
- extended_profile → studentprofile

### Serializers


#### StudentSerializer

- Model: student
- Fields:
  - id
  - first_name
  - middle_name
  - last_name
  - gender
  - age
  - birthday
  - email
  - student_id
  - student_status
  - grade
  - section
  - tuition_notes
  - tuition_status
  - account_status
  - parents

#### StudentUploadSerializer


### Views


#### StudentUploadView

- Type: CreateAPIView
- Serializer: StudentUploadSerializer
- Methods:
  - check_object_permissions
  - check_permissions
  - check_throttles
  - create
  - determine_version
  - dispatch
  - filter_queryset
  - finalize_response
  - get_authenticate_header
  - get_authenticators
  - get_content_negotiator
  - get_exception_handler
  - get_exception_handler_context
  - get_format_suffix
  - get_object
  - get_paginated_response
  - get_parser_context
  - get_parsers
  - get_permissions
  - get_queryset
  - get_renderer_context
  - get_renderers
  - get_serializer
  - get_serializer_class
  - get_serializer_context
  - get_success_headers
  - get_throttles
  - get_view_description
  - get_view_name
  - handle_exception
  - http_method_not_allowed
  - initial
  - initialize_request
  - list
  - options
  - paginate_queryset
  - perform_authentication
  - perform_content_negotiation
  - perform_create
  - permission_denied
  - post
  - raise_uncaught_exception
  - retrieve
  - setup
  - throttled
  - update

#### StudentViewSet

- Type: ModelViewSet
- Serializer: StudentSerializer
- Model: student
- Methods:
  - check_object_permissions
  - check_permissions
  - check_throttles
  - create
  - destroy
  - determine_version
  - dispatch
  - filter_queryset
  - finalize_response
  - get_authenticate_header
  - get_authenticators
  - get_content_negotiator
  - get_exception_handler
  - get_exception_handler_context
  - get_extra_action_url_map
  - get_format_suffix
  - get_object
  - get_paginated_response
  - get_parser_context
  - get_parsers
  - get_permissions
  - get_queryset
  - get_renderer_context
  - get_renderers
  - get_serializer
  - get_serializer_class
  - get_serializer_context
  - get_success_headers
  - get_throttles
  - get_view_description
  - get_view_name
  - handle_exception
  - http_method_not_allowed
  - initial
  - initialize_request
  - list
  - options
  - paginate_queryset
  - partial_update
  - perform_authentication
  - perform_content_negotiation
  - perform_create
  - perform_destroy
  - perform_update
  - permission_denied
  - raise_uncaught_exception
  - retrieve
  - reverse_action
  - setup
  - throttled
  - update

---


## Portal App


### Models


#### portalnotification

**Fields:**

- id
- user
- title
- message
- created_at
- read
- category

#### portalactivity

**Fields:**

- id
- user
- activity_type
- description
- timestamp

### Views


#### PortalParentViewSet

- Type: ViewSet
- Methods:
  - check_object_permissions
  - check_permissions
  - check_throttles
  - children
  - determine_version
  - dispatch
  - finalize_response
  - get_authenticate_header
  - get_authenticators
  - get_content_negotiator
  - get_exception_handler
  - get_exception_handler_context
  - get_extra_action_url_map
  - get_format_suffix
  - get_parser_context
  - get_parsers
  - get_permissions
  - get_renderer_context
  - get_renderers
  - get_throttles
  - get_view_description
  - get_view_name
  - handle_exception
  - http_method_not_allowed
  - initial
  - initialize_request
  - options
  - perform_authentication
  - perform_content_negotiation
  - permission_denied
  - raise_uncaught_exception
  - reverse_action
  - setup
  - student_details
  - throttled
  - update_student

#### PortalViewSet

- Type: ViewSet
- Methods:
  - check_object_permissions
  - check_permissions
  - check_throttles
  - children
  - dashboard
  - determine_version
  - dispatch
  - finalize_response
  - get_activities
  - get_authenticate_header
  - get_authenticators
  - get_content_negotiator
  - get_exception_handler
  - get_exception_handler_context
  - get_extra_action_url_map
  - get_format_suffix
  - get_notifications
  - get_parent_dashboard
  - get_parser_context
  - get_parsers
  - get_permissions
  - get_renderer_context
  - get_renderers
  - get_student_dashboard
  - get_throttles
  - get_view_description
  - get_view_name
  - handle_exception
  - http_method_not_allowed
  - initial
  - initialize_request
  - login
  - logout
  - options
  - perform_authentication
  - perform_content_negotiation
  - permission_denied
  - raise_uncaught_exception
  - reverse_action
  - setup
  - signup
  - status
  - student_details
  - throttled
  - update_student

---


## Grades App


### Models


#### subject

**Fields:**

- id
- name
- description

**Relationships:**

- enrollment → enrollment
- grade_levels → gradelevel
- academicperiodmapping → academicperiodmapping
- highschoolsubject → highschoolsubject
- grade → grade

#### program

**Fields:**

- id
- name
- description
- age_range

**Relationships:**

- applicant → applicant
- student → student
- gradelevel → gradelevel
- casaprogram → casaprogram
- gradeschoolprogram → gradeschoolprogram
- specialeducationprogram → specialeducationprogram

#### gradelevel

**Fields:**

- id
- program
- name

**Relationships:**

- enrollment → enrollment
- academicperiodmapping → academicperiodmapping

#### academicperiod

**Fields:**

- id
- name

**Relationships:**

- academicperiodmapping → academicperiodmapping

#### academicperiodmapping

**Fields:**

- id
- academic_period
- grade_level

#### casaprogram

**Fields:**

- program
- curriculum_areas
- evaluation_criteria

#### gradeschoolprogram

**Fields:**

- program
- curriculum_subjects

#### highschoolsubject

**Fields:**

- subject

#### instructionalprogram

**Fields:**

- id
- name
- description

**Relationships:**

- specialeducationprogram → specialeducationprogram

#### specialeducationprogram

**Fields:**

- program

#### grade

**Fields:**

- id
- student
- subject
- written_work
- performance_task
- quarterly_exam
- quarterly_grade
- final_grade
- evaluation_code
- remedial_passed
- cle_mve_grade

### Serializers


#### GradeSerializer

- Model: grade
- Fields:
  - id
  - student
  - subject
  - written_work
  - performance_task
  - quarterly_exam
  - quarterly_grade
  - final_grade
  - evaluation_code
  - remedial_passed
  - cle_mve_grade
  - student_url

#### ProgramSerializer

- Model: program
- Fields:
  - id
  - name
  - description
  - age_range

#### SubjectSerializer

- Model: subject
- Fields:
  - id
  - name

### Views


#### GradeViewSet

- Type: ModelViewSet
- Serializer: GradeSerializer
- Model: grade
- Methods:
  - check_object_permissions
  - check_permissions
  - check_throttles
  - create
  - destroy
  - determine_version
  - dispatch
  - filter_queryset
  - finalize_response
  - get_authenticate_header
  - get_authenticators
  - get_content_negotiator
  - get_exception_handler
  - get_exception_handler_context
  - get_extra_action_url_map
  - get_format_suffix
  - get_object
  - get_paginated_response
  - get_parser_context
  - get_parsers
  - get_permissions
  - get_queryset
  - get_renderer_context
  - get_renderers
  - get_serializer
  - get_serializer_class
  - get_serializer_context
  - get_success_headers
  - get_throttles
  - get_view_description
  - get_view_name
  - handle_exception
  - http_method_not_allowed
  - initial
  - initialize_request
  - list
  - options
  - paginate_queryset
  - partial_update
  - perform_authentication
  - perform_content_negotiation
  - perform_create
  - perform_destroy
  - perform_update
  - permission_denied
  - raise_uncaught_exception
  - retrieve
  - reverse_action
  - setup
  - throttled
  - update

#### ProgramListView

- Type: ListAPIView
- Serializer: ProgramSerializer
- Model: program
- Methods:
  - check_object_permissions
  - check_permissions
  - check_throttles
  - determine_version
  - dispatch
  - filter_queryset
  - finalize_response
  - get
  - get_authenticate_header
  - get_authenticators
  - get_content_negotiator
  - get_exception_handler
  - get_exception_handler_context
  - get_format_suffix
  - get_object
  - get_paginated_response
  - get_parser_context
  - get_parsers
  - get_permissions
  - get_queryset
  - get_renderer_context
  - get_renderers
  - get_serializer
  - get_serializer_class
  - get_serializer_context
  - get_throttles
  - get_view_description
  - get_view_name
  - handle_exception
  - http_method_not_allowed
  - initial
  - initialize_request
  - list
  - options
  - paginate_queryset
  - perform_authentication
  - perform_content_negotiation
  - permission_denied
  - raise_uncaught_exception
  - setup
  - throttled

---


## Applicants App


### Models


#### applicant

**Fields:**

- id
- first_name
- middle_name
- last_name
- parent
- gender
- age
- birthday
- program_option
- email
- phone_number
- address_house_no
- address_street
- address_barangay
- address_city
- address_state_province
- address_postal_code
- applied_date
- status
- reference_number

**Relationships:**

- students → student

### Serializers


#### ApplicantSerializer

- Model: applicant
- Fields: All

### Views


#### APIView

- Type: View
- Methods:
  - check_object_permissions
  - check_permissions
  - check_throttles
  - determine_version
  - dispatch
  - finalize_response
  - get_authenticate_header
  - get_authenticators
  - get_content_negotiator
  - get_exception_handler
  - get_exception_handler_context
  - get_format_suffix
  - get_parser_context
  - get_parsers
  - get_permissions
  - get_renderer_context
  - get_renderers
  - get_throttles
  - get_view_description
  - get_view_name
  - handle_exception
  - http_method_not_allowed
  - initial
  - initialize_request
  - options
  - perform_authentication
  - perform_content_negotiation
  - permission_denied
  - raise_uncaught_exception
  - setup
  - throttled

#### ApplicantApprovalView

- Type: APIView
- Methods:
  - check_object_permissions
  - check_permissions
  - check_throttles
  - determine_version
  - dispatch
  - finalize_response
  - generate_enrollment_link
  - get_authenticate_header
  - get_authenticators
  - get_content_negotiator
  - get_exception_handler
  - get_exception_handler_context
  - get_format_suffix
  - get_parser_context
  - get_parsers
  - get_permissions
  - get_renderer_context
  - get_renderers
  - get_throttles
  - get_view_description
  - get_view_name
  - handle_enrollment
  - handle_exception
  - handle_pending_status
  - handle_rejection
  - http_method_not_allowed
  - initial
  - initialize_request
  - options
  - perform_authentication
  - perform_content_negotiation
  - permission_denied
  - post
  - raise_uncaught_exception
  - send_mail
  - send_welcome_email
  - setup
  - setup_student_courses
  - throttled

#### ApplicantViewSet

- Type: ModelViewSet
- Serializer: ApplicantSerializer
- Model: applicant
- Methods:
  - check_object_permissions
  - check_permissions
  - check_throttles
  - create
  - destroy
  - determine_version
  - dispatch
  - filter_queryset
  - finalize_response
  - get_authenticate_header
  - get_authenticators
  - get_content_negotiator
  - get_exception_handler
  - get_exception_handler_context
  - get_extra_action_url_map
  - get_format_suffix
  - get_object
  - get_paginated_response
  - get_parser_context
  - get_parsers
  - get_permissions
  - get_queryset
  - get_renderer_context
  - get_renderers
  - get_serializer
  - get_serializer_class
  - get_serializer_context
  - get_success_headers
  - get_throttles
  - get_view_description
  - get_view_name
  - handle_exception
  - http_method_not_allowed
  - initial
  - initialize_request
  - list
  - options
  - paginate_queryset
  - partial_update
  - perform_authentication
  - perform_content_negotiation
  - perform_create
  - perform_destroy
  - perform_update
  - permission_denied
  - raise_uncaught_exception
  - retrieve
  - reverse_action
  - setup
  - throttled
  - update

---


## Courses App


### Models


#### course

**Fields:**

- id
- course_id
- name
- teacher_assigned
- phone_number
- details
- course_status

### Serializers


#### CourseSerializer

- Model: course
- Fields: All

#### TeacherSerializer

- Model: teacher
- Fields: All

### Views


#### CourseViewSet

- Type: ModelViewSet
- Serializer: CourseSerializer
- Model: course
- Methods:
  - check_object_permissions
  - check_permissions
  - check_throttles
  - create
  - destroy
  - determine_version
  - dispatch
  - filter_queryset
  - finalize_response
  - get_authenticate_header
  - get_authenticators
  - get_content_negotiator
  - get_exception_handler
  - get_exception_handler_context
  - get_extra_action_url_map
  - get_format_suffix
  - get_object
  - get_paginated_response
  - get_parser_context
  - get_parsers
  - get_permissions
  - get_queryset
  - get_renderer_context
  - get_renderers
  - get_serializer
  - get_serializer_class
  - get_serializer_context
  - get_success_headers
  - get_throttles
  - get_view_description
  - get_view_name
  - handle_exception
  - http_method_not_allowed
  - initial
  - initialize_request
  - list
  - options
  - paginate_queryset
  - partial_update
  - perform_authentication
  - perform_content_negotiation
  - perform_create
  - perform_destroy
  - perform_update
  - permission_denied
  - raise_uncaught_exception
  - retrieve
  - reverse_action
  - setup
  - throttled
  - update

---


## Enrollments App


### Models


#### enrollment

**Fields:**

- id
- student
- grade_level
- enrollment_date
- academic_year
- academic_period
- enrollment_status
- previous_school
- previous_school_address
- previous_school_phone
- special_needs
- allergies
- medications

### Serializers


#### ApplicantSerializer

- Model: applicant
- Fields: All

#### EnrollmentSerializer

- Model: enrollment
- Fields: All

### Views


#### EnrollmentViewSet

- Type: ModelViewSet
- Serializer: EnrollmentSerializer
- Model: enrollment
- Methods:
  - check_object_permissions
  - check_permissions
  - check_throttles
  - create
  - destroy
  - determine_version
  - dispatch
  - filter_queryset
  - finalize_response
  - get_authenticate_header
  - get_authenticators
  - get_content_negotiator
  - get_exception_handler
  - get_exception_handler_context
  - get_extra_action_url_map
  - get_format_suffix
  - get_object
  - get_paginated_response
  - get_parser_context
  - get_parsers
  - get_permissions
  - get_queryset
  - get_renderer_context
  - get_renderers
  - get_serializer
  - get_serializer_class
  - get_serializer_context
  - get_success_headers
  - get_throttles
  - get_view_description
  - get_view_name
  - handle_exception
  - http_method_not_allowed
  - initial
  - initialize_request
  - list
  - options
  - paginate_queryset
  - partial_update
  - perform_authentication
  - perform_content_negotiation
  - perform_create
  - perform_destroy
  - perform_update
  - permission_denied
  - raise_uncaught_exception
  - retrieve
  - reverse_action
  - setup
  - throttled
  - update

---
