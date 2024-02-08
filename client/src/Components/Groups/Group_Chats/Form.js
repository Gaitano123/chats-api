import React, { useState } from "react";

function Form({ addGroupChat }){

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
        .then((res) => res.json())
        .then((data) => {
            addGroupChat(data);
        })
        .catch((error) => console.error('Error adding pair chat:', error));
        setChat("")
    }

    return(
        <div className="form-chat">
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <textarea  type="text" aria-describedby="button-addon2" name="chat" value={chat} onChange={handleChange} />
                    <button class="btn btn-outline-secondary" type="submit" id="button-addon2"><i className="" class="fa-solid fa-paper-plane"></i></button>
                </div>
            </form>
            
        </div>
    )
}

export default Form;

