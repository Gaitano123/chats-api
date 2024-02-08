import React from 'react';
import Form from './Form';
import ReceiverProfile from './Profile';

function PairChat({ ChatsPair, onAddition, user }){

    if (!Array.isArray(ChatsPair)) {
        console.error('ChatsPair is not an array:', ChatsPair);
        return null; // or return an error message or handle it accordingly
    }

    const receiver_id = Number(localStorage.getItem('receiver_id'));
    const user_id = Number(localStorage.getItem('user_id'))

    const filteredChats = ChatsPair.filter((chat) => (chat.sender === user_id && chat.receiver === receiver_id) || (chat.sender === receiver_id && chat.receiver === user_id) )


const chat = filteredChats.map((chat) => (
        <div  className='chat-box2' key={chat.id}>
            <p>{chat.chat}</p>
            <p>{chat.created_at}</p>
        </div>
    ))
    
    return(
        <div className='min-vh-100 group-chat'>
            <div className='ginfo'>
                <ReceiverProfile user={user} />
            </div>
            <div className='chat-scnt'>
                {chat}
            </div>
            <div className='finfo'>
                <Form onAddition={onAddition} />
            </div>
        </div>
    )
}

export default PairChat;