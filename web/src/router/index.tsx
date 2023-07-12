import { createBrowserRouter } from "react-router-dom";
import App from "../App"
import Blog from "../pages/blog/blog"
import Experiment from "../pages/experiment/experiment"
import Archives from "../pages/archives/archives"
import React from "react";
export const root = {
    path:"/",
    element:<App></App>,
    children:[
        {   
            index:true,
            path:"/",
            id:"首页",
            icon:"home",
            element:<Blog></Blog>
        },
        {
            path:"/archives",
            id:"归档",
            icon:"clone",
            element:<Archives></Archives>
        },
        {
            path:"/experiment",
            id:"实验中心",
            icon:"lab",
            element:<Experiment></Experiment>
        },
    ]
}
const routerList = [
    root
]
export const router  = createBrowserRouter(routerList)