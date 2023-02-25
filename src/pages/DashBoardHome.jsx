import React, { useEffect, useState } from 'react';
import axios from 'axios';
import axiosInstance from '../api/axios';

const DashBoardHome = () => {

    const [dashboardSummary, setDashboardSummary] = useState([])

    const fetchDashboardSummary = async () => {
        await axiosInstance.get('/task/dashboardSummary')
            .then(
                res => {
                    console.log(res.data)
                    setDashboardSummary(res.data)

                }
            )
            .then(
                res => {

                    return res
                }
            )
            .catch(e => console.log(e))


    }
    useEffect(() => {
        fetchDashboardSummary()
        // dashboardSummary.map(task => {
        //     // if (task._id === 'new')
        //     console.log(task._id)
        //     localStorage.setItem(task._id, task.count)


        // })
    }, [])

    return (
        <div className='mx-auto'>
            <div className='d-flex'>
                {
                    dashboardSummary && dashboardSummary.map((task, i) =>
                        <div key={i} className="card mx-1 my-3" style={{ width: "15rem" }}>
                            <div className="card-body">
                                <h5 className="card-title">Total {task._id}</h5>
                                <h6 className="card-subtitle mb-2 text-muted">{task.count}</h6>

                            </div>
                        </div>)
                }
            </div>
        </div>
    );
};

export default DashBoardHome;