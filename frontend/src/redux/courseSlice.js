// src/redux/courseSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../services/api";
export const getCourses = createAsyncThunk(
  "courses/getCourses",
  async (_, { rejectWithValue }) => {
    try {
      const courses = await api.fetchData("courses/");
      console.log("Courses in asynch thunk", courses);
      return courses;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const courseSlice = createSlice({
  name: "courses",
  initialState: {
    entities: [],
    loading: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCourses.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(getCourses.fulfilled, (state, action) => {
        console.log("Action Payload", action.payload);
        state.loading = "succeeded";
        state.entities = action.payload; // Assume the payload is the list of courses
      })
      .addCase(getCourses.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message; // Assume error info is available in action.error.message
      });
  },
});

export default courseSlice.reducer;
