// src/components/StudentList.js
import React, { useEffect, useMemo } from "react";
import axios from "axios";
import { useNavigate, Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getStudents } from "../../../../redux/studentSlice";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "../../../../styles/portal/admintable.css";

const StudentsList = () => {
  const dispatch = useDispatch();
  const students = useSelector((state) => state.students.entities);
  const loading = useSelector((state) => state.students.loading);
  const error = useSelector((state) => state.students.error);
  const navigate = useNavigate();

  const handleEditButton = (student) => {
    console.log("clicked students", student);
    navigate(`/students/${student.student_id}`, {
      state: { studentId: student.student_id },
    });
  };

  useEffect(() => {
    dispatch(getStudents());
  }, [dispatch]);

  const columnDefs = [
    {
      headerName: "Action Buttons",
      cellRenderer: (params) => (
        <>
          <button
            className="button-table"
            onClick={() => handleEditButton(params.data)}
          >
            Edit
          </button>
        </>
      ),
    },
    { headerName: "ID", field: "student_id" },
    { headerName: "First Name", field: "first_name" },
    { headerName: "Middle Name", field: "middle_name" },
    { headerName: "Last Name", field: "last_name" },
    { headerName: "Gender", field: "gender" },
    { headerName: "Birthday", field: "birthday" },
    { headerName: "Email", field: "email" },
    { headerName: "phone_number", field: "phone_number" },
    { headerName: "Tuition Status", field: "tuition_status" },
    { headerName: "Account Status", field: "account_status" },
  ];

  const defaultColDef = useMemo(
    () => ({
      resizable: true,
      sortable: true,
      filter: true,
    }),
    []
  );

  if (loading === "loading") {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  console.log("Students in component", students);

  return (
    <div>
      <h1 className="table-heading">Students List</h1>
      <div
        className="ag-theme-alpine"
        style={{ height: "400px", width: "80vw" }}
      >
        <AgGridReact
          columnDefs={columnDefs}
          rowData={students}
          defaultColDef={defaultColDef}
          pagination={true}
          paginationPageSize={10}
        />
      </div>
    </div>
  );
};

export default StudentsList;
