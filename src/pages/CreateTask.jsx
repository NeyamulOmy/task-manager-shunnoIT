import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import axiosInstance from '../api/axios';

const CreateTask = () => {
    const navigate = useNavigate();
    const baseURL = process.env.REACT_APP_baseURL
    const handleAddTask = e => {
        e.preventDefault();
        const form = e.target;
        const title = form.title.value;
        const body = form.details.value;
        const newTask = {
            title,
            body
        }
        console.log(newTask)
        axiosInstance.post(`${baseURL}/task/createTask`, {
            title,
            body
        })
            .then(function (response) {
                console.log(response.data);


            })
            .catch(function (error) {
                console.log(error);
            });
        alert('New task created!');
        navigate('/dashboard')
    }
    return (
        <div className='py-5 mx-auto'>
            <h3 className='pb-3'>Add new task</h3>
            <form onSubmit={handleAddTask} className='' >
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" />

                </div>
                <div className="mb-3">
                    <label htmlFor="details" className="form-label">Details</label>
                    <input type="text" className="form-control" id="details" />
                </div>

                <button type="submit" className="btn btn-primary">Add task</button>
            </form>

        </div>
    );
};

export default CreateTask;