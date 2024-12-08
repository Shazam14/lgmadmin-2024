// src/components/Portal/AdminPortal/sections/EnrollmentsSection.js
import React, { useState } from "react";
import { Dropdown, DropdownItem } from "../../../ui/dropdown";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableHeaderCell,
} from "../../../ui/table";

export const EnrollmentsSection = () => {
  const [academicYear, setAcademicYear] = useState("2024");
  const [semester, setSemester] = useState("1");

  return (
    <div className="space-y-6">
      {/* Enrollment Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="text-gray-500 text-sm">Total Enrollments</div>
          <h3 className="text-2xl font-bold">{mockEnrollments.length}</h3>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="text-gray-500 text-sm">New Enrollments</div>
          <h3 className="text-2xl font-bold text-green-600">12</h3>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="text-gray-500 text-sm">Pending Enrollments</div>
          <h3 className="text-2xl font-bold text-yellow-600">5</h3>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-4 mb-4">
        <select
          value={academicYear}
          onChange={(e) => setAcademicYear(e.target.value)}
          className="px-4 py-2 border rounded-md"
        >
          <option value="2024">2024</option>
          <option value="2023">2023</option>
        </select>
        <select
          value={semester}
          onChange={(e) => setSemester(e.target.value)}
          className="px-4 py-2 border rounded-md"
        >
          <option value="1">1st Semester</option>
          <option value="2">2nd Semester</option>
        </select>
      </div>

      {/* Enrollment Management Table */}
      <div className="bg-white rounded-lg shadow">
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell>Student ID</TableHeaderCell>
              <TableHeaderCell>Name</TableHeaderCell>
              <TableHeaderCell>Program</TableHeaderCell>
              <TableHeaderCell>Grade Level</TableHeaderCell>
              <TableHeaderCell>Section</TableHeaderCell>
              <TableHeaderCell>Status</TableHeaderCell>
              <TableHeaderCell>Actions</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mockEnrollments.map((enrollment) => (
              <TableRow key={enrollment.id}>
                <TableCell>{enrollment.studentId}</TableCell>
                <TableCell>{enrollment.name}</TableCell>
                <TableCell>{enrollment.program}</TableCell>
                <TableCell>{enrollment.gradeLevel}</TableCell>
                <TableCell>{enrollment.section}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      enrollment.status === "Enrolled"
                        ? "bg-green-100 text-green-800"
                        : enrollment.status === "Pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                    }`}
                  >
                    {enrollment.status}
                  </span>
                </TableCell>
                <TableCell>
                  <Dropdown
                    trigger={
                      <button className="p-1 hover:bg-gray-100 rounded">
                        ⋮
                      </button>
                    }
                    menu={
                      <>
                        <DropdownItem onClick={() => console.log("View")}>
                          View Details
                        </DropdownItem>
                        <DropdownItem onClick={() => console.log("Edit")}>
                          Edit Enrollment
                        </DropdownItem>
                        <DropdownItem onClick={() => console.log("Delete")}>
                          <span className="text-red-600">
                            Cancel Enrollment
                          </span>
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
    </div>
  );
};

// Mock data for testing
const mockEnrollments = [
  {
    id: 1,
    studentId: "2024-0001",
    name: "John Doe",
    program: "Elementary",
    gradeLevel: "Grade 4",
    section: "A",
    status: "Enrolled",
  },
  {
    id: 2,
    studentId: "2024-0002",
    name: "Jane Smith",
    program: "Elementary",
    gradeLevel: "Grade 5",
    section: "B",
    status: "Pending",
  },
  {
    id: 3,
    studentId: "2024-0003",
    name: "Mike Johnson",
    program: "Junior High",
    gradeLevel: "Grade 7",
    section: "A",
    status: "Enrolled",
  },
  // Add more mock data as needed
];

export default EnrollmentsSection;
