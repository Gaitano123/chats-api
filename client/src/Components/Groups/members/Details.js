import React from "react";

function Details({ group }){
    return(
        <div>
            <img src={group.profile} alt="" />
            <p>{group.name}</p>
            <p>{group.admin_name}</p>
            <p>{group.decription}</p>
        </div>
    )
}


export default Details
