import React from "react";
import { NavLink } from "react-router-dom";
import Details from "./Details";

function Members({members, group }){

    const group_id = Number(localStorage.getItem('group_id'));

    if (!Array.isArray(members)) {
        console.error('members is not an array:', members);
        return null;
    }

    function handleClick(id){

        console.log(id)

        const currentReceiverId = localStorage.getItem('receiver_id');
        console.log(currentReceiverId)

        if (id !== currentReceiverId) {
            localStorage.removeItem('receiver_id');
            localStorage.setItem('receiver_id', id);
            const data = Number(localStorage.getItem('receiver_id'));
            console.log(data);
        }
    }

    const data = members.filter((member) => member.group_id === group_id).map((member) => (
        <div className="profile-container" key={member.id} onClick={() => handleClick(member.member_id)}>
            <img className="profile-image" src={member.profile} alt="" />
            <NavLink to="/receiver">@{member.member_name}</NavLink>
            <p>{member.about}</p>
        </div>
    ))

    return(
        <div>
            <div>
                <Details group ={group} />
            </div>
            {data}
        </div>
    )
}

export default Members;