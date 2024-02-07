import React from "react";
import { useNavigate } from "react-router-dom";

function LandPg(){

    const navigate = useNavigate()

    return(
        <div className="d-flex align-items-center justify-content-center vh-100 ">
            <div className="land-bx">
                <button className="btn m-5 lnd-btn text-uppercase" onClick={() => navigate('/signup')}>signup</button>
                <button className="btn m-5 lnd-btn text-uppercase" onClick={() => navigate('/login')}>login</button>
            </div>
        </div>
    )
}

export default LandPg;