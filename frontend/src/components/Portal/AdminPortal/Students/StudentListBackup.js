// src/components/StudentsList.js
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getStudents } from "../../../../redux/studentSlice";
import "../../../../styles/portal/admintable.css";

const StudentsList = () => {
  const dispatch = useDispatch();
  const students = useSelector((state) => state.students.entities);
  const loading = useSelector((state) => state.students.loading);
  const error = useSelector((state) => state.students.error);

  useEffect(() => {
    dispatch(getStudents());
  }, [dispatch]);

  if (loading === "loading") {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  console.log("Students in component", students);

  return (
    <div>
      <h1 className="table-heading">Students List</h1>
      {students && students.length > 0 ? (
        <table className="table">
          <thead>
            <tr>
              <th className="text-table">ID</th>
              <th className="text-table">Name</th>
              <th className="text-table">Birthday</th>
              <th className="text-table">Email</th>
              <th className="text-table">Tuition Status</th>
              <th className="text-table">Account Status</th>
              <th className="text-table">Action Buttons</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.student_id}>
                <td>
                  <button className="button-table">View</button>
                  <button className="button-table">Edit</button>
                </td>
                <td className="td-table">{student.student_id}</td>
                <td className="td-table">{student.name}</td>
                <td className="td-table">{student.birthday}</td>
                <td className="td-table">{student.email}</td>
                <td className="td-table">{student.tuition_status}</td>
                <td className="td-table">{student.account_status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No students found</p>
      )}
    </div>
  );
};

export default StudentsList;
