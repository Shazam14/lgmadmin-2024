import React from "react";
import "../../../../styles/admin.css";
import { Outlet, useNavigate } from "react-router-dom";

const StudentTab = () => {
  const navigate = useNavigate();
  const studentTabs = [
    {
      name: "Student's details",
      key: "student",
      linkTo: "/students/:studentId",
    },
    {
      name: "Parents",
      key: "parent",
      linkTo: "/students/parent-details",
    },
    {
      name: "Emergency contact",
      key: "emergency",
      linkTo: "/students/emergency-contact",
    },
  ];
  return (
    <div>
      <div className="student-tabs">
        {studentTabs.map((item) => (
          <div
            key={item.key}
            className="student-tabs-item"
            onClick={() => navigate(item.linkTo)}
          >
            <div className="text">{item.name}</div>
          </div>
        ))}
      </div>
      <Outlet />
    </div>
  );
};

export default StudentTab;
