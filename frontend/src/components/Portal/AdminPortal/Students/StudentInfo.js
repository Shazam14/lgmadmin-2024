// StudentInfo.js
import React from "react";

const StudentInfo = ({ student }) => {
  return (
    <div className="student-info">
      <div className="student-image">
        {/* Display the student's image */}
        {/* <img src={student.imageUrl} alt={student.first_name} /> */}
      </div>
      <div className="student-details">
        <h3>Student Information</h3>
        <div className="form-group">
          <label>First Name</label>
          <input type="text" readOnly />
        </div>
        {/* <div className="form-group">
          <label>Middle Name</label>
          <input type="text" value={student.middleName} readOnly />
        </div>
        <div className="form-group">
          <label>Last Name</label>
          <input type="text" value={student.last_name} readOnly />
        </div>
        <div className="form-group">
          <label>Student ID</label>
          <input type="text" value={student.studentId} readOnly />
        </div>
        <div className="form-group">
          <label>Gender</label>
          <input type="text" value={student.gender} readOnly />
        </div>
        <div className="form-group">
          <label>Age</label>
          <input type="text" value={student.age} readOnly />
        </div>
        <div className="form-group">
          <label>Birthday</label>
          <input type="text" value={student.birthday} readOnly />
        </div>
        <div className="form-group">
          <label>Email Address</label>
          <input type="email" value={student.email} readOnly />
        </div>
        <div className="form-group">
          <label>Phone Number</label>
          <input type="tel" value={student.phoneNumber} readOnly />
        </div>
        <div className="form-group">
          <label>Street Address</label>
          <input type="text" value={student.streetAddress} readOnly />
        </div>
        <div className="form-group">
          <label>City</label>
          <input type="text" value={student.city} readOnly />
        </div>
        <div className="form-group">
          <label>State/Province</label>
          <input type="text" value={student.stateProvince} readOnly />
        </div>
        <div className="form-group">
          <label>Student status</label>
          <input type="text" value={student.status} readOnly />
        </div>
        <div className="form-group">
          <label>Active Program</label>
          <input type="text" value={student.activeProgram} readOnly />
        </div>
        <div className="form-group">
          <label>Grade</label>
          <input type="text" value={student.grade} readOnly />
        </div>
        <div className="form-group">
          <label>Section</label>
          <input type="text" value={student.section} readOnly />
        </div>
        <div className="form-group">
          <label>Tuition Remarks</label>
          <input type="text" value={student.tuitionRemarks} readOnly />
        </div>
        <div className="form-group">
          <label>Tuition Status</label>
          <input type="text" value={student.tuitionStatus} readOnly />
        </div>
        <div className="form-group">
          <label>Account Status</label>
          <input type="text" value={student.accountStatus} readOnly />
        </div> */}
      </div>
    </div>
  );
};

export default StudentInfo;
