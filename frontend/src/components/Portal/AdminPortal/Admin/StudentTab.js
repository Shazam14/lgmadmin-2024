import React from "react";
import "../../../../styles/admin.css";
import { Outlet, useNavigate, useParams, useLocation } from "react-router-dom";

const StudentTab = () => {
  const { state } = useLocation();
  const studentId = state?.studentId;

  console.log("received Student id in student tab", studentId);
  const navigate = useNavigate();
  const studentTabs = [
    {
      name: "Student's details",
      key: "student",
      linkTo: `/students/${studentId}`,
    },
    {
      name: "Parents",
      key: "parent",
      linkTo: `/students/${studentId}/parent-details`,
    },
    {
      name: "Emergency contact",
      key: "emergency",
      linkTo: `/students/${studentId}/emergency-contact`,
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
