import React, { useState } from "react";
import { Link } from "react-router-dom";
import { User, Settings, HelpCircle, LogOut } from "lucide-react";
import logo from "../../../../../assets/images/about_img/schoollogo.png";

const UserMenu = ({ portalUser, portalLogout }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative" onMouseLeave={() => setIsOpen(false)}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsOpen(true)}
        className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100"
      >
        <img src={logo} alt="Profile" className="h-8 w-8 rounded-full" />
        <span className="text-sm font-medium text-gray-700">
          {portalUser?.name || "User"}
        </span>
        <span className="text-gray-400">▼</span>
      </button>

      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200"
          style={{ zIndex: 1000 }}
        >
          <div className="py-1">
            <Link
              to="/profile"
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <User className="w-4 h-4 mr-2" />
              Profile Settings
            </Link>
            <Link
              to="/settings"
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Link>
            <Link
              to="/help"
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <HelpCircle className="w-4 h-4 mr-2" />
              Need Help?
            </Link>
            <hr className="my-1" />
            <button
              onClick={portalLogout}
              className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
