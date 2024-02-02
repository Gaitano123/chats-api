import React from "react";

function Profile({ profile }){

    return(
        <div className="d-flex flex-column mb-3 align-items-center justify-content-center prof-box">
            <img className="profile-photo p-2" src={profile.profile} alt="the profile of the user" />
            <div className="d-flex flex-row">
                <div className="prof-boxes">
                    <p><span className="text-uppercase fw-bold">First Name: </span>{profile.first_name}</p>
                    <p><span className="text-uppercase fw-bold">Full Name: </span>{profile._full_name}</p>
                    <p><span className="text-uppercase fw-bold">Phone Number: </span>{profile.phone_no}</p>
                </div>
                <div className="prof-boxes">
                    <p><span className="text-uppercase fw-bold">Last Name: </span>{profile.last_name}</p>
                    <p><span className="text-uppercase fw-bold">Username: </span><a href="/" target>@{profile.username}</a></p>
                    <p><span className="text-uppercase fw-bold">About: </span>{profile.about}</p>
                </div>
            </div>
            <p><span className="text-uppercase fw-bold">Email: </span>{profile.email}</p>
            <div>
                <button>
                    <i class="fa-solid fa-user-pen"></i>
                </button>
            </div>
        </div>
    )
}

export default Profile;