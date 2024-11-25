
import axios from 'axios';

 const axiosSecure = axios.create({
    baseURL: 'https://book-vila-server.vercel.app',
    headers: {
        Authorization: `Bearer ${localStorage?.getItem('token')}` 
    }
});

const useAxiosSecure = () => {
    return axiosSecure;
}

export default useAxiosSecure;