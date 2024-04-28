// src/redux/studentsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchStudents } from "../services/api";

export const getStudents = createAsyncThunk(
  "students/getStudents",
  async (_, { rejectWithValue }) => {
    try {
      const students = await fetchStudents();
      console.log("Students in asynch thunk", students);
      return students;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const studentsSlice = createSlice({
  name: "students",
  initialState: {
    entities: [],
    loading: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getStudents.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(getStudents.fulfilled, (state, action) => {
        console.log("Action Payload", action.payload);
        state.loading = "succeeded";
        state.entities = action.payload; // Assume the payload is the list of students
      })
      .addCase(getStudents.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message; // Assume error info is available in action.error.message
      });
  },
});

export default studentsSlice.reducer;
