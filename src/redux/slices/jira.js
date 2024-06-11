import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axios";

export const fetchUserTickets = createAsyncThunk(
  "jira/fetchUserTickets",
  async () => {
    const response = await axios.get("/api/create-ticket");
    return response.data;
  }
);

const jiraSlice = createSlice({
  name: "jira",
  initialState: {
    userTickets: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserTickets.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserTickets.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userTickets = action.payload;
      })
      .addCase(fetchUserTickets.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default jiraSlice.reducer;
