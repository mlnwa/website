import React ,{useState} from "react";
import "./App.css"
import { Outlet, useLocation } from "react-router-dom";
import NavMenu from "./components/NavMenu/NavMenu";
const App = () => {
    return (
        <div className="main">
            <div className="header ">
                <NavMenu ></NavMenu>
            </div>
            <div className="body">
                <Outlet></Outlet>
            </div>
            <div className="footer">footer</div>
        </div>

    )
}

export default App