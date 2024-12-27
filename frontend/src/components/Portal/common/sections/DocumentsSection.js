import React from "react";
import { FaFileAlt, FaDownload, FaEye } from "react-icons/fa";
import { ReadOnlySection } from "./ReadOnlySection";

export const DocumentsSection = ({ studentInfo }) => {
  return (
    <ReadOnlySection title="Documents" icon={FaFileAlt}>
      {/* Document categories and items */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(studentInfo.documents).map(([category, documents]) => (
          <div key={category} className="space-y-4">
            <h3 className="font-semibold capitalize">
              {category.replace(/([A-Z])/g, " $1")}
            </h3>
            {documents.map((doc, index) => (
              <div
                key={index}
                className="p-4 border rounded-lg hover:bg-gray-50"
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium">{doc.title}</h4>
                  <div className="flex gap-2">
                    <button
                      onClick={() => window.open(doc.url)}
                      className="text-blue-600 hover:text-blue-800"
                      title="View"
                    >
                      <FaEye />
                    </button>
                    <button
                      onClick={() => window.open(doc.url)}
                      className="text-green-600 hover:text-green-800"
                      title="Download"
                    >
                      <FaDownload />
                    </button>
                  </div>
                </div>
                <p className="text-sm text-gray-500">
                  {new Date(doc.date).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </ReadOnlySection>
  );
};
