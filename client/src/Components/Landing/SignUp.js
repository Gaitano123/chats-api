import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUp(){

    const navigate = useNavigate()

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

        if (inputs.firstname && inputs.lastname && inputs.username && inputs.phonenumber && inputs.email && inputs.password){
            signUser()
            navigate('/login')
        }
        else{
            alert('Please fill in all required fields.')
        }


    }

    return(
        <div className="d-flex align-items-center justify-content-center min-vh-100">
            <form className="form sign-bx" onSubmit={handleSubmit}>
                <div className="d-flex justify-content-center">
                    <div className="form-floating mb-3 m-2">
                        <input onChange={handleChange} className="form-control" id="floatingInput" type="text" name="firstname" placeholder="first name"/>
                        <label for="floatingInput">First Name</label>
                    </div>
                    <div className="form-floating mb-3 m-2">
                        <input onChange={handleChange} className="form-control" id="floatingInput" type="text" name="lastname" placeholder="last name" />
                        <label>Last Name</label>
                    </div>
                </div>
                <div className="d-flex justify-content-center">
                    <div className="form-floating mb-3 m-2">
                        <input onChange={handleChange} className="form-control" id="floatingInput" type="text" name="username" placeholder="username" />
                        <label>Username</label>
                    </div>
                    <div className="form-floating mb-3 m-2">
                        <input onChange={handleChange} className="form-control" id="floatingInput" type="number" name="phonenumber" placeholder="phone number" />
                        <label>Phone Number</label>
                    </div>
                </div>
                <div className="form-floating mb-3 m-2">
                    <input onChange={handleChange} className="form-control" id="floatingInput" type="text" name="profile_photo" placeholder="" />
                    <label>Profile Photo</label>
                </div>
                <div  className="d-flex justify-content-center">
                    <div className="form-floating mb-3 m-2">
                        <input onChange={handleChange} className="form-control" id="floatingInput" type="text" name="about" placeholder="" />
                        <label>About</label>
                    </div>
                    <div className="form-floating mb-3 m-2">
                        <input onChange={handleChange} className="form-control" id="floatingInput" type="text" name="email" placeholder="" />
                        <label>Email</label>
                    </div>
                </div>
                <div className="pass-box">
                    <div className="form-floating mb-3 ">
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
                <button className="btn lnd-btn text-uppercase" type="submit">signup</button>
            </form>
        </div>
    )
}

export default SignUp;