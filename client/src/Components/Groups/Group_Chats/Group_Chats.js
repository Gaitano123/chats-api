import React, { useEffect, useState } from "react";
import Form from './Form';
import Delete from './Delete';
import GroupInfo from './profile';

function GroupChat({ ChatsGroup, onDelete, group, addGroupChat }){

    const [loading, setLoading] = useState(true)

    useEffect(() =>{
        window.scrollTo(0, 0);

        setTimeout(() => {
            setLoading(false);
        }, 3000)
    }, []);

    if (loading) {
        // Display a loading message or spinner while data is being fetched
        return <div className="text-center text-uppercase loading fs-1 fw-bolder">Loading<i class="fa-solid fa-spinner fa-spin-pulse"></i></div>;
    }

    if (!Array.isArray(ChatsGroup)) {
        console.error('ChatsGroup is not an array:', ChatsGroup);
        return null; // or return an error message or handle it accordingly
    }
    const group_id = Number(localStorage.getItem('group_id'))

    const filteredChats = ChatsGroup.filter((message) => message.group_id === group_id)

    function setFalse(){
        if(filteredChats.length > 0){
            setLoading(false)
        }
    }

    const chat = filteredChats.map((chat) =>(
        <div className='chat-box' key={chat.id}>
            <div className='user-sctn'>
                <a href='/'>@{chat.sender_name}</a>
            </div>
            <div className='ct-section'>
                <p>{chat.chat}  <Delete id ={chat.id} onDelete = {onDelete}/></p>
                <span>{chat.created_at}</span>
            </div>
        </div>
    ))

    return(
        <div className='min-vh-100 group-chat'>
            <div className="ginfo">
                <GroupInfo group ={group} />
            </div>
            <div className='chat-scnt'>
                {chat}
            </div>
            <div className='finfo'>
                <Form addGroupChat={addGroupChat} />
            </div>
        </div>
    )
}

export default GroupChat;