//students

export const fetchStudents = async () => {
  console.log(`${process.env.REACT_APP_API_BASE_URL}`, "checking the URL");
  const response = await fetch(
    `${process.env.REACT_APP_API_BASE_URL}/students/`
  );
  const data = await response.json();
  console.log("api js gives :", data);
  if (!response.ok) {
    throw new Error("Failed to fetch students");
  }
  return data;
};
export const fetchStudentByStudentId = async (studentId) => {
  console.log("fetchStudentByStudentId", studentId);
  console.log(
    "url works",
    `${process.env.REACT_APP_API_BASE_URL}/students/${studentId}/`
  );

  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_BASE_URL}/students/${studentId}/`
    );
    console.log("RESPONSE", response);
    if (!response.ok) {
      // If the response is not okay, parse the JSON to get error details
      const errorData = await response.json();
      console.error("API Error:", errorData);
      throw new Error(errorData.detail || "Failed to fetch student");
    }

    const data = await response.json();
    console.log("API.js Data:", data);
    return data;
  } catch (error) {
    // Log any errors during the fetch or processing
    console.error("Error fetching student details:", error);
    throw error; // Rethrow to handle it where the function is called
  }
};

// export const fetchStudentByStudentId = async (studentId) => {
//   const response = await fetch(
//     `${process.env.REACT_APP_API_BASE_URL}/students/${studentId}/`
//   );
//   const data = await response.json();
//   console.log("API.JS", data);
//   if (!response.ok) {
//     throw new Error("Failed to fetch student");
//   }
//   return data;
// };

// Add updateStudent function
export const updateStudent = async (studentId, updatedData) => {
  const response = await fetch(
    `${process.env.REACT_APP_API_BASE_URL}/students/${studentId}/`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    }
  );
  const data = await response.json();
  console.log("API RESPONSE", data);
  if (!response.ok) {
    throw new Error("Failed to update student");
  }
  return data;
};

//Teaachers API
export const fetchTeachers = async () => {
  const response = await fetch(
    `${process.env.REACT_APP_API_BASE_URL}/teachers/`
  );
  const data = await response.json();
  console.log("API RESPONSE", data);
  if (!response.ok) {
    console.log("line 21");
    throw new Error("Failed to fetch teachers");
  }
  return data;
};

export const fetchApplicants = async () => {
  const response = await fetch(
    `${process.env.REACT_APP_API_BASE_URL}/applicants/`
  );
  const data = await response.json();
  console.log("API RESPONSE", data);
  if (!response.ok) {
    throw new Error("Failed to fetch applicants");
  }
  return data;
};

export const fetchCourses = async () => {
  const response = await fetch(
    `${process.env.REACT_APP_API_BASE_URL}/courses/`
  );
  const data = await response.json();
  console.log("API RESPONSE", data);
  if (!response.ok) {
    throw new Error("Failed to fetch courses");
  }
  return data;
};

export const fetchEnrollments = async () => {
  const response = await fetch(
    `${process.env.REACT_APP_API_BASE_URL}/enrollments/`
  );
  const data = await response.json();
  console.log("API RESPONSE", data);
  if (!response.ok) {
    throw new Error("Failed to fetch enrollments");
  }
  return data;
};
