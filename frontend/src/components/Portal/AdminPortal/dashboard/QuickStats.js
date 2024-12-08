// components/Portal/AdminPortal/components/QuickStats.jsx
import React from "react";
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
} from "../../../ui/card";
export const QuickStats = ({ stats }) => {
  const statItems = [
    {
      label: "Total Students",
      value: stats.totalStudents,
      icon: Users,
      trend: stats.studentsTrend,
    },
    {
      label: "Pending Applications",
      value: stats.pendingApplications,
      icon: UserPlus,
      trend: stats.applicationsTrend,
    },
    {
      label: "Active Enrollments",
      value: stats.activeEnrollments,
      icon: GraduationCap,
      trend: stats.enrollmentsTrend,
    },
    {
      label: "Pending Grades",
      value: stats.pendingGrades,
      icon: Book,
      trend: stats.gradesTrend,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {statItems.map((item) => (
        <Card key={item.label}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              {item.label}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">{item.value}</p>
                {item.trend && (
                  <p
                    className={`text-sm ${
                      item.trend > 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {item.trend > 0 ? "+" : ""}
                    {item.trend}% from last month
                  </p>
                )}
              </div>
              <item.icon className="w-8 h-8 text-gray-400" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
