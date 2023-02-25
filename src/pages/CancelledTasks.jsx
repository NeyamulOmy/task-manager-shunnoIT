import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/axios';
import { useDispatch, useSelector } from 'react-redux'
import { fetchCancelledTasks } from '../components/tasks/cancelledTasksSlice';

const CompleteTasks = () => {

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

    const { isLoading, cancelledTasks, error } = useSelector(state => state.cancelledTasks)
    const [currentStatus, setCurrentStatus] = useState(false)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCancelledTasks());
    }, [currentStatus])
    return (
        <div className='mx-auto'>
            <h1>Cancelled tasks</h1>
            <div className='mx-auto d-flex flex-wrap'>
                {isLoading && <h3>Loading...</h3>}
                {error && <h3>{error}</h3>}

                <div className='d-flex flex-wrap ms-5'>
                    {
                        cancelledTasks && cancelledTasks.map(
                            (cancelledTask, i) => {
                                return (
                                    <div key={cancelledTask._id} className="card mx-1 my-3" style={{ width: "15rem" }}>
                                        <div className="card-body">
                                            <h5 className="card-title">{cancelledTask.title}</h5>
                                            <h6 className="card-subtitle mb-2 text-muted">{cancelledTask.body}</h6>
                                            <form action="" onSubmit={(e) => { handleUpdate(e, cancelledTask._id) }}>
                                                <select name="status" id="status">
                                                    <option defaultValue={cancelledTask.status}>{cancelledTask.status}</option>
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

export default CompleteTasks;