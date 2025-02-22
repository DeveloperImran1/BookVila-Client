import axios from "axios";

const axiosPublic = axios.create({
  // baseURL: "https://book-vila-server.vercel.app",
  baseURL: "http://localhost:9000",
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
