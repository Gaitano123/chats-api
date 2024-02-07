import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login(){

    const navigate = useNavigate()

    const [inputs, setInputs] = useState({
        username: "",
        password: ""
    })

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

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
        .then((res) => {
            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
            return res.json();
        })        
        .then((data) => {
            console.log(data);
            const user_id = data.id

            localStorage.setItem('user_id', user_id)
            navigate('/home')
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('Login failed. Please check your username and password.');
        });
    }

    function handleClick(e){
        e.preventDefault()

        if ( inputs.username && inputs.password){
            fetchLogin()
        }
        else{
            alert('Please fill in all required fields.')
        }
    }

    return(
        <div className="d-flex align-items-center justify-content-center min-vh-100">
            <form className="form sign-bx" onSubmit={handleClick}>
                <div className="form-floating mb-3 m-2">
                    <input className="form-control" id="floatingInput" type="text" name="username" value={inputs.username} onChange={handleChange} placeholder="username"  />
                    <label>Username</label>
                </div>
                <div className="pass-box">
                    <div className="form-floating mb-3">
                        <input onChange={handleChange} className="form-control xox" id="floatingInput" type={showPassword ? "text" : "password"} name="password" placeholder="" />
                        <label>
                            Password
                        </label>
                    </div>
                    <button
                        type="button"
                        className="password"
                        onClick={togglePasswordVisibility}
                        >
                        {showPassword ? <i class="fa-solid fa-lock-open"></i> : <i class="fa-solid fa-lock"></i>}
                    </button>
                </div>
                <button className="btn lnd-btn text-uppercase" type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login