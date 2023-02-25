import React from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axios';

const ChangePassword = () => {
    const baseURL = process.env.REACT_APP_baseURL;
    const navigate = useNavigate()
    const handleChangePassword = e => {
        e.preventDefault();
        const form = e.target;
        const previousPassword = form.previousPassword.value;
        const newPassword = form.newPassword.value;
        const email = localStorage.getItem('email');
        const updatedPassword = {
            previousPassword,
            newPassword,
            email
        }
        axiosInstance.put(`${baseURL}/user/changePassword`, updatedPassword)
            .then(res => console.log(res.data))
            .catch(e => console.log(e))
        alert('password updated successfully!')
        localStorage.clear()
        navigate('/login')
    }
    return (
        <div className='min-vh-100 min-vw-100'>
            <form className='mx-auto w-50' onSubmit={handleChangePassword}>
                <div className="mb-3">
                    <label htmlFor="previousPassword" className="form-label">Previous password</label>
                    <input type="password" className="form-control" id="previousPassword" />

                </div>
                <div className="mb-3">
                    <label htmlFor="newPassword" className="form-label">New password</label>
                    <input type="password" className="form-control" id="newPassword" />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
};

export default ChangePassword;