import { useParams as params } from 'react-router-dom';

const useParams = () => {
    const param = params()

    return param;
}

export default useParams;