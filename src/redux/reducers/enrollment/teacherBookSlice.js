import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { privatePost,} from "../../utilities/apiCaller";


export const createEnrollmentTeacher = createAsyncThunk(
    "create/teacher/enrollment",
    async ({ token,data},{ rejectWithValue }) => {
        try{
            const response = await privatePost("/enrollment/create/new",token,data);
        return response.data;
        }catch (err) {
            return rejectWithValue(err.response.data.message);
          }
    }
);
export const teacherEnrollmentSlice = createSlice({
    name: "posts",
    initialState: {
        enrollment: [],
        isLoading: false,
        isError: false,
        success:false
        // error: "",
    },
    reducers: {
        enrollmentClean: (state) => {
          state.errorMessage = "";
          state.success = false;
        },
      },
    extraReducers: (builder) => {
        builder
            .addCase(createEnrollmentTeacher.pending, (state) => {
                state.isError = false;
                state.isLoading = true;
            })
            .addCase(createEnrollmentTeacher.fulfilled, (state, action) => {
                state.enrollment = action.payload;
                state.isLoading = false;
                state.success=true
            })
            .addCase(createEnrollmentTeacher.rejected, (state, action) => {
                state.isLoading = true;
                state.enrollment = [];
                state.isError = true;
                // state.error = action.payload.error?.message;
            });
    },
});
export const { enrollmentClean } = teacherEnrollmentSlice.actions;
export default teacherEnrollmentSlice.reducer;