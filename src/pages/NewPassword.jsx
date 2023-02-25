import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const NewPassword = () => {
    const navigate = useNavigate()
    const baseURL = process.env.REACT_APP_baseURL;
    const handleSubmit = e => {
        e.preventDefault()
        const newPassword = e.target.newPassword.value;
        const newPassword1 = e.target.newPassword1.value;
        const password = {
            email: localStorage.getItem('otpEmail'),
            otp: localStorage.getItem('otpCode'),
            password: newPassword
        }
        if (newPassword === newPassword1) {
            axios.post(`${baseURL}/user/passwordRecovery`, password)
                .then(res => console.log(res.data))
                .catch(e => console.log(e))
            alert('Password updated successfully')
            navigate('/login')
        }
    }
    return (
        <div className='min-vh-100'>
            <form className='mx-auto w-50' onSubmit={handleSubmit}>

                <div className="mb-3">
                    <label htmlFor="newPassword" className="form-label">New password</label>
                    <input type="password" className="form-control" id="newPassword" />
                </div>
                <div className="mb-3">
                    <label htmlFor="newPassword1" className="form-label">Confirm password</label>
                    <input type="password" className="form-control" id="newPassword1" />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
};

export default NewPassword;