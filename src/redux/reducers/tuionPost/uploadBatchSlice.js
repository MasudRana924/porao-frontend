import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { privatePost, } from "../../utilities/apiCaller";


export const createTutionBatch = createAsyncThunk(
    "upload/tuition/post",
    async ({ token,data},{ rejectWithValue }) => {
        try {
          const response = await privatePost("/batch/create/new",token,data);
          return response;
        } catch (err) {
          return rejectWithValue(err.response.data.message);
        }
      }
);
export const uploadTuitionPostSlice = createSlice({
    name: "uploadBatch",
    initialState: {
        batch: [],
        isLoading: false,
        isError: false,
        success:false
        // error: "",
    }, reducers: {
        
        updatePostClean: (state) => {
          state.success= false;
        },
      },
    extraReducers: (builder) => {
        builder
            .addCase(createTutionBatch.pending, (state) => {
                state.isError = false;
                state.isLoading = true;
            })
            .addCase(createTutionBatch.fulfilled, (state, action) => {
                state.batch = action.payload;
                state.isLoading = false;
                state.success = true;
            })
            .addCase(createTutionBatch.rejected, (state, action) => {
                state.isLoading = true;
                state.batch = [];
                state.isError = true;
                state.success = false;
                // state.error = action.payload.error?.message;
            });
    },
});
export const { updatePostClean } = uploadTuitionPostSlice.actions;
export default uploadTuitionPostSlice.reducer;