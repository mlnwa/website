import React ,{useState} from "react";
import "./App.css"
import { Outlet, useLocation } from "react-router-dom";
import NavMenu from "./components/NavMenu/NavMenu";
import Footer from "./components/Footer/Footer";
const App = () => {
    return (
        <div className="main">
            <div className="header-nav">
                <NavMenu ></NavMenu>
            </div>
            <div className="body">
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>

    )
}

export default App