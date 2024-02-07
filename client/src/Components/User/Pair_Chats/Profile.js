import React from "react";
import { useNavigate } from "react-router-dom";

function ReceiverProfile({ user }){

    const navigate = useNavigate()

    return(
        <div onClick={() => navigate('/receiver')}>
            <img className="group_profile" src={user.profile} alt=""/>
            <a href="/" target="">~{user.username}</a>
        </div>
    )

}

export default ReceiverProfile
