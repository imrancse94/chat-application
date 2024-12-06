import {toast } from 'react-toastify';

const success = (message) => {
    return toast.success(message,{
        theme: "colored"
    })
}

const error = (message) => {
    return toast.error(message,{
        theme: "colored"
    })
}

export {
    success,
    error
}