import React from "react";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

// Register fonts
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const PDFGenerator = () => {
  const generateReportCard = (studentData) => {
    const docDefinition = {
      content: [
        // Header
        {
          text: "Learning Garden Montessori School",
          style: "header",
          alignment: "center",
        },
        {
          text: "Student Report Card",
          style: "subheader",
          alignment: "center",
          margin: [0, 0, 0, 20],
        },

        // Student Info
        {
          columns: [
            {
              width: "50%",
              text: [
                { text: "Student Name: ", bold: true },
                `${studentData.firstName} ${studentData.lastName}\n`,
                { text: "Grade Level: ", bold: true },
                `${studentData.grade}\n`,
                { text: "School Year: ", bold: true },
                "2023-2024",
              ],
            },
            {
              width: "50%",
              text: [
                { text: "Student ID: ", bold: true },
                `${studentData.studentId}\n`,
                { text: "Section: ", bold: true },
                `${studentData.section}\n`,
              ],
            },
          ],
          margin: [0, 0, 0, 20],
        },

        // Grades Table
        {
          table: {
            headerRows: 1,
            widths: ["*", "auto", "auto", "auto", "auto", "auto"],
            body: [
              [
                { text: "Subject", style: "tableHeader" },
                { text: "Q1", style: "tableHeader" },
                { text: "Q2", style: "tableHeader" },
                { text: "Q3", style: "tableHeader" },
                { text: "Q4", style: "tableHeader" },
                { text: "Final", style: "tableHeader" },
              ],
              ...studentData.grades.subjects.map((subject) => [
                subject.subject,
                subject.q1?.toString() || "-",
                subject.q2?.toString() || "-",
                subject.q3?.toString() || "-",
                subject.q4?.toString() || "-",
                subject.final?.toString() || "-",
              ]),
            ],
          },
        },

        // Comments Section
        {
          text: "Teacher Comments",
          style: "sectionHeader",
          margin: [0, 20, 0, 10],
        },
        {
          text: studentData.comments || "No comments provided.",
          margin: [0, 0, 0, 20],
        },

        // Attendance Summary
        {
          text: "Attendance Summary",
          style: "sectionHeader",
          margin: [0, 0, 0, 10],
        },
        {
          table: {
            widths: ["*", "*", "*", "*"],
            body: [
              ["Present", "Absent", "Late", "Total Days"],
              [
                studentData.attendance?.present || "0",
                studentData.attendance?.absent || "0",
                studentData.attendance?.late || "0",
                studentData.attendance?.total || "0",
              ],
            ],
          },
        },

        // Signatures
        {
          columns: [
            {
              width: "40%",
              text: "\n\n_____________________\nClass Adviser",
              alignment: "center",
            },
            {
              width: "20%",
              text: "",
            },
            {
              width: "40%",
              text: "\n\n_____________________\nPrincipal",
              alignment: "center",
            },
          ],
          margin: [0, 30, 0, 0],
        },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10],
        },
        subheader: {
          fontSize: 14,
          bold: true,
          margin: [0, 0, 0, 5],
        },
        sectionHeader: {
          fontSize: 12,
          bold: true,
          margin: [0, 10, 0, 5],
        },
        tableHeader: {
          bold: true,
          fillColor: "#f0f0f0",
        },
      },
      defaultStyle: {
        fontSize: 10,
      },
    };

    pdfMake
      .createPdf(docDefinition)
      .download(`${studentData.lastName}_report_card.pdf`);
  };

  // Example button to generate PDF
  return (
    <button
      onClick={() => generateReportCard(studentInfo)}
      className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
    >
      Generate Report Card
    </button>
  );
};

export default PDFGenerator;
