import React from "react";
import { useNavigate } from "react-router-dom";

function Group({ groups }){

    const navigate = useNavigate()

    if (!Array.isArray(groups)) {
        console.error('groups is not an array:', groups);
        return null; // or return an error message or handle it accordingly
    }

    function handleClick(id){
        const group_id = id

        localStorage.setItem('group_id', group_id)

        navigate('/group-chats')
    }

    const group = groups.map((data) => (
        <div className="profile-container" key={data.id} onClick={() => handleClick(data.id)}>
            <img className="profile-image" src={data.profile} alt=""/>
            <a href="" target="">{data.name}</a>
        </div>
    ))

    return(
        <div>
            {group}
        </div>
    )
}

export default Group;