import React, { useState, useEffect, useMemo, useCallback } from "react";
import "../../../../styles/admin.css";
import "../../../../styles/portal/tabs.css";
import { Link, useLocation, useParams, useNavigate } from "react-router-dom";
import { useStudent } from "../../../../contexts/StudentContext";
import {
  fetchStudentByStudentId,
  fetchParentDetails,
} from "../../../../services/api";
import axios from "axios";

const StudentTab = () => {
  const { student } = useStudent();
  const { studentId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  console.log("STUDENTTAB", student);

  const studentTabs = useMemo(() => {
    console.log("STUDENTTAB - useMemo - student:", student);
    console.log("STUDENTTAB - useMemo - studentId:", studentId);
    console.log("Building paths with studentId:", studentId);
    return student
      ? [
          {
            name: "Student's details",
            key: "student",
            linkTo: `/admin/students/${studentId}`,
          },
          {
            name: "Parents",
            key: "parent",
            linkTo: `/admin/students/${studentId}/parent-info`,
          },
          {
            name: "Emergency contact",
            key: "emergency",
            linkTo: `/admin/students/${studentId}/emergency-contact`,
          },
        ]
      : [];
  }, [student, studentId]);

  const handleNavigation = (path) => {
    console.log("Navigating to-->:", path); // Check what path is being navigated to
  };

  return (
    <div className="student-tabs">
      {studentTabs.map((item) => (
        <Link
          key={item.key}
          to={item.linkTo}
          onClick={() => handleNavigation(item.linkTo)}
          className={`student-tabs-item ${
            location.pathname.includes(item.path) ? "active" : ""
          }`}
        >
          {item.name}
        </Link>
      ))}
    </div>
  );
};

export default StudentTab;
