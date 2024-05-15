import React, { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getEnrollments } from "../../../../redux/enrollmentSlice";
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
  { headerName: "First Name", field: "applicant_id" },
  { headerName: "Name", field: "name" },
  { headerName: "Birthday", field: "birthday" },
  { headerName: "Email", field: "email" },
  { headerName: "Program applied", field: "course_of_interest" },
  { headerName: "Account Status", field: "application_status" },
];

const EnrollmentList = () => {
  const dispatch = useDispatch();
  const enrollments = useSelector((state) => state.enrollments.entities);
  const loading = useSelector((state) => state.enrollments.loading);
  const error = useSelector((state) => state.enrollments.error);

  useEffect(() => {
    dispatch(getEnrollments());
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

  console.log("Enrollments in component", enrollments);

  return (
    <div>
      <h1 className="table-heading">Enrollments List</h1>
      <div
        className="ag-theme-alpine"
        style={{ height: "600px", width: "80vw" }}
      >
        <AgGridReact
          columnDefs={columnDefs}
          rowData={enrollments}
          defaultColDef={defaultColDef}
          pagination={true}
          paginationPageSize={10}
        />
      </div>
    </div>
  );
};

export default EnrollmentList;
