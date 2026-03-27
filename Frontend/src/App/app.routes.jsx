import { createBrowserRouter } from "react-router";
import Homepage from "../Features/Home/Pages/Homepage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Homepage />
    }
])