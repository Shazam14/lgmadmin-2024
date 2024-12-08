// src/components/Portal/AdminPortal/AdminPortalView.js
import React, { useState, useEffect } from "react";
import { useAdminData } from "../../../hooks/useAdminData";
import { useNavigate } from "react-router-dom";
import { usePortalAccess } from "../../../hooks/usePortalAccess";

import {
  Users,
  UserPlus,
  GraduationCap,
  Calendar,
  FileText,
  Settings,
  CreditCard,
  Book,
  AlertCircle,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../../../components/ui/card";
import { Alert, AlertDescription } from "../../../components/ui/alert";

import { Tabs, TabList, TabTrigger, TabContent } from "../../ui/CustomTabs";
import { Button } from "../../ui/button";
import { LoadingSpinner } from "../common/LoadingSpinner";
import { AdminHeader } from "../AdminPortal/components/AdminHeader";
import { QuickStats } from "./dashboard/QuickStats";
import { DataTable } from "./dashboard/DataTable";
import { FilterBar } from "./dashboard/FilterBar";

import { ApplicantsSection } from "./sections/ApplicantsSection";
import { EnrollmentsSection } from "./sections/EnrollmentsSection";
import { StudentsSection } from "./sections/StudentsSection";
import { AdminGradesSection } from "./sections/AdminGradesSection";
import { ProgramsSection } from "./sections/ProgramsSection";

const AdminPortalView = () => {
  const navigate = useNavigate();
  const { hasAccess, isLoading: accessLoading } = usePortalAccess();
  const {
    stats,
    applicants,
    enrollments,
    students,
    loading,
    error,
    filters,
    setFilters,
    handleApproveApplicant,
    handleEnrollStudent,
    handleUpdateGrades,
    refreshData,
  } = useAdminData();

  const [activeTab, setActiveTab] = useState("dashboard");
  const [selectedItems, setSelectedItems] = useState([]);
  const [actionInProgress, setActionInProgress] = useState(false);

  const navigationItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: Users,
      badge: stats?.pendingTasks || 0,
    },
    {
      id: "applicants",
      label: "Applicants",
      icon: UserPlus,
      badge: stats?.pendingApplications || 0,
    },
    {
      id: "enrollments",
      label: "Enrollments",
      icon: GraduationCap,
      badge: stats?.pendingEnrollments || 0,
    },
    {
      id: "students",
      label: "Students",
      icon: Users,
    },
    {
      id: "grades",
      label: "Grades",
      icon: Book,
      badge: stats?.pendingGrades || 0,
    },
    {
      id: "programs",
      label: "Programs",
      icon: Calendar,
    },
  ];
  const handleBulkAction = async (action) => {
    if (!selectedItems.length) return;

    setActionInProgress(true);
    try {
      switch (action) {
        case "approve":
          await Promise.all(
            selectedItems.map((id) => handleApproveApplicant(id))
          );
          break;
        case "enroll":
          await Promise.all(selectedItems.map((id) => handleEnrollStudent(id)));
          break;
        // Add more bulk actions as needed
      }
      setSelectedItems([]);
      refreshData();
    } catch (error) {
      console.error("Bulk action failed:", error);
    } finally {
      setActionInProgress(false);
    }
  };

  // Loading State
  if (loading || accessLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  // Error State
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

  // Dashboard Content
  const renderDashboard = () => (
    <div className="space-y-6">
      <QuickStats stats={stats} />

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest actions and updates</CardDescription>
        </CardHeader>
        <CardContent>{/* Add activity list component */}</CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-4">
          <Button onClick={() => navigate("/admin/applicants")}>
            Review Applications ({stats.pendingApplications})
          </Button>
          <Button onClick={() => navigate("/admin/grades")}>
            Update Grades ({stats.pendingGrades})
          </Button>
          <Button onClick={() => navigate("/admin/enrollments")}>
            Process Enrollments ({stats.pendingEnrollments})
          </Button>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader
        title={navigationItems.find((item) => item.id === activeTab)?.label}
        actions={
          selectedItems.length > 0 && (
            <div className="flex gap-2">
              <Button
                onClick={() => handleBulkAction("approve")}
                disabled={actionInProgress}
              >
                Approve Selected
              </Button>
              <Button variant="outline" onClick={() => setSelectedItems([])}>
                Clear Selection
              </Button>
            </div>
          )
        }
      />

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Navigation */}
        <div className="flex gap-2 mb-6">
          {navigationItems.map((item) => (
            <Button
              key={item.id}
              variant={activeTab === item.id ? "default" : "outline"}
              onClick={() => setActiveTab(item.id)}
              className="flex items-center gap-2"
            >
              <item.icon className="w-4 h-4" />
              <span>{item.label}</span>
              {item.badge > 0 && (
                <span className="ml-2 px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">
                  {item.badge}
                </span>
              )}
            </Button>
          ))}
        </div>

        {/* Filters */}
        <FilterBar
          filters={filters}
          onFilterChange={setFilters}
          activeTab={activeTab}
        />

        {/* Content */}
        <div className="mt-6">
          {activeTab === "dashboard" && renderDashboard()}

          {activeTab === "applicants" && (
            <ApplicantsSection
              applicants={applicants}
              selected={selectedItems}
              onSelect={setSelectedItems}
              onApprove={handleApproveApplicant}
              loading={actionInProgress}
            />
          )}

          {activeTab === "enrollments" && (
            <EnrollmentsSection
              enrollments={enrollments}
              selected={selectedItems}
              onSelect={setSelectedItems}
              onEnroll={handleEnrollStudent}
              loading={actionInProgress}
            />
          )}

          {activeTab === "students" && (
            <StudentsSection
              students={students}
              onUpdateStudent={refreshData}
            />
          )}

          {activeTab === "grades" && (
            <AdminGradesSection
              students={students}
              onUpdateGrades={handleUpdateGrades}
              refreshData={refreshData}
            />
          )}

          {activeTab === "programs" && <ProgramsSection />}
        </div>
      </div>
    </div>
  );
};

export default AdminPortalView;
