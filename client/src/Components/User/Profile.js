import React from "react";

function Profile({ profile }){

    return(
        <div className="d-flex flex-column mb-3 align-items-center justify-content-center min-vh-100">
            <img className="profile-photo p-2" src={profile.profile} alt="the profile of the user" />
            <div className="d-flex justify-content-between p-2">
                <p><span className="text-uppercase fw-bold">First Name: </span>{profile.first_name}</p>
                <p><span className="text-uppercase fw-bold">Last Name: </span>{profile.last_name}</p>
            </div>
            <div className="d-flex justify-content-between p-2">
                <p><span className="text-uppercase fw-bold">Full Name: </span>{profile._full_name}</p>
                <p><span className="text-uppercase fw-bold">Username: </span><a href="" target>@{profile.username}</a></p>
            </div>
            <div className="d-flex justify-content-between p-2">
                <p><span className="text-uppercase fw-bold">Phone Number: </span>{profile.phone_no}</p>
                <p><span className="text-uppercase fw-bold">About: </span>{profile.about}</p>
            </div>
            <p><span className="text-uppercase fw-bold">Email: </span>{profile.email}</p>
        </div>
    )
}

export default Profile;