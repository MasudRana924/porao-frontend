import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { publicGet } from "../../utilities/apiCaller";


export const fetchTutionPost = createAsyncThunk(
    "fetch/tuition/post",
    async () => {
        const response = await publicGet("/teacher/tuition/post");
        return response.data;
    }
);
export const tuitionPostSlice = createSlice({
    name: "posts",
    initialState: {
        posts: [],
        isLoading: false,
        isError: false,
        error: "",
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTutionPost.pending, (state) => {
                state.isError = false;
                state.isLoading = true;
            })
            .addCase(fetchTutionPost.fulfilled, (state, action) => {
                state.posts = action.payload;
                state.isLoading = false;
            })
            .addCase(fetchTutionPost.rejected, (state, action) => {
                state.isLoading = true;
                state.jobs = [];
                state.isError = true;
                state.error = action.payload.error?.message;
            });
    },
});

export default tuitionPostSlice.reducer;