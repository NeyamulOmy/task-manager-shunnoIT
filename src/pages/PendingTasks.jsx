import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/axios';
import { useDispatch, useSelector } from 'react-redux'
import { fetchPendingTasks } from '../components/tasks/pendingTasksSlice';

const PendingTasks = () => {

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

    const { isLoading, pendingTasks, error } = useSelector(state => state.pendingTasks)
    const [currentStatus, setCurrentStatus] = useState(false)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchPendingTasks());
    }, [currentStatus])
    return (
        <div className='mx-auto'>
            <h1>Pending tasks</h1>
            <div className='mx-auto d-flex flex-wrap'>
                {isLoading && <h3>Loading...</h3>}
                {error && <h3>{error}</h3>}

                <div className='d-flex flex-wrap ms-5'>
                    {
                        pendingTasks && pendingTasks.map(
                            (pendingTask, i) => {
                                return (
                                    <div key={pendingTask._id} className="card mx-1 my-3" style={{ width: "15rem" }}>
                                        <div className="card-body">
                                            <h5 className="card-title">{pendingTask.title}</h5>
                                            <h6 className="card-subtitle mb-2 text-muted">{pendingTask.body}</h6>
                                            <form action="" onSubmit={(e) => { handleUpdate(e, pendingTask._id) }}>
                                                <select name="status" id="status">
                                                    <option defaultValue={pendingTask.status}>{pendingTask.status}</option>
                                                    <option value="new">new</option>
                                                    <option value="pending">pending</option>
                                                    <option value="complete">complete</option>
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

export default PendingTasks;