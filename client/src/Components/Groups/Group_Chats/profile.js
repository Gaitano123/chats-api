import React, { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";

function GroupInfo(){

    const [data, setdata] = useState("")
    const navigate = useNavigate()

    const group_id = Number(localStorage.getItem('group_id'));

    function fetchdata(){
        fetch(`/api/group/${group_id}`)
        .then((res) =>{
            if(!res.ok){
              throw new Error(`failed to fetch chats: ${res.statusText}`)
            }
            return res.json();
        })
        .then((group) =>{
          setdata(group)
        })
        .catch((err) => {
          console.error('Error fetching chats:', err)
        });     
    }

    useEffect(() => {
        fetchdata();
    }, [])

    return(
        <div className="" onClick={() => navigate('/group-members')}>
            <img src={data.profile} alt=""/>
            <a href="/" target="">{data.name}</a>
        </div>
    )
}


export default GroupInfo
