import axios from 'axios';
import React from 'react';
import axiosInstance from '../api/axios';

const Profile = () => {
    const baseURL = process.env.REACT_APP_baseURL;
    function encodeImageFileAsURL(e) {

        var file = e.target.files[0];
        var reader = new FileReader();
        reader.onloadend = function () {
            console.log('RESULT', reader.result)
            localStorage.setItem('photo', reader.result)
        }
        reader.readAsDataURL(file);
    }
    const handleUpdateProfile = e => {
        e.preventDefault()
        const update = {
            name: e.target.name.value,
            phone: e.target.phone.value,
            photo: localStorage.getItem('photo'),
            email: e.target.email.value

        }
        axiosInstance.patch(`${baseURL}/user/updateUser`, update)
            .then(res => console.log(res.data))
            .catch(e => console.log(e))
        alert('Profile updated successfully')
        localStorage.setItem('name', e.target.name.value,)
        localStorage.setItem('phone', e.target.phone.value,)
        localStorage.setItem('photo', e.target.photo.value,)

    }
    return (
        <div className='mx-auto my-5'>
            <form className='' onSubmit={handleUpdateProfile}>
                <div className="mb-3">
                    <img src={localStorage.getItem('photo')} alt='' />
                    <br />
                    <label htmlFor="profilePicture" className="form-label">Profile picture</label>
                    <input type="file" className="form-control" id="profilePicture" onChange={encodeImageFileAsURL} />
                    <label htmlFor="userName" className="form-label">Username</label>
                    <input disabled type="text" className="form-control" id="userName" defaultValue={localStorage.getItem('userName')} />
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" defaultValue={localStorage.getItem('name')} />
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input disabled type="email" className="form-control" id="email" defaultValue={localStorage.getItem('email')} />
                    <label htmlFor="phone" className="form-label">Phone No.</label>
                    <input type="tel" className="form-control" id="phone" defaultValue={localStorage.getItem('phone')} />

                </div>

                <button type="submit" className="btn btn-primary">Update</button>
            </form>
        </div>
    );
};

export default Profile;