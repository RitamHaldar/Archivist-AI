import { configureStore } from "@reduxjs/toolkit";
import homeReducer from "../Features/Home/home.slice";

export const store = configureStore({
    reducer: {
        home: homeReducer,
    },
});
