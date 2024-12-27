// src/components/Portal/AdminPortal/sections/EnrollmentModal.js
import React, { useState } from "react";
import { Button } from "../../../ui/button";
import { Input } from "../../../ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../../../ui/card";

export const EnrollmentModal = ({
  isOpen,
  onClose,
  onSubmit,
  approvedApplicants = [],
  academicYear,
  semester,
}) => {
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [enrollmentData, setEnrollmentData] = useState({
    grade_level: "",
    section: "",
    previous_school: "",
    previous_school_address: "",
    special_needs: "",
    allergies: "",
    medications: "",
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      applicant_id: selectedApplicant.id,
      academic_year: academicYear,
      academic_period: semester === "1" ? "1st Semester" : "2nd Semester",
      ...enrollmentData,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Process New Enrollment</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Applicant Selection */}
            <div className="space-y-2">
              <label className="block text-sm font-medium">
                Select Approved Applicant
              </label>
              <select
                className="w-full border rounded-md p-2"
                value={selectedApplicant?.id || ""}
                onChange={(e) => {
                  const applicant = approvedApplicants.find(
                    (app) => app.id === parseInt(e.target.value)
                  );
                  setSelectedApplicant(applicant);
                }}
                required
              >
                <option value="">Select an applicant</option>
                {approvedApplicants.map((app) => (
                  <option key={app.id} value={app.id}>
                    {app.first_name} {app.last_name} - {app.program}
                  </option>
                ))}
              </select>
            </div>

            {/* Basic Enrollment Info */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium">Grade Level</label>
                <Input
                  type="text"
                  value={enrollmentData.grade_level}
                  onChange={(e) =>
                    setEnrollmentData((prev) => ({
                      ...prev,
                      grade_level: e.target.value,
                    }))
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium">Section</label>
                <Input
                  type="text"
                  value={enrollmentData.section}
                  onChange={(e) =>
                    setEnrollmentData((prev) => ({
                      ...prev,
                      section: e.target.value,
                    }))
                  }
                  required
                />
              </div>
            </div>

            {/* Previous School Info */}
            <div className="space-y-2">
              <label className="block text-sm font-medium">
                Previous School
              </label>
              <Input
                type="text"
                value={enrollmentData.previous_school}
                onChange={(e) =>
                  setEnrollmentData((prev) => ({
                    ...prev,
                    previous_school: e.target.value,
                  }))
                }
              />
            </div>

            {/* Medical Information */}
            <div className="space-y-2">
              <label className="block text-sm font-medium">
                Medical Information
              </label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-500">
                    Allergies
                  </label>
                  <Input
                    type="text"
                    value={enrollmentData.allergies}
                    onChange={(e) =>
                      setEnrollmentData((prev) => ({
                        ...prev,
                        allergies: e.target.value,
                      }))
                    }
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500">
                    Medications
                  </label>
                  <Input
                    type="text"
                    value={enrollmentData.medications}
                    onChange={(e) =>
                      setEnrollmentData((prev) => ({
                        ...prev,
                        medications: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>
            </div>

            {/* Special Needs */}
            <div className="space-y-2">
              <label className="block text-sm font-medium">
                Special Needs/Concerns
              </label>
              <textarea
                className="w-full border rounded-md p-2"
                value={enrollmentData.special_needs}
                onChange={(e) =>
                  setEnrollmentData((prev) => ({
                    ...prev,
                    special_needs: e.target.value,
                  }))
                }
                rows={3}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-2 mt-6">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">Complete Enrollment</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnrollmentModal;
