import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const ForgetPass = () => {
    const baseURL = process.env.REACT_APP_baseURL;
    const navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        axios.get(`${baseURL}/user/sendOpt/${email}`)
            .then(res => res.data)
            .catch(e => console.log(e))
        localStorage.setItem('otpEmail', email)
        navigate('/verifyOTP')
    }
    return (
        <div className='min-vh-100'>
            <h2 className='my-5'>Reset password</h2>
            <form onSubmit={handleSubmit} action="" className=''>
                <label htmlFor="email" className="form-label fs-2">Email</label>
                <br />
                <input type='email' id='email' />
                <button type='submit'>Submit</button>
            </form>
        </div>
    );
};

export default ForgetPass;