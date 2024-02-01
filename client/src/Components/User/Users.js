import React from "react";
import { useNavigate } from "react-router-dom";

function Users({ users }){

    const navigate = useNavigate()

    if (!Array.isArray(users)) {
        console.error('users is not an array:', users);
        return null; // or return an error message or handle it accordingly
    }

    function handleClick(id){
        const receiver_id = id

        localStorage.setItem('receiver_id', receiver_id)
        navigate('/pair-chats')
    }

    const user = users.map((profile) =>(
        <div className="profile-container" key={profile.id} onClick={() => handleClick(profile.id)}>
            <img className="profile-image" src={profile.profile} alt="the profile of the user" />
            <a href="/" target="">@{profile.username}</a>
            {/* <p>Phone Number: {profile.phone_no}</p>
            <p>First Name: {profile.first_name}</p>
            <p>Last Name: {profile.last_name}</p>
            <p>Full Name: {profile._full_name}</p>
            <p>About: {profile.about}</p>
            <p>Email: {profile.email}</p> */}
        </div>
    ))

    return(
        <div>
            {user}
        </div>
    )
}

export default Users;