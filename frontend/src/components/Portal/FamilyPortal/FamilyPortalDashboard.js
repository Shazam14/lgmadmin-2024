import React, { useState, useEffect } from "react";
import { Tabs, TabTriggers, TabTrigger, TabContent } from "../../ui/CustomTabs";
import {
  User,
  Heart,
  GraduationCap,
  Users,
  Home,
  FileText,
  UserCircle,
  BookOpen,
  Calendar,
  CreditCard,
  Activity,
  Files,
  Settings,
} from "lucide-react";
import apiClient from "../../../services/apiClient";

const FamilyPortalDashboard = () => {
  const [selectedChild, setSelectedChild] = useState(null);
  const [children, setChildren] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChildren = async () => {
      try {
        const response = await apiClient.get("portal/parent/children/");
        setChildren(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching children:", error);
        setLoading(false);
      }
    };
    fetchChildren();
  }, []);

  // Child selection card component
  const ChildrenList = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
      {children.map((child) => (
        <div
          key={child.id}
          className={`cursor-pointer rounded-lg border bg-card p-6 transition-all hover:shadow-md
            ${selectedChild?.id === child.id ? "ring-2 ring-green-500" : ""}
          `}
          onClick={() => setSelectedChild(child)}
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
              <UserCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">
                {child.firstName} {child.lastName}
              </h3>
              <p className="text-sm text-gray-500">
                {child.grade} - {child.section}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <p className="text-gray-500">Student ID</p>
              <p className="font-medium">{child.studentId}</p>
            </div>
            <div>
              <p className="text-gray-500">Program</p>
              <p className="font-medium">{child.program}</p>
            </div>
          </div>

          <div className="mt-4">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm text-gray-500">Attendance</span>
              <span className="text-sm font-medium">{child.attendance}%</span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-green-500 transition-all"
                style={{ width: `${child.attendance}%` }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const QuickStats = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {[
        {
          icon: <GraduationCap className="text-blue-600" />,
          label: "Total Children",
          value: children.length,
          bgColor: "bg-blue-100",
        },
        {
          icon: <FileText className="text-green-600" />,
          label: "Upcoming Events",
          value: 3,
          bgColor: "bg-green-100",
        },
        {
          icon: <Heart className="text-purple-600" />,
          label: "Notifications",
          value: 5,
          bgColor: "bg-purple-100",
        },
      ].map((stat, index) => (
        <div key={index} className="bg-white rounded-lg border p-6">
          <div className="flex items-center gap-4">
            <div className={`p-2 rounded-lg ${stat.bgColor}`}>{stat.icon}</div>
            <div>
              <p className="text-sm text-gray-500">{stat.label}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Family Portal</h1>
        <button className="text-sm text-gray-500 hover:text-green-600 transition-colors">
          Need help?
        </button>
      </div>

      <QuickStats />

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Your Children</h2>
        <ChildrenList />
      </div>

      {selectedChild ? (
        <Tabs defaultValue="overview">
          <TabTriggers>
            <TabTrigger value="overview">
              <User className="w-4 h-4 mr-2" />
              Overview
            </TabTrigger>
            <TabTrigger value="academic">
              <BookOpen className="w-4 h-4 mr-2" />
              Academic
            </TabTrigger>
            <TabTrigger value="attendance">
              <Calendar className="w-4 h-4 mr-2" />
              Attendance
            </TabTrigger>
            <TabTrigger value="finance">
              <CreditCard className="w-4 h-4 mr-2" />
              Finance
            </TabTrigger>
            <TabTrigger value="health">
              <Activity className="w-4 h-4 mr-2" />
              Health
            </TabTrigger>
            <TabTrigger value="documents">
              <Files className="w-4 h-4 mr-2" />
              Documents
            </TabTrigger>
            <TabTrigger value="settings">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </TabTrigger>
          </TabTriggers>

          <TabContent value="overview">
            {/* Your FamilyPortalEnhanced Overview content */}
          </TabContent>

          <TabContent value="academic">
            <div className="bg-white rounded-lg border p-6">
              <h3 className="text-xl font-semibold mb-4">
                Academic Performance
              </h3>
              {/* Academic content */}
            </div>
          </TabContent>

          {/* Add other TabContent components for remaining tabs */}
        </Tabs>
      ) : (
        <div className="bg-white rounded-lg border p-6 text-center text-gray-500">
          <Users className="w-12 h-12 mx-auto mb-4" />
          <p>Select a child to view their details</p>
        </div>
      )}
    </div>
  );
};

export default FamilyPortalDashboard;
