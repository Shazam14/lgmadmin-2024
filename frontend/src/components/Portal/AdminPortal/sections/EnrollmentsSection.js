import React, { useState, useMemo } from "react";
import { Dropdown, DropdownItem } from "../../../ui/dropdown";
import { LoadingSpinner } from "../../common/LoadingSpinner";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableHeaderCell,
} from "../../../ui/table";
import { Button } from "../../../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../../ui/card";
import { Input } from "../../../ui/input";
import { Select } from "../../../ui/select";
import { EnrollmentWizard } from "./EnrollmentWizard";
import BatchEnrollmentWizard from "./BatchEnrollmentWizard";
import { Info, UserPlus, Users, Filter, Search, X } from "lucide-react";

const ENROLLMENT_STATUS = {
  PENDING: { label: "Pending", classes: "bg-yellow-100 text-yellow-800" },
  APPROVED: { label: "Approved", classes: "bg-green-100 text-white" },
  ENROLLED: { label: "Enrolled", classes: "bg-green-100 text-green-800" },
  WITHDRAWN: { label: "Withdrawn", classes: "bg-red-100 text-red-800" },
  GRADUATED: { label: "Graduated", classes: "bg-blue-100 text-blue-800" },
  REJECTED: { label: "Rejected", classes: "bg-red-100 text-red-800" },
};

