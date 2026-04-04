import { createSlice } from "@reduxjs/toolkit";

const homeSlice = createSlice({
    name: "home",
    initialState: {
        collections: [],
        posts: [],
        selectedCollection: null,
        loading: false,
        suggestedPosts: [],
        searchPosts: [],
        tagSearchQuery: '',
        error: null,
    },
    reducers: {
        setCollections: (state, action) => {
            state.collections = action.payload;
        },
        setPosts: (state, action) => {
            state.posts = action.payload;
        },
        setSelectedCollection: (state, action) => {
            state.selectedCollection = action.payload;
        },
        addPost: (state, action) => {
            state.posts = [action.payload, ...state.posts];
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        setSuggestedPosts: (state, action) => {
            state.suggestedPosts = action.payload;
        },
        setSearchPosts: (state, action) => {
            state.searchPosts = action.payload;
        },
        setTagSearchQuery: (state, action) => {
            state.tagSearchQuery = action.payload;
        },
    },
});

export const { setCollections, setPosts, setSelectedCollection, setLoading, setError, addPost, setSuggestedPosts, setSearchPosts, setTagSearchQuery } = homeSlice.actions;
export default homeSlice.reducer;
