import { createBrowserRouter, Navigate } from "react-router";
import Homepage from "../Features/Home/Pages/Homepage";
import Login from "../Features/Auth/Pages/Login";
import Register from "../Features/Auth/Pages/Register";
import Protected from "../Features/Auth/Components/Protected";
import Loading from "../Features/Auth/Components/Loading";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Protected><Homepage /></Protected>
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/register",
        element: <Register />
    },
    {
        path: "*",
        element: <Navigate to="/" />
    }
])