import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    loading: true,
    username: null,
    error: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        setUsername: (state, action) => {
            state.username = action.payload;
        }
    },
});

export const { setUser, setLoading, setError, setUsername } = authSlice.actions;
export default authSlice.reducer;