# Student Management System

The Student Management System is a web application built with Django and React that allows educational institutions to manage student records, courses, applicants, and more. It provides separate portals for administrators, instructors, and students to perform their respective tasks.

## Features

- Admin Portal: Allows administrators to manage student records, courses, applicants, and other administrative tasks.
- Instructor Portal: Enables instructors to manage their courses, view student enrollments, and interact with students.
- Student Portal: Provides students with access to enroll in courses, view their enrolled courses, and interact with instructors.
- Course Management: Allows administrators and instructors to create, update, and delete courses.
- Applicant Management: Enables administrators to review and process student applications.

## Installation

1. Clone the repository:
   git clone https://github.com/your-username/student-management-system.git

2. Navigate to the project directory:
   cd ...
   cd

3. Set up the virtual environment:
   python -m venv lgm_env
   source lgm_env/bin/activate

4. Install the required dependencies:
   pip install -r requirements.txt

5. Set up the Django backend:

- Navigate to the `backend` directory:
  ```
  cd backend
  ```
- Apply database migrations:
  ```
  python manage.py migrate
  ```
- Create a superuser (admin account):
  ```
  python manage.py createsuperuser
  ```
- Start the Django development server:
  ```
  python manage.py runserver
  ```

6. Set up the React frontend:

- Navigate to the `frontend` directory:
  ```
  cd ../frontend
  ```
- Install the required dependencies:
  ```
  npm install
  ```
- Start the React development server:
  ```
  npm start
  ```

7. Access the application:

- Backend API: `http://localhost:8000/`
- Frontend: `http://localhost:3000/`

## Project Structure

The project consists of the following main directories and apps:

- `backend/`: Contains the Django backend code.
- `apps/`: Contains the Django apps.
- `students/`: Manages student records and related functionality.
- `courses/`: Handles course management and related operations.
- `applicants/`: Manages student applications and related processes.
- `teachers/`: Manages teacher records and related functionality.
- `config/`: Contains the Django project configuration files.

- `frontend/`: Contains the React frontend code.
- `src/`: Contains the main source code for the React frontend.
- `components/`: Contains reusable React components.
  - `AdminPortal/`: Components specific to the admin portal.
  - `InstructorPortal/`: Components specific to the instructor portal.
  - `StudentPortal/`: Components specific to the student portal.

## Contributing

Contributions to the Student Management System are welcome! If you find any bugs or have suggestions for improvements, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
