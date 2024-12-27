// src/components/Portal/common/sections/GradesSection.js

import React from "react";
import { Card, CardContent, CardTitle } from "../../../ui/card";

export const GradesSection = ({ grades }) => {
  // Using the existing table structure from StudentPortalView
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
          {grades?.map((grade, index) => {
            const subjectName =
              grade.subject?.name ||
              (typeof grade.subject === "string"
                ? grade.subject
                : "Unknown Subject");

            return (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="p-2 font-medium">{subjectName}</td>
                <td className="text-center p-2">{grade.written_work}</td>
                <td className="text-center p-2">{grade.performance_task}</td>
                <td className="text-center p-2">{grade.quarterly_exam}</td>
                <td className="text-center p-2">{grade.quarterly_grade}</td>
                <td className="text-center p-2">
                  {grade.final_grade?.toFixed(1) || "0.0"}
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
            );
          })}
        </tbody>
      </table>
    </div>
  );

  return (
    <Card>
      <CardContent className="p-6">
        <CardTitle className="mb-4">Academic Performance</CardTitle>
        {renderGradesTable()}
      </CardContent>
    </Card>
  );
};
