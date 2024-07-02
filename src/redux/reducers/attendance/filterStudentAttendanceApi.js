import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { privateGet } from '../../utilities/apiCaller';

export const fetchAttendanceByBatchId = createAsyncThunk(
  'attendance/fetchByBatchId',
  async ({ batchId, page, perPage,token }) => {
    const response = await privateGet(`/attendance/student?batchId=${batchId}&page=${page}&perPage=${perPage}`,token);
    return response.json();
  }
);

export const attendanceSlice = createSlice({
  name: 'attendance',
  initialState: {
    attendance: [],
    totalResults: 0,
    isLoading: false,
    success: false,
    error: null,
  },
  reducers: {
    // other reducers...
  },
  extraReducers: (builder) => {
    builder
        .addCase(fetchAttendanceByBatchId.pending, (state) => {
        //   state.isError = false;
          state.isLoading = true;
        })
        .addCase(fetchAttendanceByBatchId.fulfilled, (state, action) => {
          state.attendance = action.payload;
          state.isLoading = false;
          state.success = true;
        })
        .addCase(fetchAttendanceByBatchId.rejected, (state, action) => {
          state.isLoading = true;
          state.attendance = [];
        //   state.isError = true;
          state.success = false;
        })
  }
//   extraReducers: {
//     // [fetchAttendanceByBatchId.pending]: (state) => {
//     //   state.isLoading = true;
//     // },
//     // [fetchAttendanceByBatchId.fulfilled]: (state, action) => {
//     //   state.isLoading = false;
//     //   state.attendance = action.payload.results;
//     //   state.totalResults = action.payload.totalResults;
//     // },
//     // [fetchAttendanceByBatchId.rejected]: (state, action) => {
//     //   state.isLoading = false;
//     //   state.error = action.error.message;
//     // },
//   },
});

// export const { createAttendanceClean } = createAttendanceSlice.actions;
export default attendanceSlice.reducer;