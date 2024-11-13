import React from "react";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const CertificateGenerator = () => {
  const generateCertificate = (certificateData) => {
    const docDefinition = {
      pageSize: "A4",
      pageOrientation: "landscape",
      content: [
        {
          text: "LEARNING GARDEN MONTESSORI SCHOOL",
          style: "header",
          alignment: "center",
        },
        {
          text: "\nCertificate of Achievement",
          style: "title",
          alignment: "center",
        },
        {
          text: "\nThis is to certify that\n\n",
          style: "subheader",
          alignment: "center",
        },
        {
          text: `${certificateData.studentName}`,
          style: "name",
          alignment: "center",
        },
        {
          text: "\nhas successfully completed\n\n",
          style: "subheader",
          alignment: "center",
        },
        {
          text: `${certificateData.achievement}`,
          style: "achievement",
          alignment: "center",
        },
        {
          text: `\nAwarded this ${new Date().toLocaleDateString()}`,
          style: "date",
          alignment: "center",
          margin: [0, 20, 0, 40],
        },
        {
          columns: [
            {
              width: "30%",
              text: "_______________________\nClass Adviser",
              alignment: "center",
            },
            {
              width: "40%",
              text: "_______________________\nSchool Principal",
              alignment: "center",
            },
            {
              width: "30%",
              text: "_______________________\nDepartment Head",
              alignment: "center",
            },
          ],
        },
      ],
      styles: {
        header: {
          fontSize: 24,
          bold: true,
          margin: [0, 20, 0, 0],
        },
        title: {
          fontSize: 36,
          bold: true,
          color: "#4a5568",
        },
        subheader: {
          fontSize: 18,
          margin: [0, 10, 0, 0],
        },
        name: {
          fontSize: 30,
          bold: true,
          color: "#2d3748",
          decoration: "underline",
        },
        achievement: {
          fontSize: 24,
          color: "#4a5568",
          italics: true,
        },
        date: {
          fontSize: 14,
        },
      },
      background: {
        canvas: [
          {
            type: "rect",
            x: 20,
            y: 20,
            w: 752,
            h: 532,
            lineWidth: 2,
            lineColor: "#718096",
          },
        ],
      },
    };

    pdfMake
      .createPdf(docDefinition)
      .download(`${certificateData.studentName}_certificate.pdf`);
  };

  return (
    <button
      onClick={() =>
        generateCertificate({
          studentName: "John Smith",
          achievement: "Outstanding Academic Performance\nin Mathematics",
        })
      }
      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
    >
      Generate Certificate
    </button>
  );
};

export default CertificateGenerator;
