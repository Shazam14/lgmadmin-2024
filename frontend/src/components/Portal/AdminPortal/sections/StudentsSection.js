// src/components/Portal/AdminPortal/sections/StudentsSection.js
import React, { useState, useCallback, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../../ui/card";
import { Tabs, TabList, TabTrigger, TabContent } from "../../../ui/CustomTabs";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableHeaderCell,
} from "../../../ui/table";
import { Button } from "../../../ui/button";
import { Input } from "../../../ui/input";
import { Dropdown, DropdownItem } from "../../../ui/dropdown";
import { Search, Filter, Plus, MoreVertical } from "lucide-react";
import { Alert, AlertDescription } from "../../../ui/alert";

export const StudentsSection = ({ students, onUpdateStudent, loading }) => {
  console.log("StudentsSection rendered with:", {
    studentsCount: students?.length,
    students: students,
    loading,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    program: "all",
    grade: "all",
    section: "all",
    status: "active",
  });

  const filterOptions = useMemo(
    () => ({
      programs: [
        ...new Set(students?.map((s) => s.program?.name).filter(Boolean)),
      ],
      grades: [
        ...new Set(students?.map((s) => s.grade).filter(Boolean)),
      ].sort(),
      sections: [
        ...new Set(students?.map((s) => s.section).filter(Boolean)),
      ].sort(),
    }),
    [students]
  );

  // Filter students based on search term and filters

  const filteredStudents = useMemo(() => {
    if (!students) return [];

    return students.filter((student) => {
      // Search term matching
      const searchString = [
        student.first_name,
        student.last_name,
        student.student_id,
        student.email,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const matchesSearch =
        !searchTerm || searchString.includes(searchTerm.toLowerCase());

      // Filter matching with null checks
      const matchesFilters =
        (filters.program === "all" ||
          student.program?.name === filters.program) &&
        (filters.grade === "all" || student.grade === filters.grade) &&
        (filters.section === "all" || student.section === filters.section) &&
        (filters.status === "all" || student.account_status === filters.status);

      return matchesSearch && matchesFilters;
    });
  }, [students, searchTerm, filters]);

  // Handle status change with confirmation
  const handleStatusChange = useCallback(
    (studentId, newStatus) => {
      if (
        window.confirm(`Are you sure you want to change this student's status?`)
      ) {
        onUpdateStudent(studentId, {
          action: "status",
          data: { status: newStatus },
        });
      }
    },
    [onUpdateStudent]
  );

  const renderStudentTable = useCallback(
    (students) => {
      if (!students?.length) {
        return (
          <Alert>
            <AlertDescription>
              No students found matching your criteria.
            </AlertDescription>
          </Alert>
        );
      }

      return (
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell>Student ID</TableHeaderCell>
              <TableHeaderCell>Name</TableHeaderCell>
              <TableHeaderCell>Grade & Section</TableHeaderCell>
              <TableHeaderCell>Program</TableHeaderCell>
              <TableHeaderCell>Status</TableHeaderCell>
              <TableHeaderCell>Academic Standing</TableHeaderCell>
              <TableHeaderCell>Actions</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student.id} className="hover:bg-gray-50">
                <TableCell className="font-medium">
                  {student.student_id}
                </TableCell>
                <TableCell>{`${student.first_name} ${student.last_name}`}</TableCell>
                <TableCell>{`${student.grade || "N/A"} - ${student.section || "N/A"}`}</TableCell>
                <TableCell>{student.program?.name || "N/A"}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      student.account_status === "A"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {student.account_status === "A" ? "Active" : "Inactive"}
                  </span>
                </TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      student.promoted
                        ? "bg-green-100 text-green-800"
                        : student.tuition_status === "U"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {student.promoted
                      ? "Promoted"
                      : student.tuition_status === "U"
                        ? "Pending Tuition"
                        : "For Review"}
                  </span>
                </TableCell>
                <TableCell>
                  <Dropdown
                    trigger={
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    }
                    menu={
                      <>
                        <DropdownItem
                          onClick={() =>
                            onUpdateStudent(student.id, { action: "view" })
                          }
                        >
                          View Details
                        </DropdownItem>
                        {student.account_status === "A" && (
                          <DropdownItem
                            onClick={() =>
                              onUpdateStudent(student.id, { action: "promote" })
                            }
                            disabled={student.tuition_status === "U"}
                          >
                            Promote Student
                          </DropdownItem>
                        )}
                        <DropdownItem
                          onClick={() =>
                            handleStatusChange(
                              student.id,
                              student.account_status === "A" ? "I" : "A"
                            )
                          }
                        >
                          {student.account_status === "A"
                            ? "Deactivate"
                            : "Activate"}
                        </DropdownItem>
                      </>
                    }
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      );
    },
    [handleStatusChange, onUpdateStudent]
  );

  return (
    <div className="space-y-6">
      <Tabs defaultValue="active">
        <TabList>
          <TabTrigger value="active">Active Students</TabTrigger>
          <TabTrigger value="alumni">Alumni</TabTrigger>
          <TabTrigger value="special">Special Education</TabTrigger>
        </TabList>

        <div className="flex justify-between items-center my-4">
          <div className="flex items-center gap-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-80"
              />
            </div>

            {/* Filter Dropdowns */}
            <Dropdown
              trigger={
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Program
                </Button>
              }
              menu={
                <>
                  <DropdownItem
                    onClick={() =>
                      setFilters((f) => ({ ...f, program: "all" }))
                    }
                  >
                    All Programs
                  </DropdownItem>
                  {filterOptions.programs.map((program) => (
                    <DropdownItem
                      key={program}
                      onClick={() => setFilters((f) => ({ ...f, program }))}
                    >
                      {program}
                    </DropdownItem>
                  ))}
                </>
              }
            />

            <Dropdown
              trigger={
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Grade Level
                </Button>
              }
              menu={
                <>
                  <DropdownItem
                    onClick={() => setFilters((f) => ({ ...f, grade: "all" }))}
                  >
                    All Grades
                  </DropdownItem>
                  {filterOptions.grades.map((grade) => (
                    <DropdownItem
                      key={grade}
                      onClick={() => setFilters((f) => ({ ...f, grade }))}
                    >
                      {grade}
                    </DropdownItem>
                  ))}
                </>
              }
            />
          </div>

          {/* Add Student Button */}
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Student
          </Button>
        </div>

        <TabContent value="active">
          <Card>
            <CardHeader>
              <CardTitle>Active Students</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
                </div>
              ) : (
                renderStudentTable(filteredStudents)
              )}
            </CardContent>
          </Card>
        </TabContent>

        <TabContent value="alumni">
          <Card>
            <CardHeader>
              <CardTitle>Alumni Students</CardTitle>
            </CardHeader>
            <CardContent>
              {renderStudentTable(
                students?.filter((s) => s.account_status === "I")
              )}
            </CardContent>
          </Card>
        </TabContent>

        <TabContent value="special">
          <Card>
            <CardHeader>
              <CardTitle>Special Education Students</CardTitle>
            </CardHeader>
            <CardContent>
              {renderStudentTable(
                students?.filter(
                  (s) =>
                    s.program?.name === "Special Education" &&
                    s.account_status === "A"
                )
              )}
            </CardContent>
          </Card>
        </TabContent>
      </Tabs>
    </div>
  );
};

export default StudentsSection;
