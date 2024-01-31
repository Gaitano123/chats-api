import React, { useState } from "react";

function SignUp(){

    const [inputs, setInputs] = useState({
        firstname: '',
        lastname: '',
        username: '',
        phonenumber: '',
        profile_photo: '',
        about: '',
        email: '',
        password: ''
    })

    function handleChange(e){
        const { name, value} = e.target;
        setInputs(prevInputs => ({
            ...prevInputs,
            [name]: value
        }));
    }

    function signUser(){
        fetch('/api/users', {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                first_name: inputs.firstname,
                last_name: inputs.lastname,
                username: inputs.username,
                phone_no: inputs.phonenumber,
                profile: inputs.profile_photo,
                about: inputs.about,
                email: inputs.email,
                password: inputs.password
            })
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data)
        })
    }

    function handleSubmit(e){
        e.preventDefault();
        signUser()
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>first name</label>
                    <input onChange={handleChange} type="text" name="firstname"/>
                </div>
                <div>
                    <label>last name</label>
                    <input onChange={handleChange} type="text" name="lastname"/>
                </div>
                <div>
                    <label>username</label>
                    <input onChange={handleChange} type="text" name="username"/>
                </div>
                <div>
                    <label>phone number</label>
                    <input onChange={handleChange} type="number" name="phonenumber"/>
                </div>
                <div>
                    <label>profile photo</label>
                    <input onChange={handleChange} type="text" name="profile_photo"/>
                </div>
                <div>
                    <label>about</label>
                    <input onChange={handleChange} type="text" name="about"/>
                </div>
                <div>
                    <label>email</label>
                    <input onChange={handleChange} type="text" name="email"/>
                </div>
                <div>
                    <label>password</label>
                    <input onChange={handleChange} type="password" name="password"/>
                </div>
                <button type="submit">signin</button>
            </form>
        </div>
    )
}

export default SignUp;