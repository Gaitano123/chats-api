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
        <div className="form-chat">
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <input  type="text" className="" aria-describedby="button-addon2" name="chat" value={chat} onChange={handleChange} />
                    <button class="btn btn-outline-secondary" type="button" id="button-addon2"><i type="submit" className="" class="fa-solid fa-paper-plane"></i></button>
                </div>
            </form>
        </div>
    )
}

export default Form;

