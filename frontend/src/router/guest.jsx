import { lazy } from 'react';

const GuestLayout = lazy(() => import('@/components/layouts/GuestLayout'));

const Register = lazy(() => import('@/pages/Guest/Register'));
const Login = lazy(() => import('@/pages/Guest/Login'));


const guest = {
    path: '/',
    element: <GuestLayout />,
    children: [
        {
            path: 'login',
            element: <Login />,
            index:true
        },
        {
            path: 'signup',
            element: <Register />
        }
    ]
}

export default guest;