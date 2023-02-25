import { createBrowserRouter } from 'react-router-dom'
import Main from '../layout/Main'
import DashBoard from '../layout/DashBoard';

import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import DashBoardHome from '../pages/DashBoardHome';
import CreateTask from '../pages/CreateTask';
import AllTasks from '../pages/AllTasks';
import NewTasks from '../pages/NewTasks';

import CancelledTasks from '../pages/CancelledTasks';
import CompleteTasks from '../pages/CompleteTasks';
import Profile from '../pages/Profile';
import Settings from '../pages/Settings';
import PrivateRoute from './PrivateRoute';
import PendingTasks from '../pages/PendingTasks';
import ForgetPass from '../pages/ForgetPass';
import VerifyOTP from '../pages/VerifyOTP';
import ChangePassword from '../pages/ChangePassword';
import NewPassword from '../pages/NewPassword';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Login></Login>
            },
            {
                path: '/signup',
                element: <SignUp></SignUp>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/forgot-password',
                element: <ForgetPass></ForgetPass>
            },
            {
                path: '/verifyOTP',
                element: <VerifyOTP></VerifyOTP>
            },
            {
                path: '/change-password',
                element: <ChangePassword></ChangePassword>
            },
            {
                path: '/new-password',
                element: <NewPassword></NewPassword>
            }

        ]
    },

    {
        path: '/dashboard',
        element: <PrivateRoute><DashBoard></DashBoard></PrivateRoute>,
        children: [
            {
                path: '/dashboard',
                element: <DashBoardHome></DashBoardHome>
            },
            {
                path: '/dashboard/create-task',
                element: <CreateTask></CreateTask>
            },
            {
                path: '/dashboard/all-task',
                element: <AllTasks></AllTasks>
            },
            {
                path: '/dashboard/new-task',
                element: <NewTasks></NewTasks>
            },
            {
                path: '/dashboard/pending-task',
                element: <PendingTasks></PendingTasks>
            },
            {
                path: '/dashboard/cancelled-task',
                element: <CancelledTasks></CancelledTasks>
            },
            {
                path: '/dashboard/complete-task',
                element: <CompleteTasks></CompleteTasks>
            },
            {
                path: '/dashboard/profile',
                element: <Profile></Profile>
            },
            {
                path: '/dashboard/settings',
                element: <Settings></Settings>
            },


        ]
    },


])

export default router;