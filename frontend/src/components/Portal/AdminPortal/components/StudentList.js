// src/components/StudentList.js
import React, { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getStudents } from "../../../../redux/studentSlice";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "../../../../styles/portal/admintable.css";

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
  { headerName: "ID", field: "student_id" },
  { headerName: "Name", field: "name" },
  { headerName: "Birthday", field: "birthday" },
  { headerName: "Email", field: "email" },
  { headerName: "Tuition Status", field: "tuition_status" },
  { headerName: "Account Status", field: "account_status" },
];

const StudentsList = () => {
  const dispatch = useDispatch();
  const students = useSelector((state) => state.students.entities);
  const loading = useSelector((state) => state.students.loading);
  const error = useSelector((state) => state.students.error);

  useEffect(() => {
    dispatch(getStudents());
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
