import useAxios from '@/hooks/useAxios';
import { useEffect, useState } from 'react';

function wrapPromise(promise) {
    let status = "pending";
    let result;

    const s = promise.then(
        (value) => {
            status = "success";
            result = value;
        },
        (error) => {
            status = "error";
            result = error;
        }
    );

    return () => {
        switch (status) {
            case "pending":
                throw s;
            case "success":
                return result;
            case "error":
                throw result;
            default:
                throw new Error("Unknown status");
        }
    };
}


function useFetchData(endpoint) {

    const { api } = useAxios();
    const [resource, setResource] = useState(null);

    const fetcher = async () => {
        try {
            const promise = api.get(endpoint).then((response) => response.data);
            setResource(wrapPromise(promise));
        } catch (err) {

        }
    }

    useEffect(() => {
        fetcher();
    }, [endpoint]);

    return { resource, api };
}

export default useFetchData;