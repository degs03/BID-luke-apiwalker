import { createBrowserRouter } from "react-router-dom"
import Navbar from "../components/Navbar";
import Personas from "../components/Personas";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Navbar />
    },
    {
        path: "/:id",
        element: <Personas />
    },
]);