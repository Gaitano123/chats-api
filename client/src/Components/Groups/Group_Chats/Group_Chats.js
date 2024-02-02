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
        <div className='d-flex flex-column align-items-start d-flex min-vh-100 group-chat'>
            {chat}
            <Form />
        </div>
    )
}

export default GroupChat;