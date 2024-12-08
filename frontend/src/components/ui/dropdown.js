// src/components/ui/dropdown.js
import React, { useState, useRef, useEffect } from "react";

export const Dropdown = ({ trigger, menu }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      {/* Trigger */}
      <div onClick={() => setIsOpen(!isOpen)}>{trigger}</div>
      {/* Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
          <div className="py-1">{menu}</div>
        </div>
      )}
    </div>
  );
};

export const DropdownItem = ({ children, onClick }) => {
  return (
    <div
      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
      onClick={onClick}
    >
      {children}
    </div>
  );
};

// Fixed syntax error - was missing export keyword and const
export const DropdownMenuTrigger = ({ children }) => {
  return <div>{children}</div>;
};

// Added missing exports for compatibility with AdminHeader
export const DropdownMenu = Dropdown;
export const DropdownMenuContent = ({ children }) => (
  <div className="py-1">{children}</div>
);
export const DropdownMenuItem = DropdownItem;
