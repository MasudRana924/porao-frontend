import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { publicGet, publicPost } from "../../utilities/apiCaller";


export const createBookTeacher = createAsyncThunk(
    "create/teacher/book",
    async () => {
        const response = await publicPost("/teacher/tuition/post");
        return response.data;
    }
);
export const teacheBookSlice = createSlice({
    name: "posts",
    initialState: {
        booking: [],
        isLoading: false,
        isError: false,
        // error: "",
    },
    extraReducers: (builder) => {
        builder
            .addCase(createBookTeacher.pending, (state) => {
                state.isError = false;
                state.isLoading = true;
            })
            .addCase(createBookTeacher.fulfilled, (state, action) => {
                state.booking = action.payload;
                state.isLoading = false;
            })
            .addCase(createBookTeacher.rejected, (state, action) => {
                state.isLoading = true;
                state.booking = [];
                state.isError = true;
                // state.error = action.payload.error?.message;
            });
    },
});

export default teacheBookSlice.reducer;