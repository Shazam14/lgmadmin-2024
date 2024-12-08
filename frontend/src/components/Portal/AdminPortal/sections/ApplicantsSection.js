// src/components/Portal/AdminPortal/sections/ApplicantsSection.js
import React, { useState } from "react";
import { Dropdown, DropdownItem } from "../../../ui/dropdown";
import {
  Table,
  TableHead, // Changed from TableHeader
  TableBody,
  TableRow,
  TableCell,
  TableHeaderCell,
} from "../../../ui/table";

export const ApplicantsSection = () => {
  const [selectedStatus, setSelectedStatus] = useState("all");

  const filterTrigger = (
    <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
      Filter Status
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

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <Dropdown trigger={filterTrigger} menu={filterMenu} />

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
            <TableHeaderCell>Date Applied</TableHeaderCell>
            <TableHeaderCell>Actions</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {mockApplicants.map((applicant) => (
            <TableRow key={applicant.id}>
              <TableCell>{applicant.referenceNo}</TableCell>
              <TableCell>{applicant.name}</TableCell>
              <TableCell>{applicant.program}</TableCell>
              <TableCell>
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    applicant.status === "Pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : applicant.status === "Approved"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                  }`}
                >
                  {applicant.status}
                </span>
              </TableCell>
              <TableCell>{applicant.dateApplied}</TableCell>
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
                      <DropdownItem onClick={() => console.log("Approve")}>
                        Approve
                      </DropdownItem>
                      <DropdownItem onClick={() => console.log("Reject")}>
                        <span className="text-red-600">Reject</span>
                      </DropdownItem>
                    </>
                  }
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

// Mock data for testing
const mockApplicants = [
  {
    id: 1,
    referenceNo: "APP-2024-001",
    name: "John Doe",
    program: "Elementary",
    status: "Pending",
    dateApplied: "2024-01-15",
  },
  {
    id: 2,
    referenceNo: "APP-2024-002",
    name: "Jane Smith",
    program: "Junior High",
    status: "Approved",
    dateApplied: "2024-01-16",
  },
  // Add more mock data as needed
];

export default ApplicantsSection;
