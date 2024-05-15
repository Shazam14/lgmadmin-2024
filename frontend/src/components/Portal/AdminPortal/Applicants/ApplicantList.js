// src/components/ApplicantList.js
import React, { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getApplicants } from "../../../../redux/applicantSlice";
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
  { headerName: "Applicant ID", field: "applicant_id" },
  { headerName: "Name", field: "name" },
  { headerName: "Birthday", field: "birthday" },
  { headerName: "Email", field: "email" },
  { headerName: "Program applied", field: "course_of_interest" },
  { headerName: "Account Status", field: "application_status" },
];

const ApplicantList = () => {
  const dispatch = useDispatch();
  const applicants = useSelector((state) => state.applicants.entities);
  const loading = useSelector((state) => state.applicants.loading);
  const error = useSelector((state) => state.applicants.error);

  useEffect(() => {
    dispatch(getApplicants());
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

  console.log("Applicants in component", applicants);

  return (
    <div>
      <h1 className="table-heading">Applicant List</h1>
      <div
        className="ag-theme-alpine"
        style={{ height: "600px", width: "80vw" }}
      >
        <AgGridReact
          columnDefs={columnDefs}
          rowData={applicants}
          defaultColDef={defaultColDef}
          pagination={true}
          paginationPageSize={10}
        />
      </div>
    </div>
  );
};

export default ApplicantList;
