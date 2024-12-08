import React, { useState } from "react";
import { useStudentData } from "../../../hooks/useStudentData";
import {
  User,
  BookOpen,
  Calendar,
  Clock,
  Award,
  FileText,
  CreditCard,
  Activity,
  AlertCircle,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Alert, AlertDescription } from "../../ui/alert";
import { Button } from "../../ui/button";
import { LoadingSpinner } from "../common/LoadingSpinner";
import { GradesSection } from "../common/sections/GradesSection";
import PortalNavBar from "../common/layouts/PortalNavBar/PortalNavBar";
import { TuitionSection } from "../common/sections/TuitionSection";

const StudentPortalView = () => {
  const { studentInfo, loading, error, stats } = useStudentData();
  const [activeTab, setActiveTab] = useState("overview");

  console.log("studentInfo:", studentInfo);

  const tabs = [
    { id: "overview", label: "Overview", icon: Activity },
    { id: "academics", label: "Academics", icon: BookOpen },
    { id: "schedule", label: "Schedule", icon: Calendar },
    { id: "attendance", label: "Attendance", icon: Clock },
    { id: "awards", label: "Awards", icon: Award },
    { id: "documents", label: "Documents", icon: FileText },
    { id: "tuition", label: "Tuition", icon: CreditCard },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto p-4">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  console.log("studentInfo - grades data:", studentInfo?.academic?.grades);

  const renderGradesTable = () => (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left p-2">Subject</th>
            <th className="text-center p-2">Written Work</th>
            <th className="text-center p-2">Performance Task</th>
            <th className="text-center p-2">Quarterly Exam</th>
            <th className="text-center p-2">Quarterly Grade</th>
            <th className="text-center p-2">Final Grade</th>
            <th className="text-center p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {studentInfo.academic.grades.map(
            (grade, index) => (
              console.log("Processing grade entry:", grade),
              (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="p-2">{grade.subject.name}</td>
                  <td className="text-center p-2">{grade.written_work}</td>
                  <td className="text-center p-2">{grade.performance_task}</td>
                  <td className="text-center p-2">{grade.quarterly_exam}</td>
                  <td className="text-center p-2">{grade.quarterly_grade}</td>
                  <td className="text-center p-2">
                    {grade.final_grade || "0.0"}
                  </td>
                  <td className="text-center p-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        grade.remedial_passed
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {grade.evaluation_code || "P"}
                    </span>
                  </td>
                </tr>
              )
            )
          )}
        </tbody>
      </table>
    </div>
  );

  const renderProgram = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <h3 className="font-semibold mb-2">Current Program</h3>
        <div className="space-y-2">
          <p className="text-gray-700">
            {studentInfo.academic.program?.name || "Not assigned"}
          </p>
          <p className="text-sm text-gray-500">
            {studentInfo.academic.program?.description}
          </p>
        </div>
      </div>
      <div>
        <h3 className="font-semibold mb-2">Enrollment Details</h3>
        <div className="space-y-2">
          <p className="text-sm">
            <span className="text-gray-500">Academic Year:</span>{" "}
            <span className="font-medium">
              {studentInfo.enrollment.academic_year}
            </span>
          </p>
          <p className="text-sm">
            <span className="text-gray-500">Period:</span>{" "}
            <span className="font-medium">
              {studentInfo.enrollment.academic_period}
            </span>
          </p>
          <p className="text-sm">
            <span className="text-gray-500">Status:</span>{" "}
            <span className="font-medium">
              {studentInfo.enrollment.enrollment_status}
            </span>
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <PortalNavBar />

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Student Header */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                <User className="w-8 h-8 text-green-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">
                  {`${studentInfo.personal.first_name} ${studentInfo.personal.last_name}`}
                </h1>
                <p className="text-gray-600">
                  {`${studentInfo.personal.grade} - ${studentInfo.personal.section}`}
                </p>
                <p className="text-sm text-gray-500">
                  Student ID: {studentInfo.personal.student_id}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {Object.entries(stats).map(([key, stat]) => (
            <Card key={key}>
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-500">{stat.label}</p>
                    <p className="text-xl font-bold">{stat.value}</p>
                  </div>
                  {key === "attendance" && (
                    <Clock className="w-6 h-6 text-gray-500" />
                  )}
                  {key === "academicStatus" && (
                    <BookOpen className="w-6 h-6 text-gray-500" />
                  )}
                  {key === "enrollmentStatus" && (
                    <Activity className="w-6 h-6 text-gray-500" />
                  )}
                  {key === "tuitionStatus" && (
                    <CreditCard className="w-6 h-6 text-gray-500" />
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? "default" : "outline"}
              onClick={() => setActiveTab(tab.id)}
              className="flex items-center gap-2"
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </Button>
          ))}
        </div>

        {/* Content Section */}
        <Card>
          <CardContent className="p-6">
            {activeTab === "overview" && (
              <div className="space-y-6">
                <CardTitle className="mb-4">Academic Overview</CardTitle>
                {renderProgram()}
                <div>
                  <h3 className="font-semibold mb-4">Academic Status</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="rounded-lg bg-gray-50 p-4">
                      <p className="text-sm text-gray-500 mb-1">
                        Promotion Status
                      </p>
                      <p className="font-medium">
                        {studentInfo.academic.promoted
                          ? "Promoted"
                          : "In Progress"}
                      </p>
                    </div>
                    <div className="rounded-lg bg-gray-50 p-4">
                      <p className="text-sm text-gray-500 mb-1">Attendance</p>
                      <p className="font-medium">
                        {studentInfo.academic.attendance_percentage}%
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "academics" && (
              <GradesSection grades={studentInfo?.academic?.grades} />
            )}

            {activeTab === "schedule" && (
              <div>
                <CardTitle className="mb-4">Class Schedule</CardTitle>
                {/* Implement schedule view */}
              </div>
            )}

            {activeTab === "attendance" && (
              <div>
                <CardTitle className="mb-4">Attendance Record</CardTitle>
                {/* Update with actual attendance records when available */}
                <div className="text-center text-gray-500 py-8">
                  Attendance records will be displayed here
                </div>
              </div>
            )}

            {activeTab === "tuitions" && (
              <TuitionSection tuition={studentInfo.tuition} />
            )}

            {activeTab === "tuition" && (
              <div>
                <CardTitle className="mb-4">Tuition Information</CardTitle>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="rounded-lg bg-gray-50 p-4">
                      <p className="text-sm text-gray-500 mb-1">
                        Payment Status
                      </p>
                      <p className="font-medium">
                        {studentInfo.tuition.tuition_status === "FP"
                          ? "Fully Paid"
                          : "Unsettled"}
                      </p>
                    </div>
                    <div className="rounded-lg bg-gray-50 p-4">
                      <p className="text-sm text-gray-500 mb-1">
                        Account Status
                      </p>
                      <p className="font-medium">
                        {studentInfo.tuition.account_status === "A"
                          ? "Active"
                          : "Inactive"}
                      </p>
                    </div>
                  </div>
                  {studentInfo.tuition.tuition_notes && (
                    <div className="mt-4">
                      <h4 className="font-semibold mb-2">Notes</h4>
                      <p className="text-gray-700">
                        {studentInfo.tuition.tuition_notes}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentPortalView;
