import React, { useState, useEffect } from "react";
import { Dropdown, DropdownItem } from "../../../ui/dropdown";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableHeaderCell,
} from "../../../ui/table";

export const ApplicantsSection = ({
  applicants = [],
  selected = [],
  onSelect,
  onApprove,
  onEnroll,
  onReject,
  programs = [],
  setFilter,
  loading,
}) => {
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [filteredApplicants, setFilteredApplicants] = useState([]);

  // Safely filter applicants when data changes
  useEffect(() => {
    if (!Array.isArray(applicants)) {
      console.warn("Applicants data is not an array:", applicants);
      setFilteredApplicants([]);
      return;
    }

    const filtered = applicants.filter((applicant) =>
      selectedStatus === "all"
        ? true
        : applicant?.status?.toLowerCase() === selectedStatus
    );
    setFilteredApplicants(filtered);
  }, [applicants, selectedStatus]);

  const filterTrigger = (
    <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
      Filter Status:{" "}
      {selectedStatus.charAt(0).toUpperCase() + selectedStatus.slice(1)}
    </button>
  );

  const filterMenu = (
    <>
      <DropdownItem onClick={() => setSelectedStatus("all")}>
        All Applications
      </DropdownItem>
      <DropdownItem onClick={() => setSelectedStatus("pending")}>
        Pending
      </DropdownItem>
      <DropdownItem onClick={() => setSelectedStatus("approved")}>
        Approved
      </DropdownItem>
      <DropdownItem onClick={() => setSelectedStatus("rejected")}>
        Rejected
      </DropdownItem>
    </>
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-2">
          <Dropdown trigger={filterTrigger} menu={filterMenu} />
          {/* Add Program filter */}
          <select
            className="px-3 py-2 border rounded-md"
            onChange={(e) =>
              setFilter((prev) => ({ ...prev, program: e.target.value }))
            }
          >
            <option value="all">All Programs</option>
            {programs.map((prog) => (
              <option key={prog.id} value={prog.id}>
                {prog.name}
              </option>
            ))}
          </select>
        </div>
        <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
          Add New Application
        </button>
      </div>

      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell>Reference #</TableHeaderCell>
            <TableHeaderCell>Name</TableHeaderCell>
            <TableHeaderCell>Program</TableHeaderCell>
            <TableHeaderCell>Status</TableHeaderCell>
            <TableHeaderCell>Enrollment Status</TableHeaderCell>
            <TableHeaderCell>Date Applied</TableHeaderCell>
            <TableHeaderCell>Actions</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredApplicants.map((applicant) => (
            <TableRow key={applicant?.reference_number || Math.random()}>
              <TableCell>{applicant?.reference_number}</TableCell>
              <TableCell>
                {applicant?.first_name} {applicant?.last_name}
              </TableCell>
              <TableCell>{applicant?.program}</TableCell>
              <TableCell>
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    applicant?.status === "Pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : applicant?.status === "Approved"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                  }`}
                >
                  {applicant?.status || "Unknown"}
                </span>
              </TableCell>
              <TableCell>
                {applicant?.status === "Approved" && (
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      applicant?.is_enrolled
                        ? "bg-blue-100 text-blue-800"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {applicant?.is_enrolled ? "Enrolled" : "Not Enrolled"}
                  </span>
                )}
              </TableCell>
              <TableCell>
                {applicant?.applied_date
                  ? new Date(applicant.applied_date).toLocaleDateString()
                  : "N/A"}
              </TableCell>
              <TableCell>
                <Dropdown
                  trigger={
                    <button className="p-1 hover:bg-gray-100 rounded">⋮</button>
                  }
                  menu={
                    <>
                      <DropdownItem onClick={() => console.log("View")}>
                        View Details
                      </DropdownItem>

                      {/* Show Approve option only for pending applications */}
                      {applicant?.status === "Pending" && (
                        <DropdownItem
                          onClick={() => onApprove?.(applicant.id)}
                          disabled={loading}
                        >
                          Approve
                        </DropdownItem>
                      )}

                      {/* Show Enroll option only for approved but not enrolled */}
                      {applicant?.status === "Approved" &&
                        !applicant?.is_enrolled && (
                          <DropdownItem
                            onClick={() => onEnroll?.(applicant.id)}
                            className="text-green-600"
                          >
                            Process Enrollment
                          </DropdownItem>
                        )}

                      {/* Show Reject for pending applications */}
                      {applicant?.status === "Pending" && (
                        <DropdownItem
                          onClick={() => onReject?.(applicant.id)}
                          className="text-red-600"
                        >
                          Reject
                        </DropdownItem>
                      )}
                    </>
                  }
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {filteredApplicants.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          {loading ? "Loading applications..." : "No applications found."}
        </div>
      )}
    </div>
  );
};

export default ApplicantsSection;
