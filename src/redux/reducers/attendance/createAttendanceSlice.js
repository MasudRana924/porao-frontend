import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { privatePost } from "../../utilities/apiCaller";

export const createAttendance = createAsyncThunk(
  "create/Attendance",
  async ({ token, data }, { rejectWithValue }) => {
    try {
      const response = await privatePost("/attendance/record/student/attendance", token, data);
      return response;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);
export const createAttendanceSlice = createSlice({
    name: "createAttendance",
    initialState: {
      createAttendance: [],
      isLoading: false,
      isError: false,
      success: false
      // error: "",
    }, reducers: {
  
      createAttendanceClean: (state) => {
        state.success = false;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(createAttendance.pending, (state) => {
          state.isError = false;
          state.isLoading = true;
        })
        .addCase(createAttendance.fulfilled, (state, action) => {
          state.createAttendance = action.payload;
          state.isLoading = false;
          state.success = true;
        })
        .addCase(createAttendance.rejected, (state, action) => {
          state.isLoading = true;
          state.createAttendance = [];
          state.isError = true;
          state.success = false;
        })
    },
  });
  export const { createAttendanceClean } = createAttendanceSlice.actions;
  export default createAttendanceSlice.reducer;