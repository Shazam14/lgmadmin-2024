import React, { useState } from "react";
import {
  FaUser,
  FaHeartbeat,
  FaGraduationCap,
  FaCalendar,
  FaFileAlt,
  FaEdit,
  FaSave,
  FaTimes,
  FaBrain,
  FaMale,
  FaFemale,
  FaHome,
} from "react-icons/fa";

const FamilyPortalDemo = () => {
  const [activeTab, setActiveTab] = useState("details");
  const [isEditing, setIsEditing] = useState(false);
  const [studentInfo, setStudentInfo] = useState({
    personal: {
      firstName: "John",
      middleName: "Robert",
      lastName: "Smith",
      birthday: "2015-05-15",
      gender: "Male",
      bloodType: "O+",
      nationality: "Filipino",
    },
    characteristics: {
      height: "4'2\"",
      weight: "35kg",
      eyeColor: "Brown",
      hairColor: "Black",
      distinguishingMarks: "None",
      temperament: "Friendly and outgoing",
      interests: "Reading, drawing, sports",
      strengths: "Quick learner",
      challenges: "Gets distracted easily",
    },
    academic: {
      grade: "Grade 4",
      program: "Elementary",
      section: "Einstein",
      studentId: "2024-0001",
      attendance: "95%",
    },
    medical: {
      bloodType: "O+",
      allergies: "None",
      currentMedications: "None",
      medicalConditions: "None",
      emergencyContact: "Mary Smith - 09171234567",
      lastCheckupDate: "2024-01-15",
      doctorName: "Dr. Santos",
      doctorContact: "09171234567",
    },
    father: {
      firstName: "Robert",
      middleName: "James",
      lastName: "Smith",
      occupation: "Engineer",
      employer: "Tech Corp",
      workAddress: "123 Business District, Makati City",
      phoneNumber: "09181234567",
      email: "robert.smith@email.com",
    },
    mother: {
      firstName: "Mary",
      middleName: "Anne",
      lastName: "Smith",
      occupation: "Teacher",
      employer: "Public School",
      workAddress: "456 Education Ave, Quezon City",
      phoneNumber: "09191234567",
      email: "mary.smith@email.com",
    },
    living: {
      currentArrangement: "With Both Parents",
      address: "123 Main Street",
      city: "Paranaque City",
      postalCode: "1700",
      transportationMethod: "School Bus",
      busRoute: "Route A",
      pickupTime: "06:30",
      dropoffTime: "15:30",
      guardianName: "",
      guardianRelationship: "",
      guardianContact: "",
      specialInstructions: "None",
    },
    grades: [
      {
        subject: "Mathematics",
        q1: "92",
        q2: "94",
        q3: "90",
        q4: "",
        final: "",
      },
      { subject: "Science", q1: "88", q2: "89", q3: "91", q4: "", final: "" },
      { subject: "English", q1: "90", q2: "92", q3: "89", q4: "", final: "" },
    ],
  });

  const handleEdit = () => setIsEditing(true);
  const handleSave = () => {
    // Here you would make an API call to save the changes
    setIsEditing(false);
  };
  const handleCancel = () => setIsEditing(false);

  const handleInputChange = (section, field, value) => {
    setStudentInfo((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const renderStudentHeader = () => (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
            <FaUser className="text-green-600 text-2xl" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">
              {`${studentInfo.personal.firstName} ${studentInfo.personal.lastName}`}
            </h1>
            <p className="text-gray-600">
              {studentInfo.academic.grade} - {studentInfo.academic.section}
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Student ID</p>
          <strong className="text-lg">{studentInfo.academic.studentId}</strong>
        </div>
      </div>
    </div>
  );

  const renderEditableSection = (title, section, data) => (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">{title}</h2>
        {!isEditing ? (
          <button
            onClick={handleEdit}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
          >
            <FaEdit /> Edit
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              <FaSave /> Save
            </button>
            <button
              onClick={handleCancel}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
            >
              <FaTimes /> Cancel
            </button>
          </div>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(data).map(([field, value]) => (
          <div key={field} className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 capitalize">
              {field.replace(/([A-Z])/g, " $1").trim()}
            </label>
            <input
              type={
                field.includes("date") || field === "birthday" ? "date" : "text"
              }
              value={value}
              onChange={(e) =>
                handleInputChange(section, field, e.target.value)
              }
              disabled={!isEditing}
              className={`w-full px-3 py-2 border rounded-md ${
                !isEditing
                  ? "bg-gray-50 text-gray-500"
                  : "border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500"
              }`}
            />
          </div>
        ))}
      </div>
    </div>
  );

  const renderGradesTable = () => (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-6">Grade Report</h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-3 text-left font-semibold">Subject</th>
              <th className="px-4 py-3 text-center font-semibold">Q1</th>
              <th className="px-4 py-3 text-center font-semibold">Q2</th>
              <th className="px-4 py-3 text-center font-semibold">Q3</th>
              <th className="px-4 py-3 text-center font-semibold">Q4</th>
              <th className="px-4 py-3 text-center font-semibold">Final</th>
            </tr>
          </thead>
          <tbody>
            {studentInfo.grades.map((grade, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3 font-medium">{grade.subject}</td>
                <td className="px-4 py-3 text-center">{grade.q1}</td>
                <td className="px-4 py-3 text-center">{grade.q2}</td>
                <td className="px-4 py-3 text-center">{grade.q3}</td>
                <td className="px-4 py-3 text-center">{grade.q4}</td>
                <td className="px-4 py-3 text-center">{grade.final}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {renderStudentHeader()}

      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setActiveTab("personal")}
          className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
            activeTab === "personal"
              ? "bg-green-600 text-white"
              : "bg-gray-100 hover:bg-gray-200"
          }`}
        >
          <FaUser /> Personal Info
        </button>
        <button
          onClick={() => setActiveTab("medical")}
          className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
            activeTab === "medical"
              ? "bg-green-600 text-white"
              : "bg-gray-100 hover:bg-gray-200"
          }`}
        >
          <FaHeartbeat /> Medical History
        </button>
        <button
          onClick={() => setActiveTab("father")}
          className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
            activeTab === "father"
              ? "bg-green-600 text-white"
              : "bg-gray-100 hover:bg-gray-200"
          }`}
        >
          <FaMale /> Father's Info
        </button>
        <button
          onClick={() => setActiveTab("mother")}
          className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
            activeTab === "mother"
              ? "bg-green-600 text-white"
              : "bg-gray-100 hover:bg-gray-200"
          }`}
        >
          <FaFemale /> Mother's Info
        </button>
        <button
          onClick={() => setActiveTab("living")}
          className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
            activeTab === "living"
              ? "bg-green-600 text-white"
              : "bg-gray-100 hover:bg-gray-200"
          }`}
        >
          <FaHome /> Living Arrangements
        </button>
      </div>

      <div>
        {activeTab === "personal" &&
          renderEditableSection(
            "Personal Information",
            "personal",
            studentInfo.personal
          )}
        {activeTab === "medical" &&
          renderEditableSection(
            "Medical History",
            "medical",
            studentInfo.medical
          )}
        {activeTab === "father" &&
          renderEditableSection(
            "Father's Information",
            "father",
            studentInfo.father
          )}
        {activeTab === "mother" &&
          renderEditableSection(
            "Mother's Information",
            "mother",
            studentInfo.mother
          )}
        {activeTab === "living" && (
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Living Arrangements</h2>
              {!isEditing ? (
                <button
                  onClick={handleEdit}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                >
                  <FaEdit /> Edit
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                  >
                    <FaSave /> Save
                  </button>
                  <button
                    onClick={handleCancel}
                    className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                  >
                    <FaTimes /> Cancel
                  </button>
                </div>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Current Arrangement
                </label>
                <select
                  value={studentInfo.living.currentArrangement}
                  onChange={(e) =>
                    handleInputChange(
                      "living",
                      "currentArrangement",
                      e.target.value
                    )
                  }
                  disabled={!isEditing}
                  className={`w-full px-3 py-2 border rounded-md ${
                    !isEditing
                      ? "bg-gray-50 text-gray-500"
                      : "border-gray-300 focus:ring-2 focus:ring-green-500"
                  }`}
                >
                  <option value="With Both Parents">With Both Parents</option>
                  <option value="With Father">With Father</option>
                  <option value="With Mother">With Mother</option>
                  <option value="With Guardian">With Guardian</option>
                </select>
              </div>

              {/* Regular inputs for other living arrangement fields */}
              {Object.entries(studentInfo.living)
                .filter(([key]) => key !== "currentArrangement")
                .map(([field, value]) => (
                  <div key={field} className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 capitalize">
                      {field.replace(/([A-Z])/g, " $1").trim()}
                    </label>
                    {field.includes("Time") ? (
                      <input
                        type="time"
                        value={value}
                        onChange={(e) =>
                          handleInputChange("living", field, e.target.value)
                        }
                        disabled={!isEditing}
                        className={`w-full px-3 py-2 border rounded-md ${
                          !isEditing
                            ? "bg-gray-50 text-gray-500"
                            : "border-gray-300 focus:ring-2 focus:ring-green-500"
                        }`}
                      />
                    ) : field === "specialInstructions" ? (
                      <textarea
                        value={value}
                        onChange={(e) =>
                          handleInputChange("living", field, e.target.value)
                        }
                        disabled={!isEditing}
                        rows={3}
                        className={`w-full px-3 py-2 border rounded-md ${
                          !isEditing
                            ? "bg-gray-50 text-gray-500"
                            : "border-gray-300 focus:ring-2 focus:ring-green-500"
                        }`}
                      />
                    ) : (
                      <input
                        type="text"
                        value={value}
                        onChange={(e) =>
                          handleInputChange("living", field, e.target.value)
                        }
                        disabled={!isEditing}
                        className={`w-full px-3 py-2 border rounded-md ${
                          !isEditing
                            ? "bg-gray-50 text-gray-500"
                            : "border-gray-300 focus:ring-2 focus:ring-green-500"
                        }`}
                      />
                    )}
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FamilyPortalDemo;
