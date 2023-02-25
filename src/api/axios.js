import axios from "axios";

const accessToken = localStorage.getItem('accessToken');
const baseURL = process.env.REACT_APP_baseURL;

const axiosInstance = axios.create(
    {
        baseURL: baseURL,
        headers: {
            Authorization: `Bearer ${accessToken}`,
        }
    }
)
export default axiosInstance;