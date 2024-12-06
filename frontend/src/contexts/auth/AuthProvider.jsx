import React, { useEffect, useState } from 'react';
import AuthContext from './AuthContext';
import { getToken,getUser } from '@/helpers';

const AuthProvider = ({children}) => {

    const [auth,setAuth] = useState({
        access_token:getToken() || null,
        user: getUser()
    })


    const contextValue = {
        auth,
        setAuth
    }

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;
