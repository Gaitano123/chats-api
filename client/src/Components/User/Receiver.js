import React from "react";


function Receiver({ user }){
    return(
        <div className="d-flex flex-column mb-3 align-items-center justify-content-center prof-box">
            <img className="profile-photo p-2" src={user.profile} alt="the profile of the user" />
            <div className="d-flex flex-row">
                <div className="prof-boxes">
                    <p><span className="text-uppercase fw-bold">First Name: </span>{user.first_name}</p>
                    <p><span className="text-uppercase fw-bold">Full Name: </span>{user._full_name}</p>
                    <p><span className="text-uppercase fw-bold">Phone Number: </span>{user.phone_no}</p>
                </div>
                <div className="prof-boxes">
                    <p><span className="text-uppercase fw-bold">Last Name: </span>{user.last_name}</p>
                    <p><span className="text-uppercase fw-bold">Username: </span><a href="/" target>@{user.username}</a></p>
                    <p><span className="text-uppercase fw-bold">About: </span>{user.about}</p>
                </div>
            </div>
            <p><span className="text-uppercase fw-bold">Email: </span>{user.email}</p>
            <div>
                <button>
                    <i class="fa-solid fa-user-pen"></i>
                </button>
            </div>
        </div>
    )
}


export default Receiver;
