// StudentDetail.js
import React, { useEffect, useState } from "react";
import { Link, useLocation, Outlet, useNavigate } from "react-router-dom";
import { fetchStudentByStudentId } from "../../../../services/api";
import StudentInfo from "./StudentInfo";
import ParentInfo from "../Parents/Parents";
import EmergencyContact from "../Emergency/Emergency";
import Courses from "../Courses/CourseList";
import Grades from "../Grades/Grades";
import TuitionHistory from "../TuitionHistory/TuitionHistory";
import "../../../../styles/portal/info.css";

const StudentDetail = () => {
  const { state } = useLocation();
  const studentId = state?.studentId;
  const navigate = useNavigate();
  console.log("received Student id", studentId);

  const [student, setStudent] = useState(null);
  const [activeTab, setActiveTab] = useState("info");

  console.log("student: ", student);
  // console.log("parents of student: ", student.parents[0]);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const data = await fetchStudentByStudentId(studentId);
        setStudent(data);
      } catch (error) {
        console.error("Error fetching student:", error);
      }
    };

    fetchStudent();
  }, [studentId]);

  console.log("student: ", studentId);

  return (
    <div>
      <h2>Student Information</h2>
      {student ? (
        <div>
          <div className="student-details">
            <div className="main-details">
              <div className="student-name">
                <h3>{student.name}</h3>
              </div>
              <div className="student-id">
                <p>Student ID: {student.student_id}</p>
              </div>
              <div className="student-status">
                <p>Student Status: {student.status}</p>
              </div>
              <div className="active-program">
                <p>Active Program: {student.active_program}</p>
              </div>
              <div className="student-grade">
                <p>Grade: {student.grade}</p>
              </div>
            </div>
            <div className="additional-details">
              <div className="student-section">
                <p>Section: {student.section}</p>
              </div>
              <div className="tuition-remarks">
                <p>Tuition Remarks: {student.tuition_remarks}</p>
              </div>
              <div className="tuition-status">
                <p>Tuition Status: {student.tuition_status}</p>
              </div>
              <div className="account-status">
                <p>Account Status: {student.account_status}</p>
              </div>
            </div>
            <div className="actions">
              <button className="reset-btn">Reset</button>
              <button className="update-btn">Update</button>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading student details...</p>
      )}
    </div>
  );
};

export default StudentDetail;
