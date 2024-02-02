import React from "react";

function Members({members}){

    const group_id = Number(localStorage.getItem('group_id'));

    if (!Array.isArray(members)) {
        console.error('members is not an array:', members);
        return null;
    }

    const data = members.filter((member) => member.group_id === group_id).map((member) => (
        <div key={member.id}>
            <p>{member.member_name}</p>
            <img src={member.profile} alt="" />
            <p>{member.about}</p>
        </div>
    ))

    return(
        <div>
            {data}
        </div>
    )
}

export default Members;