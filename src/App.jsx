import React from "react";
import { useRoutes } from "react-router-dom";
import { routes } from "./route.jsx";
import { Toaster } from "react-hot-toast";

export const App = () => {
const element = useRoutes(routes);
    return (
        <>
        <div>
        {element}
        </div>
        <Toaster position="top-center" reverseOrder={false} />
        </>
    );
};
