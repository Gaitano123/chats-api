import React from "react";
import Details from "./Details";

function Members({members, group }){

    const group_id = Number(localStorage.getItem('group_id'));

    if (!Array.isArray(members)) {
        console.error('members is not an array:', members);
        return null;
    }

    const data = members.filter((member) => member.group_id === group_id).map((member) => (
        <div className="profile-container" key={member.id}>
            <img className="profile-image" src={member.profile} alt="" />
            <a href="/" target="">@{member.member_name}</a>
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