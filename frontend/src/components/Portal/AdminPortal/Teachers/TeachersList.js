// src/components/TeachersList.js
import React, { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTeachers } from "../../../../redux/teacherSlice";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "../../../../styles/portal/admintable.css"

const columnDefs = [
  {
    headerName: "Action Buttons",
    cellRenderer: (params) => (
      <>
        <button className="button-table">View</button>
        <button className="button-table">Edit</button>
      </>
    ),
  },
  { headerName: "ID", field: "teacher_id" },
  { headerName: "Name", field: "name" },
  { headerName: "Phone number", field: "phone_number" },
  { headerName: "Assigned course", field: "assigned_course" },
  { headerName: "Account Status", field: "account_status" },
];

const TeachersList = () => {
  const dispatch = useDispatch();
  const teachers = useSelector((state) => state.teachers.entities);
  const loading = useSelector((state) => state.teachers.loading);
  const error = useSelector((state) => state.teachers.error);

  useEffect(() => {
    dispatch(getTeachers());
  }, [dispatch]);

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

  console.log("Teachers in component", teachers);

  return (
    <div>
      <h1 className="table-heading">Teachers List</h1>
      <div
        className="ag-theme-alpine"
        style={{ height: "400px", width: "80vw" }}
      >
        <AgGridReact
          columnDefs={columnDefs}
          rowData={teachers}
          defaultColDef={defaultColDef}
          pagination={true}
          paginationPageSize={10}
        />
      </div>
    </div>
  );
};

export default TeachersList;
