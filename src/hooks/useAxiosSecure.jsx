
import axios from 'axios';

 const axiosSecure = axios.create({
    baseURL: 'http://localhost:9000',
    headers: {
        Authorization: `Bearer ${localStorage?.getItem('token')}` 
    }
});

const useAxiosSecure = () => {
    return axiosSecure;
}

export default useAxiosSecure;