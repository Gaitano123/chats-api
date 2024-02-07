import React from "react";
import { useNavigate, NavLink } from "react-router-dom";

function Users({ users }){

    const navigate = useNavigate()

    if (!Array.isArray(users)) {
        console.error('users is not an array:', users);
        return null; // or return an error message or handle it accordingly
    }

    function handleClick(id){

        const receiver_id = id
        console.log(receiver_id)

        localStorage.setItem('receiver_id', receiver_id)
        navigate('/pair-chats')
    }

    const user = users.map((profile) =>(
        <div key={profile.id} onClick={() => handleClick(profile.id)}>
            <img className="profile-image" src={profile.profile} alt="the profile of the user" />
            <a href="/receiver">@{profile.username}</a>
        </div>
    ))

    return(
        <div className="box">
            {user}
        </div>
    )
}

export default Users;