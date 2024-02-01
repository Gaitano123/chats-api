import React, { useState } from "react";

function Form(){

    const [chat, setChat] = useState("")
    
    function handleChange(e){
        setChat(e.target.value)
    }

    const user_id = Number(localStorage.getItem('user_id'))
    const group_id = Number(localStorage.getItem('group_id'))


    function handleSubmit(e){
        e.preventDefault();
        fetch('/api/group-chats', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                group_id: group_id,
                sender: user_id,
                chat: chat            
            })
        })
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" name="chat" value={chat} onChange={handleChange} />
                <button type="submit">send</button>
            </form>
        </div>
    )
}

export default Form;