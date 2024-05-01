// StudentDetail.js
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { fetchStudentById } from "../../../../services/api";
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
  console.log("received Student id", studentId);

  const [student, setStudent] = useState(null);
  const [activeTab, setActiveTab] = useState("info");

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const data = await fetchStudentById(studentId);
        setStudent(data);
      } catch (error) {
        console.error("Error fetching student:", error);
      }
    };

    fetchStudent();
  }, [studentId]);

  const renderTabContent = () => {
    switch (activeTab) {
      case "info":
        return <StudentInfo student={student} />;
      case "parent":
        return <ParentInfo student={student} />;
      case "emergency":
        return <EmergencyContact student={student} />;
      case "courses":
        return <Courses student={student} />;
      case "grades":
        return <Grades student={student} />;
      case "tuition":
        return <TuitionHistory student={student} />;
      default:
        return null;
    }
  };

  return (
    <div>
      <h2>Student Information TESTING</h2>
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
          <div>
            <ul>
              <li
                className={activeTab === "info" ? "active" : ""}
                onClick={() => setActiveTab("info")}
              >
                Student Info
              </li>
              <li
                className={activeTab === "parent" ? "active" : ""}
                onClick={() => setActiveTab("parent")}
              >
                Parent Info
              </li>
              <li
                className={activeTab === "emergency" ? "active" : ""}
                onClick={() => setActiveTab("emergency")}
              >
                Emergency Contact
              </li>
              <li
                className={activeTab === "courses" ? "active" : ""}
                onClick={() => setActiveTab("courses")}
              >
                Courses
              </li>
              <li
                className={activeTab === "grades" ? "active" : ""}
                onClick={() => setActiveTab("grades")}
              >
                Grades
              </li>
              <li
                className={activeTab === "tuition" ? "active" : ""}
                onClick={() => setActiveTab("tuition")}
              >
                Tuition History
              </li>
            </ul>
            <div>{renderTabContent()}</div>
          </div>
          <Link to="/students">Back to Student List</Link>
        </div>
      ) : (
        <p>Loading student details...</p>
      )}
    </div>
  );
};

export default StudentDetail;