export const EnrollmentsSection = ({
  enrollments = [],
  programs = [],
  applicants = [],
  onEnroll,
  onUpdateStatus,
  loading,
}) => {
  // State Management
  const [showWizard, setShowWizard] = useState(false);
  const [showBatchEnroll, setShowBatchEnroll] = useState(false);
  const [filters, setFilters] = useState({
    academicYear: new Date().getFullYear().toString(),
    academicPeriod: "Q1",
    status: "all",
    program: "all",
    search: "",
  });

  // Derived State
  const academicYears = useMemo(() => {
    const years = [...new Set(enrollments.map((e) => e?.academic_year))]
      .filter(Boolean)
      .sort((a, b) => b - a);
    return years.length > 0 ? years : [new Date().getFullYear()];
  }, [enrollments]);

  const stats = useMemo(() => {
    const currentEnrollments = enrollments.filter(
      (e) => e.academic_year?.toString() === filters.academicYear
    );

    const enrolledApplicantIds = new Set(
      currentEnrollments
        .map((e) => e.student?.applicant_id || e.applicant_id || e.student_id)
        .filter(Boolean)
    );

    const eligibleApplicants = applicants.filter((app) => {
      const isApproved = app.status === "Approved" || app.status === "APPROVED";
      const notEnrolled = !enrolledApplicantIds.has(app.id);
      return isApproved && notEnrolled;
    });

    return {
      total: currentEnrollments.length,
      pending: currentEnrollments.filter(
        (e) => e.enrollment_status === "PENDING"
      ).length,
      approved: currentEnrollments.filter(
        (e) => e.enrollment_status === "APPROVED"
      ).length,
      rejected: currentEnrollments.filter(
        (e) => e.enrollment_status === "REJECTED"
      ).length,
      eligibleCount: eligibleApplicants.length,
      eligible: eligibleApplicants,
    };
  }, [enrollments, applicants, filters.academicYear]);

  // Handlers
  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      academicYear: new Date().getFullYear().toString(),
      academicPeriod: "Q1",
      status: "all",
      program: "all",
      search: "",
    });
  };

  const handleEnrollment = async (enrollmentData) => {
    try {
      await onEnroll({
        ...enrollmentData,
        academicPeriod: filters.academicPeriod,
        academic_year: filters.academicYear,
      });
      setShowWizard(false);
    } catch (error) {
      console.error("Enrollment failed:", error);
    }
  };

  const handleBatchEnroll = async (selectedIds, settings) => {
    try {
      await onEnroll(selectedIds, {
        ...settings,
        academicPeriod: filters.academicPeriod,
        academic_year: filters.academicYear,
      });
      setShowBatchEnroll(false);
    } catch (error) {
      console.error("Batch enrollment failed:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-gray-500">
              Total Enrollments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-gray-500">
              Pending Review
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {stats.pending}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-gray-500">
              Eligible Applicants
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {stats.eligibleCount}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-gray-500">
              Success Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {stats.total
                ? ((stats.approved / stats.total) * 100).toFixed(1)
                : 0}
              %
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Eligible Applicants Alert */}
      {stats.eligibleCount > 0 && (
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
          <div className="flex">
            <Info className="h-5 w-5 text-blue-400" />
            <div className="ml-3">
              <p className="text-sm text-blue-700">
                {stats.eligibleCount} applicant
                {stats.eligibleCount === 1 ? " is" : "s are"} ready for
                enrollment.
                {stats.eligibleCount > 1 &&
                  " Consider using batch enrollment to process multiple students at once."}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Filters and Actions */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex-1 min-w-[200px]">
          <div className="flex gap-2">
            <Select
              value={filters.academicYear}
              onChange={(e) =>
                handleFilterChange("academicYear", e.target.value)
              }
              className="w-32"
            >
              {academicYears.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </Select>

            <Select
              value={filters.academicPeriod}
              onChange={(e) =>
                handleFilterChange("academicPeriod", e.target.value)
              }
              className="w-40"
            >
              {[
                { value: "Q1", label: "1st Quarter" },
                { value: "Q2", label: "2nd Quarter" },
                { value: "Q3", label: "3rd Quarter" },
                { value: "Q4", label: "4th Quarter" },
                { value: "S1", label: "1st Semester" },
                { value: "S2", label: "2nd Semester" },
              ].map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </Select>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search enrollments..."
              value={filters.search}
              onChange={(e) => handleFilterChange("search", e.target.value)}
              className="pl-10"
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          </div>

          {Object.values(filters).some((v) => v !== "all" && v !== "") && (
            <Button
              variant="outline"
              size="sm"
              onClick={clearFilters}
              className="text-gray-500"
            >
              <X className="w-4 h-4 mr-1" />
              Clear
            </Button>
          )}
        </div>

        <div className="flex gap-2 ml-auto">
          <Button
            onClick={() => setShowWizard(true)}
            className="bg-green-500 hover:bg-green-600 text-white flex items-center gap-2"
            disabled={stats.eligibleCount === 0}
          >
            <UserPlus className="w-4 h-4" />
            New Enrollment
          </Button>

          {stats.eligibleCount > 1 && (
            <Button
              onClick={() => setShowBatchEnroll(true)}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Users className="w-4 h-4" />
              Batch Enroll ({stats.eligibleCount})
            </Button>
          )}
        </div>
      </div>

      {/* Enrollments Table */}
      <Card>
        <div className="overflow-x-auto">
          <Table>
            <TableHead>
              <TableRow>
                <TableHeaderCell>Student ID</TableHeaderCell>
                <TableHeaderCell>Name</TableHeaderCell>
                <TableHeaderCell>Program</TableHeaderCell>
                <TableHeaderCell>Grade Level</TableHeaderCell>
                <TableHeaderCell>Status</TableHeaderCell>
                <TableHeaderCell>Enrollment Date</TableHeaderCell>
                <TableHeaderCell>Actions</TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {enrollments
                .filter((e) => {
                  const matchesYear =
                    e.academic_year?.toString() === filters.academicYear;
                  const matchesSearch = filters.search
                    ? e.student_name
                        ?.toLowerCase()
                        .includes(filters.search.toLowerCase())
                    : true;
                  return matchesYear && matchesSearch;
                })
                .map((enrollment) => (
                  <TableRow key={enrollment.id}>
                    <TableCell>{enrollment.student_id}</TableCell>
                    <TableCell>{enrollment.student_name}</TableCell>
                    <TableCell>{enrollment.program}</TableCell>
                    <TableCell>{enrollment.grade_level}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          ENROLLMENT_STATUS[enrollment.enrollment_status]
                            ?.classes
                        }`}
                      >
                        {ENROLLMENT_STATUS[enrollment.enrollment_status]?.label}
                      </span>
                    </TableCell>
                    <TableCell>
                      {new Date(
                        enrollment.enrollment_date
                      ).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Dropdown
                        trigger={
                          <button className="p-1 hover:bg-gray-100 rounded">
                            ⋮
                          </button>
                        }
                        menu={
                          enrollment.enrollment_status === "PENDING" ? (
                            <>
                              <DropdownItem
                                onClick={() =>
                                  onUpdateStatus(enrollment.id, "ENROLLED")
                                }
                                disabled={loading}
                              >
                                Approve Enrollment
                              </DropdownItem>
                              <DropdownItem
                                onClick={() =>
                                  onUpdateStatus(enrollment.id, "REJECTED")
                                }
                                disabled={loading}
                                className="text-red-600"
                              >
                                Reject Enrollment
                              </DropdownItem>
                            </>
                          ) : null
                        }
                      />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>

          {enrollments.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No enrollments found for this academic year.
            </div>
          )}
        </div>
      </Card>

      {/* Wizards */}
      {showWizard && (
        <EnrollmentWizard
          isOpen={showWizard}
          onClose={() => setShowWizard(false)}
          onSubmit={handleEnrollment}
          programs={programs}
          eligibleApplicants={stats.eligible}
          academicYear={filters.academicYear}
        />
      )}

      {showBatchEnroll && (
        <BatchEnrollmentWizard
          isOpen={showBatchEnroll}
          onClose={() => setShowBatchEnroll(false)}
          eligibleApplicants={stats.eligible}
          programs={programs}
          academicYear={filters.academicYear}
          onEnroll={handleBatchEnroll}
        />
      )}
    </div>
  );
};

export default EnrollmentsSection;
