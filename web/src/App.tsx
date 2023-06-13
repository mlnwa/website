import React ,{useState} from "react";
import "./App.css"
import { Outlet } from "react-router-dom";
import NaveMenu from "./components/NavMenu/NavMenu";
const App = () => {
    return (
        <div className="main">
            <div className="header ">
                <NaveMenu></NaveMenu>
            </div>
            <div className="container">
                <div ></div>
                <Outlet></Outlet>
            </div>
            <div className="footer">footer</div>
        </div>

    )
}

export default App