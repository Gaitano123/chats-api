import React from 'react';

function GeneralChat({ chatGeneral }){

    if (!Array.isArray(chatGeneral)) {
        console.error('chatGeneral is not an array:', chatGeneral);
        return null; // or return an error message or handle it accordingly
    }

    const chat = chatGeneral.map((chat) =>(
        <div key={chat.id}>
            <p>{chat.chat}</p>
            <p>{chat.sender_name}</p>
            <p>{chat.created_at}</p>
        </div>
    ))
    
    return(
        <div>
            {chat}
        </div>
    )
}

export default GeneralChat