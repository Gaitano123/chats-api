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
        <div key={data.id} onClick={() => handleClick(data.id)}>
            <p>{data.name}</p>
            <img src={data.profile} alt=""/>
            <p>{data.description}</p>
            <p>{data.admin_name}</p>
        </div>
    ))

    return(
        <div>
            {group}
        </div>
    )
}

export default Group;