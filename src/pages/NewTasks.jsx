import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/axios';
import { useDispatch, useSelector } from 'react-redux'
import { fetchNewTasks } from '../components/tasks/newTasksSlice';

const NewTasks = () => {

    const baseURL = process.env.REACT_APP_baseURL;
    const handleUpdate = (e, id) => {
        e.preventDefault();
        currentStatus ? setCurrentStatus(false) : setCurrentStatus(true)
        const status = e.target.status.value;
        console.log(status)
        const updateTask = {
            status
        }
        axiosInstance.patch(`${baseURL}/task/updateTask/${id}`, updateTask)
            .then(res => console.log(res.data))
            .catch(e => console.log(e))
        alert('Task updated!')

    }

    const { isLoading, newTasks, error } = useSelector(state => state.newTasks)
    const [currentStatus, setCurrentStatus] = useState(false)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchNewTasks());
    }, [currentStatus])
    return (
        <div className='mx-auto'>
            <h1>New tasks</h1>
            <div className='mx-auto d-flex flex-wrap'>
                {isLoading && <h3>Loading...</h3>}
                {error && <h3>{error}</h3>}

                <div className='d-flex flex-wrap ms-5'>
                    {
                        newTasks && newTasks.map(
                            (newTask, i) => {
                                return (
                                    <div key={newTask._id} className="card mx-1 my-3" style={{ width: "15rem" }}>
                                        <div className="card-body">
                                            <h5 className="card-title">{newTask.title}</h5>
                                            <h6 className="card-subtitle mb-2 text-muted">{newTask.body}</h6>
                                            <form action="" onSubmit={(e) => { handleUpdate(e, newTask._id) }}>
                                                <select name="status" id="status">
                                                    <option defaultValue={newTask.status}>{newTask.status}</option>
                                                    <option value="new">new</option>
                                                    <option value="pending">pending</option>
                                                    <option value="complate">complete</option>
                                                    <option value="canceled">cancelled</option>
                                                </select>
                                                <br />
                                                <button className='mt-2' type='submit'>Update</button>
                                            </form>
                                        </div>
                                    </div>
                                )
                            }
                        )
                    }
                </div>



            </div >
        </div>
    );
};

export default NewTasks;