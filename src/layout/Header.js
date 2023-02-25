import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    const handleLogout = () => {
        localStorage.clear()
    }
    return (
        <div className=' text-bg-primary d-flex justify-content-around p-3'>
            <div><Link to={'/'} className='text-light fs-4 text-decoration-none'>Task Manager</Link></div>
            {
                localStorage.getItem('accessToken') &&
                <div className='d-flex'>

                    <div><Link to='/dashboard' className='text-light fs-5 mx-3 text-decoration-none'>Dashboard</Link></div>
                    <div><Link className='text-light fs-5 mx-3 text-decoration-none' onClick={handleLogout}>Log out</Link></div>

                    {/* <div><Link className='text-light fs-5 mx-3 text-decoration-none' to={'/signup'}>Sign up</Link></div> */}
                </div>}
        </div>
    );
};

export default Header;