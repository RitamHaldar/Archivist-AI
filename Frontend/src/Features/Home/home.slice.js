import { createSlice } from "@reduxjs/toolkit";

const homeSlice = createSlice({
    name: "home",
    initialState: {
        collections: [],
        posts: [],
        loading: false,
        error: null,
    },
    reducers: {
        setCollections: (state, action) => {
            state.collections = action.payload;
        },
        setPosts: (state, action) => {
            state.posts = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
    },
});

export const { setCollections, setPosts, setLoading, setError } = homeSlice.actions;
export default homeSlice.reducer;
