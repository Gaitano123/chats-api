import React from "react";
import { useNavigate } from "react-router-dom";

function GroupInfo({ group }){

    const navigate = useNavigate()

    return(
        <div onClick={() => navigate('/group-members')}>
            <img className="group_profile" src={group.profile} alt=""/>
            <a href="/" target="">~{group.name}</a>
        </div>
    )
}


export default GroupInfo
