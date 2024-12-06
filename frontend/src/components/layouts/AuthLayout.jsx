import React, {Suspense } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';
import Loader from '@/components/Include/Loader';


const Component = () => {

  return (
    <div className="">
      {/* <Loader/> */}
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </div>
  );
};

const AuthLayout = () => {

  const { auth } = useAuth()

  return auth?.user ? <Component /> : <Navigate to="/login" />
}

export default AuthLayout;
