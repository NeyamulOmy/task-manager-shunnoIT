import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const baseURL = process.env.REACT_APP_baseURL;
    const navigate = useNavigate();
    const handleLogin = (e) => {
        console.log(baseURL)
        e.preventDefault();
        axios.post(`${baseURL}/user/loginUser`, {
            email,
            password
        })
            .then(function (response) {
                console.log(response.data);
                localStorage.setItem('userId', response.data.user._id)
                localStorage.setItem('email', response.data.user.email)
                localStorage.setItem('userName', response.data.user.userName)
                localStorage.setItem('phone', response.data.user.phone)
                localStorage.setItem('name', response.data.user.name)
                localStorage.setItem('accessToken', response.data.accessToken)
                navigate('../dashboard')

            })
            .catch(function (error) {
                console.log(error);
            });

    }
    useEffect(() => {
        if (localStorage.getItem('accessToken')) {
            navigate('/dashboard')
        }
    }, [])
    return (

        <div className='py-5'>
            <h3 className='pb-3'>Login</h3>
            <form className='w-25 mx-auto' onSubmit={handleLogin}>
                <div className="mb-3">
                    <label htmlFor="InputEmail" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="InputEmail" onChange={(e) => { setEmail(e.target.value) }} />


                </div>
                <div className="mb-3">
                    <label htmlFor="InputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="InputPassword1" onChange={(e) => { setPassword(e.target.value) }} />
                </div>
                <p><Link className='text-warning' to={'/forgot-password'}>Forgot password</Link></p>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
            <p>Don't have an account? <Link to={'/signup'}>Sign up</Link></p>
        </div>
    );
};
export default Login;