import { createBrowserRouter } from "react-router-dom";
import App from "../App"
import Blog from "../pages/blog/blog"
import React from "react";

export const router  = createBrowserRouter([
    {
        path:"/",
        element:<App></App>,
        children:[
            {
                path:"/blog",
                element:<Blog></Blog>
            }
        ]
    },
])