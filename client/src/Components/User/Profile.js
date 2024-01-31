import React from "react";

function Profile({ profile }){

    // if (!Array.isArray(profile)) {
    //     console.error('profile is not an array:', profile);
    //     return null; // or return an error message or handle it accordingly
    // }

    return(
        <div>
            <p>First Name: {profile.first_name}</p>
            <p>Last Name: {profile.last_name}</p>
            <p>Full Name: {profile._full_name}</p>
            <p>Username: {profile.username}</p>
            <p>Phone Number: {profile.phone_no}</p>
            <img src={profile.profile} alt="the profile of the user" />
            <p>About: {profile.about}</p>
            <p>Email: {profile.email}</p>
        </div>
    )
}

export default Profile;