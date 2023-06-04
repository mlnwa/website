import React ,{useState} from "react";
import "./App.css"
import { Outlet } from "react-router-dom";
const App = () => {
    return (
        <>
            <div className="container">
            
            </div>
            <div className="detail">
                <Outlet></Outlet>
            </div>
        </>

    )
}

export default App