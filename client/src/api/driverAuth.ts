import api from "@/lib/axios";
import registrationAPI from "@/lib/registrationLib";
// Register User
export const registerUser = async (registrationInfo:any) => {
    try {
        const res = await registrationAPI.post('/driver/auth/register', registrationInfo);
        return await (res.data)
    } 
    catch (err:any) {
        const message = err.response?.data?.message || 'Failed to Register';
        throw new Error(message);  
    }
}

// Register User
export const loginUser = async (loginInfo:any) => {
    try {
        const res = await api.post('/driver/auth/login', loginInfo);
        return await (res.data)
    } 
    catch (err:any) {
        const message = err.response?.data?.message || 'Invalid Credentials | Try again.';
        throw new Error(message);  
    }
}