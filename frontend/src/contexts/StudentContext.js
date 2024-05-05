import React, { createContext, useContext, useState } from "react";

const StudentContext = createContext();

export const useStudent = () => useContext(StudentContext);

export const StudentProvider = ({ children }) => {
  const [student, setStudent] = useState(null);

  const updateStudent = (fetchedStudent) => {
    setStudent(fetchedStudent);
  };

  return (
    <StudentContext.Provider value={{ student, updateStudent }}>
      {children}
    </StudentContext.Provider>
  );
};
