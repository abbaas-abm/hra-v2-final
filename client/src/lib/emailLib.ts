import axios from "axios";

const emailAPI = axios.create({
    baseURL: import.meta.env.VITE_API_URL,

});


export default emailAPI;