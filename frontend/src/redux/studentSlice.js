// src/redux/studentsSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../services/api";

export const getStudents = createAsyncThunk(
  "students/getStudents",
  async (_, { rejectWithValue }) => {
    try {
      const data = await api.fetchData("students/");
      return data;
    } catch (error) {
      console.error("Error fetching students:", error);
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
        state.entities = action.payload;
      })
      .addCase(getStudents.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload;
      });
  },
});

export default studentsSlice.reducer;
