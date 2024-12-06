import { lazy } from 'react';

const AuthLayout = lazy(() => import('@/components/layouts/AuthLayout'));
const Chat = lazy(() => import('@/pages/Auth/Chat/Index'));

const auth = {
    path: '/',
    element: <AuthLayout />,
    children: [
        {
            path: 'chat',
            element: <Chat/>,
            // index:true
        },
    ]

}

export default auth;