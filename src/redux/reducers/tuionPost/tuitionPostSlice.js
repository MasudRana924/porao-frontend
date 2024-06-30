import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { publicGet } from "../../utilities/apiCaller";
export const fetchTutionPost = createAsyncThunk(
    "fetch/tuition/post",
    async () => {
        const response = await publicGet("/batch/all/batches");
        return response.data;
    }
);
export const tuitionPostSlice = createSlice({
    name: "posts",
    initialState: {
        posts: [],
        isLoading: false,
        isError: false,
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
                state.posts = [];
                state.isError = true;
            });
    },
});
export default tuitionPostSlice.reducer;