// src/components/Portal/common/layouts/PortalNavBar/PortalNavBar.js
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { usePortalAuth } from "../../../../../contexts/PortalAuthContext";
import logo from "../../../../../assets/images/about_img/schoollogo.png";
import UserMenu from "./UserMenu";
import {
  Home,
  Calendar,
  MessageSquare,
  Bell,
  Users,
  CreditCard,
  FileText,
  BookOpen,
  ClipboardList,
  Settings,
  LogOut,
  HelpCircle,
  User,
} from "lucide-react";

const PortalNavBar = () => {
  const { portalUser, isParent, isStudent, portalLogout } = usePortalAuth();
  const location = useLocation();

  // Common menu items for all users
  const commonMenuItems = [
    { path: "/", icon: Home, label: "Dashboard" },
    { path: "/calendar", icon: Calendar, label: "Calendar" },
    { path: "/messages", icon: MessageSquare, label: "Messages" },
    { path: "/notifications", icon: Bell, label: "Notifications" },
  ];

  // Parent-specific menu items
  const parentMenuItems = [
    { path: "/mychildren", icon: Users, label: "My Children" },
  ];

  // Student-specific menu items
  const studentMenuItems = [
    { path: "/grades", icon: BookOpen, label: "My Grades" },
    { path: "/assignments", icon: ClipboardList, label: "Assignments" },
  ];

  // Combine menu items based on user role
  const menuItems = [
    ...commonMenuItems,
    ...(isParent ? parentMenuItems : []),
    ...(isStudent ? studentMenuItems : []),
  ];

  return (
    <div className="bg-white border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center h-16 justify-between">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center">
              <img src={logo} alt="LGMS Logo" className="h-10 w-auto" />
              <span className="ml-2 font-semibold text-lg">LGMS</span>
            </Link>
          </div>

          {/* Main Navigation */}
          <nav className="flex-1 flex items-center justify-center space-x-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-colors flex items-center gap-1
                    ${
                      location.pathname === item.path
                        ? "bg-green-100 text-green-700"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* User Menu - Fixed visibility */}
          <div className="relative group ml-4">
            <UserMenu portalUser={portalUser} portalLogout={portalLogout} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortalNavBar;
