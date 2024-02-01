import React from "react";
import { useNavigate } from "react-router-dom";

function LandPg(){

    const navigate = useNavigate()

    return(
        <div className="d-flex align-items-center justify-content-center vh-100">
            <button className="btn btn-primary m-5" onClick={() => navigate('/signup')}>signup</button>
            <button className="btn btn-info m-5" onClick={() => navigate('/login')}>login</button>
        </div>
    )
}

export default LandPg;