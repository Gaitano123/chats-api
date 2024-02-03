import React from "react";
import { useNavigate } from "react-router-dom";


function Receiver({ user }){

    const navigate = useNavigate()

    return(
        <div className="d-flex flex-column mb-3 align-items-center justify-content-center prof-box">
            <img className="receiver-photo p-2" src={user.profile} alt="the profile of the user" />
            <p><span className="text-uppercase fw-bold">Username: </span><a href="/" target>@{user.username}</a></p>
            <p><span className="text-uppercase fw-bold">About: </span>{user.about}</p>
            <div className="d-flex flex-row">
                <div className="prof-boxes">
                    <p><span className="text-uppercase fw-bold">Phone Number: </span>{user.phone_no}</p>
                </div>
                <div className="prof-boxes">
                    <p><span className="text-uppercase fw-bold">Email: </span>{user.email}</p>
                </div>
            </div>
            <div onClick={() => navigate('/pair-chats')}>
                <i class="fa-solid fa-message"></i>
            </div>
        </div>
    )
}


export default Receiver;
