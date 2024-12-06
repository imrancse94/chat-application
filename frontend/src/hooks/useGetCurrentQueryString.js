
import { useSearchParams } from 'react-router-dom';

const useGetCurrentQueryString = () =>{
    let [searchParams] = useSearchParams()

    let queryString = "";

    searchParams.forEach((value,key)=>{
       if(queryString){
        queryString += `&${key}=${value}`
       }else{
        queryString = `?${key}=${value}`
       } 
    })

    return queryString;
}

export default useGetCurrentQueryString;