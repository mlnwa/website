import React ,{useState} from "react";
import "./App.css"
import { Outlet } from "react-router-dom";
const App = () => {
    return (
        <>
            <div className="nav">

            </div>
            <div className="detail">
                <div className="content"></div>
                <Outlet></Outlet>
            </div>
        </>

    )
}

export default App