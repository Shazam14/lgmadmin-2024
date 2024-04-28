// src/redux/teachersSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchTeachers } from "../services/api";

export const getTeachers = createAsyncThunk(
  "teachers/getTeachers",
  async (_, { rejectWithValue }) => {
    try {
      const teachers = await fetchTeachers();
      console.log("Teachers in asynch thunk", teachers);
      return teachers;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const teachersSlice = createSlice({
  name: "teachers",
  initialState: {
    entities: [],
    loading: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTeachers.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(getTeachers.fulfilled, (state, action) => {
        console.log("Action Payload", action.payload);
        state.loading = "succeeded";
        state.entities = action.payload; // Assume the payload is the list of teachers
      })
      .addCase(getTeachers.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message; // Assume error info is available in action.error.message
      });
  },
});

export default teachersSlice.reducer;
