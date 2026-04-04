import { configureStore } from "@reduxjs/toolkit";
import homeReducer from "../Features/Home/home.slice";
import authReducer from "../Features/Auth/auth.slice";

export const store = configureStore({
    reducer: {
        home: homeReducer,
        auth: authReducer,
    },
});
