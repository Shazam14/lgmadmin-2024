// src/redux/applicantsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchApplicants } from "../services/api";

export const getApplicants = createAsyncThunk(
  "applicants/getApplicants",
  async (_, { rejectWithValue }) => {
    try {
      const applicants = await fetchApplicants();
      console.log("Applicants in asynch thunk", applicants);
      return applicants;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const applicantsSlice = createSlice({
  name: "applicants",
  initialState: {
    entities: [],
    loading: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getApplicants.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(getApplicants.fulfilled, (state, action) => {
        console.log("Action Payload", action.payload);
        state.loading = "succeeded";
        state.entities = action.payload; // Assume the payload is the list of applicants
      })
      .addCase(getApplicants.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message; // Assume error info is available in action.error.message
      });
  },
});

export default applicantsSlice.reducer;
