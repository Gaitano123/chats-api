import React from "react";
import { useNavigate } from "react-router-dom";

function Home(){

    const navigate = useNavigate()

    return(
        <div>
            <button onClick={() =>navigate('/profile')} ><i class="fa-solid fa-user-check"></i> profile</button>
            {/* <i onClick={() =>navigate('/profile')} className="fa-regular fa-user"></i> */}
            <button onClick={() =>navigate('/users')} ><i class="fa-regular fa-user"></i> users</button>
            <button onClick={() =>navigate('/groups')} ><i class="fa-solid fa-users"></i> group</button>
        </div>
    )
}

export default Home