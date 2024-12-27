import React, { useEffect, useState } from "react";

import { Document, Page, pdfjs } from "react-pdf";

import {
  User,
  Heart,
  GraduationCap,
  Users,
  FileText,
  UserCircle,
  BookOpen,
  Calendar,
  CreditCard,
  Activity,
  Files,
  Settings,
  Brain,
  Home,
} from "lucide-react";

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
  FaPlus,
  FaTags,
  FaDownload,
  FaCreditCard,
  FaBook,
  FaFilePdf,
  FaEye,
} from "react-icons/fa";

import { Tabs, TabTriggers } from "../../ui/CustomTabs";

import apiClient from "../../../services/apiClient";
const TRAITS_OPTIONS = [
  "Adaptable",
  "Creative",
  "Analytical",
  "Collaborative",
  "Detail-oriented",
  "Empathetic",
  "Focused",
  "Independent",
  "Leader",
  "Organized",
  "Patient",
  "Resilient",
  "Self-motivated",
  "Team player",
  "Innovative",
];

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const FamilyPortalEnhanced = () => {
  //dashboard states
  const [selectedChild, setSelectedChild] = useState(null);
  const [children, setChildren] = useState([]);
  const [loading, setLoading] = useState(false);

  //enhanced portal states
  const [activeTab, setActiveTab] = useState("details");
  const [isEditing, setIsEditing] = useState(false);
  const [showFieldModal, setShowFieldModal] = useState(false);
  const [newField, setNewField] = useState({ name: "", type: "text" });
  const [pdfModal, setPdfModal] = useState({
    isOpen: false,
    url: "",
    title: "",
  });

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

  useEffect(() => {
    if (selectedChild) {
      const fetchChildDetails = async () => {
        try {
          const response = await apiClient.get(
            `/portal/student/${selectedChild}/details/`
          );
          setStudentInfo(response.data);
        } catch (error) {
          console.error("Error fetching child details:", error);
        }
      };
      fetchChildDetails();
    }
  }, [selectedChild]);

  //quick stats
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

  //children list
  const ChildrenList = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
      {children.map((child) => (
        <div
          key={child.id}
          className={`cursor-pointer rounded-lg border bg-white p-6 transition-all hover:shadow-md
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

  const SelectedChildView = () => {
    if (!selectedChild || !studentInfo) return null;

    return (
      <div>
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={() => setSelectedChild(null)}
              >
                ← Back
              </button>
              <div>
                <h1 className="text-2xl font-bold">
                  {selectedChild.firstName} {selectedChild.lastName}
                </h1>
                <p className="text-gray-600">
                  {selectedChild.grade} - {selectedChild.section}
                </p>
              </div>
            </div>
          </div>
        </div>

        <Tabs defaultValue="overview">
          <TabTriggers>{/* Import your existing tab triggers */}</TabTriggers>

          {/* Import your existing tab content */}
        </Tabs>
      </div>
    );
  };

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
      selectedTraits: ["Creative", "Empathetic", "Focused"], // New field for multi-select
      customFields: {}, // Store for dynamically added fields
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
    grades: {
      currentQuarter: "Q3",
      subjects: [
        {
          subject: "Mathematics",
          q1: 92,
          q2: 94,
          q3: 90,
          q4: null,
          final: null,
        },
        {
          subject: "Science",
          q1: 88,
          q2: 89,
          q3: 91,
          q4: null,
          final: null,
        },
        {
          subject: "English",
          q1: 90,
          q2: 92,
          q3: 89,
          q4: null,
          final: null,
        },
      ],
    },
    tuition: {
      currentBalance: 25000,
      totalFees: 120000,
      payments: [
        {
          date: "2024-01-15",
          amount: 30000,
          referenceNo: "PAY-123456",
          status: "Completed",
        },
        {
          date: "2023-12-15",
          amount: 30000,
          referenceNo: "PAY-123455",
          status: "Completed",
        },
      ],
      nextDueDate: "2024-03-15",
      nextDueAmount: 30000,
    },
    documents: {
      reportCards: [
        {
          title: "Q1 Report Card 2023-2024",
          url: "/path/to/q1-report.pdf",
          date: "2023-10-30",
        },
        {
          title: "Q2 Report Card 2023-2024",
          url: "/path/to/q2-report.pdf",
          date: "2023-12-20",
        },
      ],
      certificates: [
        {
          title: "Achievement Certificate",
          url: "/path/to/achievement.pdf",
          date: "2023-12-15",
        },
      ],
      medicalRecords: [
        {
          title: "Medical Clearance 2024",
          url: "/path/to/medical.pdf",
          date: "2024-01-10",
        },
      ],
    },
    // ... rest of your existing state
  });

  const PdfViewerModal = () => {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
        <div className="bg-white rounded-lg p-6 w-[90%] h-[90%] flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">{pdfModal.title}</h3>
            <button
              onClick={() => setPdfModal({ isOpen: false, url: "", title: "" })}
              className="text-gray-500 hover:text-gray-700"
            >
              <FaTimes />
            </button>
          </div>

          <div className="flex-1 overflow-auto">
            <Document
              file={pdfModal.url}
              onLoadSuccess={({ numPages }) => setNumPages(numPages)}
              className="flex flex-col items-center"
            >
              <Page
                pageNumber={pageNumber}
                className="mb-4"
                width={Math.min(window.innerWidth * 0.8, 800)}
              />
            </Document>
          </div>

          <div className="flex justify-center items-center gap-4 mt-4">
            <button
              onClick={() => setPageNumber((p) => Math.max(1, p - 1))}
              disabled={pageNumber <= 1}
              className="px-4 py-2 bg-gray-100 rounded disabled:opacity-50"
            >
              Previous
            </button>
            <p className="text-sm">
              Page {pageNumber} of {numPages}
            </p>
            <button
              onClick={() => setPageNumber((p) => Math.min(numPages, p + 1))}
              disabled={pageNumber >= numPages}
              className="px-4 py-2 bg-gray-100 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    );
  };

  const handleViewDocument = (doc) => {
    setPdfModal({ isOpen: true, url: doc.url, title: doc.title });
  };

  const renderGrades = () => (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <FaBook /> Academic Performance
        </h2>
        <button
          onClick={() => window.open("/path/to/full-report.pdf")}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          <FaFilePdf /> Download Report Card
        </button>
      </div>

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
            {studentInfo.grades.subjects.map((grade, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3 font-medium">{grade.subject}</td>
                <td className="px-4 py-3 text-center">{grade.q1}</td>
                <td className="px-4 py-3 text-center">{grade.q2}</td>
                <td className="px-4 py-3 text-center">{grade.q3}</td>
                <td className="px-4 py-3 text-center">{grade.q4 || "-"}</td>
                <td className="px-4 py-3 text-center">{grade.final || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderTuition = () => (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <FaCreditCard /> Tuition Information
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-green-800 mb-2">
            Current Balance
          </h3>
          <p className="text-2xl font-bold text-green-900">
            ₱{studentInfo.tuition.currentBalance.toLocaleString()}
          </p>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-blue-800 mb-2">
            Next Due Date
          </h3>
          <p className="text-2xl font-bold text-blue-900">
            {new Date(studentInfo.tuition.nextDueDate).toLocaleDateString()}
          </p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-purple-800 mb-2">
            Next Due Amount
          </h3>
          <p className="text-2xl font-bold text-purple-900">
            ₱{studentInfo.tuition.nextDueAmount.toLocaleString()}
          </p>
        </div>
      </div>

      <h3 className="font-semibold mb-4">Payment History</h3>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-3 text-left font-semibold">Date</th>
              <th className="px-4 py-3 text-left font-semibold">
                Reference No.
              </th>
              <th className="px-4 py-3 text-right font-semibold">Amount</th>
              <th className="px-4 py-3 text-center font-semibold">Status</th>
              <th className="px-4 py-3 text-center font-semibold">Receipt</th>
            </tr>
          </thead>
          <tbody>
            {studentInfo.tuition.payments.map((payment, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3">
                  {new Date(payment.date).toLocaleDateString()}
                </td>
                <td className="px-4 py-3">{payment.referenceNo}</td>
                <td className="px-4 py-3 text-right">
                  ₱{payment.amount.toLocaleString()}
                </td>
                <td className="px-4 py-3 text-center">
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                    {payment.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-center">
                  <button
                    onClick={() =>
                      window.open(`/path/to/receipt/${payment.referenceNo}.pdf`)
                    }
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <FaDownload />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderDocuments = () => (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <FaFileAlt /> Documents
        </h2>
      </div>

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
    </div>
  );

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
            <p className="text-gray-600">Grade 4 - Einstein</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Student ID</p>
          <strong className="text-lg">2024-0001</strong>
        </div>
      </div>
    </div>
  );

  const handleEdit = () => setIsEditing(true);

  const handleSave = () => {
    // Here you would make an API call to save the changes
    console.log("Saving data:", studentInfo);
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

  const handleTraitToggle = (trait) => {
    setStudentInfo((prev) => {
      const currentTraits = prev.characteristics.selectedTraits || [];
      const newTraits = currentTraits.includes(trait)
        ? currentTraits.filter((t) => t !== trait)
        : [...currentTraits, trait];

      return {
        ...prev,
        characteristics: {
          ...prev.characteristics,
          selectedTraits: newTraits,
        },
      };
    });
  };

  const handleAddField = () => {
    if (newField.name) {
      setStudentInfo((prev) => ({
        ...prev,
        characteristics: {
          ...prev.characteristics,
          customFields: {
            ...prev.characteristics.customFields,
            [newField.name]: {
              type: newField.type,
              value: "",
            },
          },
        },
      }));
      setNewField({ name: "", type: "text" });
      setShowFieldModal(false);
    }
  };

  // Modified renderEditableSection to include traits and custom fields
  const renderEditableSection = (title, section, data) => (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">{title}</h2>
        <div className="flex gap-2">
          {!isEditing ? (
            <button
              onClick={handleEdit}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
            >
              <FaEdit /> Edit
            </button>
          ) : (
            <>
              {section === "characteristics" && (
                <button
                  onClick={() => setShowFieldModal(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
                >
                  <FaPlus /> Add Field
                </button>
              )}
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
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Regular fields */}
        {Object.entries(data).map(([field, value]) => {
          if (field === "selectedTraits" || field === "customFields")
            return null;
          return (
            <div key={field} className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 capitalize">
                {field.replace(/([A-Z])/g, " $1").trim()}
              </label>
              {field === "interests" ||
              field === "strengths" ||
              field === "challenges" ? (
                <textarea
                  value={value}
                  onChange={(e) =>
                    handleInputChange(section, field, e.target.value)
                  }
                  disabled={!isEditing}
                  className={`w-full px-3 py-2 border rounded-md ${
                    !isEditing
                      ? "bg-gray-50 text-gray-500"
                      : "border-gray-300 focus:ring-2 focus:ring-green-500"
                  }`}
                  rows={3}
                />
              ) : (
                <input
                  type={
                    field.includes("date") || field === "birthday"
                      ? "date"
                      : "text"
                  }
                  value={value}
                  onChange={(e) =>
                    handleInputChange(section, field, e.target.value)
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
          );
        })}

        {/* Traits multi-select for characteristics section */}
        {section === "characteristics" && (
          <div className="col-span-full">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <FaTags className="inline mr-2" />
              Character Traits
            </label>
            <div className="flex flex-wrap gap-2">
              {TRAITS_OPTIONS.map((trait) => (
                <button
                  key={trait}
                  onClick={() => isEditing && handleTraitToggle(trait)}
                  disabled={!isEditing}
                  className={`px-3 py-1 rounded-full text-sm ${
                    data.selectedTraits?.includes(trait)
                      ? "bg-green-500 text-white"
                      : "bg-gray-200 text-gray-700"
                  } ${isEditing ? "hover:opacity-80" : ""} transition-colors`}
                >
                  {trait}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Custom fields */}
        {section === "characteristics" &&
          data.customFields &&
          Object.entries(data.customFields).map(([fieldName, fieldData]) => (
            <div key={fieldName} className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 capitalize">
                {fieldName.replace(/([A-Z])/g, " $1").trim()}
              </label>
              {fieldData.type === "textarea" ? (
                <textarea
                  value={fieldData.value}
                  onChange={(e) =>
                    handleInputChange(
                      section,
                      `customFields.${fieldName}.value`,
                      e.target.value
                    )
                  }
                  disabled={!isEditing}
                  className={`w-full px-3 py-2 border rounded-md ${
                    !isEditing
                      ? "bg-gray-50 text-gray-500"
                      : "border-gray-300 focus:ring-2 focus:ring-green-500"
                  }`}
                  rows={3}
                />
              ) : (
                <input
                  type={fieldData.type}
                  value={fieldData.value}
                  onChange={(e) =>
                    handleInputChange(
                      section,
                      `customFields.${fieldName}.value`,
                      e.target.value
                    )
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
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Family Portal</h1>
        <button className="text-sm text-gray-500 hover:text-green-600 transition-colors">
          Need help?
        </button>
      </div>

      {!selectedChild ? (
        <>
          <QuickStats />
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Your Children</h2>
            <ChildrenList />
          </div>
        </>
      ) : (
        <SelectedChildView />
      )}

      {/* static things.. */}
      {renderStudentHeader()}
      {/* Navigation Tabs */}
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
          onClick={() => setActiveTab("characteristics")}
          className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
            activeTab === "characteristics"
              ? "bg-green-600 text-white"
              : "bg-gray-100 hover:bg-gray-200"
          }`}
        >
          <FaBrain /> Characteristics
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
        <button
          onClick={() => setActiveTab("grades")}
          className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
            activeTab === "grades"
              ? "bg-green-600 text-white"
              : "bg-gray-100 hover:bg-gray-200"
          }`}
        >
          <FaBook /> Grades
        </button>
        <button
          onClick={() => setActiveTab("tuition")}
          className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
            activeTab === "tuition"
              ? "bg-green-600 text-white"
              : "bg-gray-100 hover:bg-gray-200"
          }`}
        >
          <FaCreditCard /> Tuition
        </button>
        <button
          onClick={() => setActiveTab("documents")}
          className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
            activeTab === "documents"
              ? "bg-green-600 text-white"
              : "bg-gray-100 hover:bg-gray-200"
          }`}
        >
          <FaFileAlt /> Documents
        </button>
      </div>

      <div>
        {activeTab === "personal" &&
          renderEditableSection(
            "Personal Information",
            "personal",
            studentInfo.personal
          )}
        {activeTab === "characteristics" &&
          renderEditableSection(
            "Characteristics",
            "characteristics",
            studentInfo.characteristics
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
        {activeTab === "living" &&
          renderEditableSection(
            "Living Arrangements",
            "living",
            studentInfo.living
          )}
        {activeTab === "grades" && renderGrades()}
        {activeTab === "tuition" && renderTuition()}
        {activeTab === "documents" && renderDocuments()}
      </div>
      {/* Modal for adding new fields */}
      {showFieldModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-semibold mb-4">Add New Field</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Field Name
                </label>
                <input
                  type="text"
                  value={newField.name}
                  onChange={(e) =>
                    setNewField((prev) => ({ ...prev, name: e.target.value }))
                  }
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Field Type
                </label>
                <select
                  value={newField.type}
                  onChange={(e) =>
                    setNewField((prev) => ({ ...prev, type: e.target.value }))
                  }
                  className="w-full px-3 py-2 border rounded-md"
                >
                  <option value="text">Text</option>
                  <option value="textarea">Text Area</option>
                  <option value="number">Number</option>
                  <option value="date">Date</option>
                </select>
              </div>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setShowFieldModal(false)}
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddField}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Add Field
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {pdfModal.isOpen && <PdfViewerModal />}
    </div>
  );
};

export default FamilyPortalEnhanced;
