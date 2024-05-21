// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import studentsReducer from "./studentSlice";
import teachersReducer from "./teacherSlice";
import applicantsReducer from "./applicantSlice";
import coursesReducer from "./courseSlice";
import enrollmentsReducer from "./enrollmentSlice";

export const store = configureStore({
  reducer: {
    students: studentsReducer,
    teachers: teachersReducer,
    applicants: applicantsReducer,
    courses: coursesReducer,
    enrollments: enrollmentsReducer,
  },
});
