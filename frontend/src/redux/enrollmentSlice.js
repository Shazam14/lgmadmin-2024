// src/redux/applicantsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchEnrollments } from "./../services/studentApi";

export const getEnrollments = createAsyncThunk(
  "applicants/getApplicants",
  async (_, { rejectWithValue }) => {
    try {
      const enrollments = await fetchEnrollments();
      console.log("Enrollments in asynch thunk", enrollments);
      return enrollments;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState: {
    entities: [],
    loading: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getEnrollments.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(getEnrollments.fulfilled, (state, action) => {
        console.log("Action Payload", action.payload);
        state.loading = "succeeded";
        state.entities = action.payload; // Assume the payload is the list of applicants
      })
      .addCase(getEnrollments.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message; // Assume error info is available in action.error.message
      });
  },
});

export default enrollmentsSlice.reducer;
