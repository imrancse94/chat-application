
import { useRoutes } from 'react-router-dom';

import { Navigate } from 'react-router-dom';
import auth from './auth';
import guest from './guest';
import { lazy } from 'react';

const Page404 = lazy(()=>import('@/pages/error/page404'))

export default function Router() {
    return useRoutes([
        auth,
        guest,
        {
            path: '/404',
            element: <Page404/>
        },
        {
            path: '*',
            element: <Navigate to="/404" replace />
        }
    ])
}