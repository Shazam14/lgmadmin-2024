export const fetchStudents = async () => {
  //console.log(`${process.env.REACT_APP_API_BASE_URL}`, "checking the URL");
  const response = await fetch(
    `${process.env.REACT_APP_API_BASE_URL}/students/`
  );
  const data = await response.json();
  console.log("API RESPONSE", data);
  if (!response.ok) {
    throw new Error("Failed to fetch students");
  }
  return data;
};

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
