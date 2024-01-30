import React from 'react';

function GroupChat({ ChatsGroup }){

    if (!Array.isArray(ChatsGroup)) {
        console.error('ChatsGroup is not an array:', ChatsGroup);
        return null; // or return an error message or handle it accordingly
    }

    const chat = ChatsGroup.map((chat) =>(
        <div key={chat.id}>
            <p>{chat.group_name}</p>
            <p>{chat.sender_name}</p>
            <p>{chat.chat}</p>
            <p>{chat.created_at}</p>
        </div>
    ))
    
    return(
        <div>
            <h1>group_chats</h1>
            {chat}
        </div>
    )
}

export default GroupChat;