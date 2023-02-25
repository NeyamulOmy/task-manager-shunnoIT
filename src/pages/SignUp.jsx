import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignUp = () => {

    const baseURL = process.env.REACT_APP_baseURL;
    const navigate = useNavigate()
    const handleSignUp = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.InputName.value;
        const userName = form.InputUserName.value;
        const email = form.InputEmail.value;
        const phone = form.InputPhone.value;
        const password1 = form.InputPassword1.value;
        const password2 = form.InputPassword2.value;
        const phoneRegEx = /^(?:\+?88|0088)?01[3-9]\d{8}$/
        const result = phoneRegEx.test(phone);
        if (result) {

            if (password1 === password2) {
                const user = {
                    name,
                    userName,
                    email,
                    phone,
                    password: password1

                }
                axios.post(`${baseURL}/user/registrationUser`, user)
                    .then(function (response) {

                        alert('Account created successfullly')
                        console.log(response.data);
                        navigate('/login')

                    })
                    .catch(function (error) {
                        console.log(error);
                    });


            }
            else {
                alert('Passwords do not match');
            }
        }
        else {
            alert('Invalid phone number')
        }
    }
    return (
        <div className='py-5'>
            <h3 className='pb-3'>Sign up</h3>
            <form onSubmit={handleSignUp} className='w-25 mx-auto'>
                <div className="mb-3">
                    <label htmlFor="InputName" className="form-label">Name</label>
                    <input type="text" className="form-control" id="InputName" />

                </div>
                <div className="mb-3">
                    <label htmlFor="InputUserName" className="form-label">Username</label>
                    <input type="text" className="form-control" id="InputUserName" />

                </div>
                <div className="mb-3">
                    <label htmlFor="InputEmail" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="InputEmail" />

                </div>
                <div className="mb-3">
                    <label htmlFor="InputPhone" className="form-label">Phone No.</label>
                    <input type="tel" className="form-control" id="InputPhone" />

                </div>
                <div className="mb-3">
                    <label htmlFor="InputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="InputPassword1" />

                </div>
                <div className="mb-3">
                    <label htmlFor="InputPassword2" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" id="InputPassword2" />
                </div>

                <button type="submit" className="btn btn-primary">Sign up</button>
            </form>
            <p>Already have an account? <Link to='/'>Login</Link></p>
        </div>
    );
};

export default SignUp;