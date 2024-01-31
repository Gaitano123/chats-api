import React from 'react';
import Form from './Form';
import Delete from './Delete';

function GroupChat({ ChatsGroup, onDelete }){

    if (!Array.isArray(ChatsGroup)) {
        console.error('ChatsGroup is not an array:', ChatsGroup);
        return null; // or return an error message or handle it accordingly
    }
    const group_id = Number(localStorage.getItem('group_id'))

    const filteredChats = ChatsGroup.filter((message) => message.group_id === group_id)

    const chat = filteredChats.map((chat) =>(
        <div key={chat.id}>
            <p>{chat.sender_name}</p>
            <p>{chat.chat}</p>
            <p>{chat.created_at}</p>
            <Delete id ={chat.id} onDelete = {onDelete}/>
        </div>
    ))
    
    return(
        <div>
            {chat}
            <Form />
        </div>
    )
}

export default GroupChat;