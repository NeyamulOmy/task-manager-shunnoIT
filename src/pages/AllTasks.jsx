import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/axios';
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllTasks } from '../components/tasks/allTasksSlice';
import { useNavigate } from 'react-router-dom';

const AllTasks = () => {
    const navigate = useNavigate()
    const baseURL = process.env.REACT_APP_baseURL;
    const handleUpdate = (e, id) => {
        e.preventDefault();

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
    const [toggleDependency, setToggleDependency] = useState(false)
    const { isLoading, allTasks, error } = useSelector(state => state.allTasks)
    const [selectTasks, setSelectTasks] = useState([allTasks])
    const dispatch = useDispatch();
    const [isFiltered, setIsFiltered] = useState(false)
    useEffect(() => {
        dispatch(fetchAllTasks());
    }, [toggleDependency])
    const handleFilter = e => {
        e.preventDefault()
        const startDate = e.target.startDate.value;
        const startDateMS = new Date(startDate).getTime()
        const endDate = e.target.endDate.value;
        const endDateMS = new Date(endDate).getTime()
        console.log(startDateMS, endDateMS)
        let timedTask = []
        allTasks.map(task => {
            const taskDate = new Date(task.createdAt).toLocaleDateString()
            const taskDateMS = new Date(taskDate).getTime()
            console.log(taskDateMS)
            if (taskDateMS >= startDateMS - 86400000 && taskDateMS <= endDateMS) {
                timedTask.push(task);
            }
        })
        console.log(timedTask)
        setSelectTasks(timedTask)
        setIsFiltered(true)
    }
    const handleDelete = (id) => {
        axiosInstance.delete(`${baseURL}/task/deleteTask/${id}`)
            .then(res => console.log(res.data))
            .catch(e => console.log(e))
        toggleDependency ? setToggleDependency(false) : setToggleDependency(true)
        alert('task deleted!')


    }
    return (
        <div className='mx-auto w-75'>
            <div className='mx-auto w-25'>
                <form action="" onSubmit={handleFilter} >
                    <label htmlFor="startDate">From</label>
                    <input type="date" id='startDate' className='form-control' />
                    <label htmlFor="endDate">To</label>
                    <input type='date' id='endDate' className='form-control' />
                    <input type='submit' className='mt-2' value='Filter' />
                </form>
            </div>
            <h1>All tasks</h1>

            <div className='mx-auto d-flex'>
                {isLoading && <h3>Loading...</h3>}
                {error && <h3>{error}</h3>}

                <div className='d-flex flex-wrap ms-5'>
                    {isFiltered ?
                        selectTasks.length ? selectTasks.map(
                            (task) => {
                                return (
                                    <div key={task._id} className="card mx-1 my-3" style={{ width: "15rem" }}>
                                        <div className="card-body">
                                            <h5 className="card-title">{task.title}</h5>
                                            <h6 className="card-subtitle mb-2 text-muted">{task.body}</h6>
                                            <p className='fs-6 text-warning'>{new Date(task.createdAt).toLocaleDateString()}</p>
                                            <form action="" onSubmit={(e) => { handleUpdate(e, task._id) }}>
                                                <select name="status" id="status">
                                                    <option defaultValue={task.status}>{task.status}</option>
                                                    <option value="new">new</option>
                                                    <option value="pending">pending</option>
                                                    <option value="complate">complete</option>
                                                    <option value="canceled">cancelled</option>
                                                </select>
                                                <br />
                                                <button className='mt-2' type='submit'>Update</button>
                                                <br />

                                            </form>
                                            <button className='mt-2' onClick={() => handleDelete(task._id)}>Delete</button>
                                        </div>
                                    </div>
                                )
                            }
                        )
                            : !isLoading && <h1>No Data</h1>

                        :

                        allTasks.length ? allTasks.map(
                            (task) => {
                                return (
                                    <div key={task._id} className="card mx-1 my-3" style={{ width: "15rem" }}>
                                        <div className="card-body">
                                            <h5 className="card-title">{task.title}</h5>
                                            <h6 className="card-subtitle mb-2 text-muted">{task.body}</h6>
                                            <p className='fs-6 text-warning'>{new Date(task.createdAt).toLocaleDateString()}</p>
                                            <form action="" onSubmit={(e) => { handleUpdate(e, task._id) }}>
                                                <select name="status" id="status">
                                                    <option defaultValue={task.status}>{task.status}</option>
                                                    <option value="new">new</option>
                                                    <option value="pending">pending</option>
                                                    <option value="complate">complete</option>
                                                    <option value="canceled">cancelled</option>
                                                </select>
                                                <br />
                                                <button className='mt-2' type='submit'>Update</button>
                                                <br />

                                            </form>
                                            <button className=' mt-2' onClick={() => handleDelete(task._id)}>Delete</button>
                                        </div>
                                    </div>
                                )
                            }
                        )
                            :
                            !isLoading && <h1>No data</h1>
                    }
                </div>



            </div >
        </div>
    );
};

export default AllTasks;