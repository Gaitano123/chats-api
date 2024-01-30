import React from 'react';

function PairChat({ ChatsPair}){

    if (!Array.isArray(ChatsPair)) {
        console.error('ChatsPair is not an array:', ChatsPair);
        return null; // or return an error message or handle it accordingly
    }

    const chat = ChatsPair.map((chat) => (
        <div key={chat.id}>
            <p>{chat.chat}</p>
            <p>{chat.sender_name}</p>
            <p>{chat.receiver_name}</p>
            <p>{chat.created_at}</p>
        </div>
    ))
    
    return(
        <div>
            <h1>pair chats</h1>
            {chat}
        </div>
    )
}

export default PairChat;