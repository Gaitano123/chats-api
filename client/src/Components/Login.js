import React, { useState } from "react";

function Login(){

    const [inputs, setInputs] = useState({
        username: "",
        password: ""
    })

    function handleChange(e){
        const { name, value} = e.target;
        setInputs(prevInputs => ({
            ...prevInputs,
            [name]: value
        }));
    }

    function fetchLogin(){
        fetch("/api/login",{
            method: "POST",
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: inputs.username,
                password: inputs.password
            })
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            const user_id = data.id

            localStorage.setItem('user_id', user_id)
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    function handleClick(e){
        e.preventDefault()
        fetchLogin()
    }

    return(
        <div>
            <form onSubmit={handleClick}>
                <div>
                    <label>username</label>
                    <input type="text" name="username" value={inputs.username} onChange={handleChange} />
                </div>
                <div>
                    <label>password</label>
                    <input type="password" name="password" value={inputs.password} onChange={handleChange} />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login