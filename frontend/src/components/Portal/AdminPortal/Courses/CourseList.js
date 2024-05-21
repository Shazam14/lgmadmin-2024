// src/components/CourseList.js
import React, { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCourses } from "../../../../redux/courseSlice";
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
  { headerName: "Course ID", field: "course_id" },
  { headerName: "Name", field: "name" },
  { headerName: "Teacher Assigned", field: "teacher_assigned" },
  { headerName: "Details", field: "details" },
  { headerName: "Course Status", field: "course_status" },
];

const CourseList = () => {
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.courses.entities);
  const loading = useSelector((state) => state.courses.loading);
  const error = useSelector((state) => state.courses.error);

  useEffect(() => {
    dispatch(getCourses());
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

  console.log("Students in component", courses);

  return (
    <div>
      <h1 className="table-heading">Courses List</h1>
      <div
        className="ag-theme-alpine"
        style={{ height: "400px", width: "80vw" }}
      >
        <AgGridReact
          columnDefs={columnDefs}
          rowData={courses}
          defaultColDef={defaultColDef}
          pagination={true}
          paginationPageSize={10}
        />
      </div>
    </div>
  );
};

export default CourseList;
