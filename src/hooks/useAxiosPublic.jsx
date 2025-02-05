import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://book-vila-server.vercel.app",
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
