import emailAPI from "@/lib/emailLib";

// Storage Email
export const storageEmail = async (storageInfo:any) => {
    try {
        const res = await emailAPI.post('/email/storage', storageInfo);
        return await (res.data)
    } 
    catch (err:any) {
        const message = err.response?.data?.message || 'Failed to Send Storage Email';
        throw new Error(message);  
    }
}
// Fridge Rantal Email
export const fridgeRental = async (fridgeInfo:any) => {
    try {
        const res = await emailAPI.post('/email/fridge', fridgeInfo);
        return await (res.data)
    } 
    catch (err:any) {
        const message = err.response?.data?.message || 'Failed to Send Storage Email';
        throw new Error(message);  
    }
}
