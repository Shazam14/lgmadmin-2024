// StudentDetail.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchStudentByStudentId } from "../../../../services/api";
import "../../../../styles/portal/info.css";
import { useStudent } from "../../../../contexts/StudentContext";
const StudentDetail = () => {
  const { studentId } = useParams();
  //console.log("received Student id", studentId);
  const { student, updateStudent } = useStudent();

  // StudentDetail.js
  useEffect(() => {
    const fetchStudent = async () => {
      try {
        if (!student) {
          console.log("Fetching student with ID:", studentId);
          const data = await fetchStudentByStudentId(studentId);
          updateStudent(data);
        }
      } catch (error) {
        console.error("Error fetching student:", error);
      }
    };

    if (studentId) {
      fetchStudent();
    }
  }, [studentId, student]);

  return (
    <div className="student-profile-form">
      {student ? (
        <>
          <h1>Student Information</h1>
          <div className="form-left">
            {/* First name until phone */}
            <label className="label">First Name:</label>
            <input
              className="input-field"
              type="text"
              readOnly
              value={student.first_name}
            />
            <br />
            <label className="label">Last Name:</label>
            <input
              className="input-field"
              type="text"
              readOnly
              value={student.last_name}
            />
            <br />
            <label className="label">Phone Number:</label>
            <input
              className="input-field"
              type="tel"
              readOnly
              value={student.phone_number}
            />
          </div>
          <div className="image-container">{/* Image goes here */}</div>
          <div className="form-right">
            {/* Student ID until Account Status */}
            <label className="label">Student ID:</label>
            <input
              className="input-field"
              type="text"
              readOnly
              value={student.student_id}
            />
            <br />
            <label className="label">Account Status:</label>
            <input
              className="input-field"
              type="text"
              readOnly
              value={student.account_status}
            />
          </div>
          <div className="actions">
            <button className="reset-btn">Reset</button>
            <button className="update-btn">Update</button>
          </div>
        </>
      ) : (
        <p>Loading student details...</p>
      )}
    </div>
  );
};

export default StudentDetail;
