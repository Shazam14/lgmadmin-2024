import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  fetchStudentByStudentId,
  fetchParentDetails,
} from "../../../../services/studentApi";

const Parents = () => {
  const { studentId } = useParams();
  const [parentDetails, setParentDetails] = useState(null);

  useEffect(() => {
    const fetchStudentAndParentDetails = async () => {
      try {
        if (studentId) {
          const student = await fetchStudentByStudentId(studentId);
          const parentUrl = student.parents;

          if (parentUrl) {
            const parentData = await fetchParentDetails(parentUrl);
            setParentDetails(parentData);
          }
        }
      } catch (error) {
        console.error("Error fetching student and parent details:", error);
      }
    };

    fetchStudentAndParentDetails();
  }, [studentId]);

  return (
    <div>
      <h2>Parent Details</h2>
      {parentDetails ? (
        <div>
          <p>Name: {parentDetails.name}</p>
          <p>Relationship: {parentDetails.relationship}</p>
          {/* Add more parent details as needed */}
        </div>
      ) : (
        <p>Loading parent details...</p>
      )}
    </div>
  );
};

export default Parents;
