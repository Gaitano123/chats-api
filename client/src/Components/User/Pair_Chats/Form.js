import React, { useState } from "react";

function Form({ onAddition }){

    const [chat, setChat] = useState("")
    
    function handleChange(e){
        setChat(e.target.value)
    }

    const receiver_id = Number(localStorage.getItem('receiver_id'));
    const user_id = Number(localStorage.getItem('user_id'))


    function handleSubmit(e){
        e.preventDefault();
        fetch('/api/pair-chats', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                chat: chat,           
                sender: user_id,
                receiver: receiver_id
            })
        })
        .then((res) => res.json())
      .then((data) => {
        onAddition(data);
      })
      .catch((error) => console.error('Error adding pair chat:', error));
      setChat("")
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