import { RouteObject, createBrowserRouter } from "react-router-dom";
import App from "../App"
import Blog from "../pages/blog/blog"
import Experiment from "../pages/experiment/experiment"
import Archives from "../pages/archives/archives"
import React from "react";
import { SemanticICONS } from "semantic-ui-react";
type CustomProps = {
    icon:SemanticICONS,
    label:string
}
export type CustomRoute = RouteObject & {
    customProp: CustomProps;
    children:CustomRoute[]
};
export const root = {
    path:"/",
    element:<App></App>,
    children:[
        {   
            index:true,
            path:"/",
            id:"blog",
            element:<Blog></Blog>,
            customProp:{
                icon:"home",
                label:"博客"
            }
        },
        {
            path:"/archives",
            element:<Archives></Archives>,
            customProp:{
                icon:"clone",
                label:"归档"
            }
        },
        {
            path:"/experiment",
            element:<Experiment></Experiment>,
            customProp:{
                icon:"lab",
                label:"实验中心"
            }
        },
    ]
} as CustomRoute
const routerList = [
    root
] as RouteObject[]
export const router  = createBrowserRouter(routerList)