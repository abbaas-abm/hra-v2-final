import api from "@/lib/axios";


// Register User
export const loginAdmin = async (loginInfo:{
    email:string,
    password:string
}) => {
    try {
        const res = await api.post('/admin/auth/login', loginInfo);
        return await (res.data)
    } 
    catch (err:any) {
        const message = err.response?.data?.message || 'Invalid Credentials | Try Again.';
        throw new Error(message);  
    }
}