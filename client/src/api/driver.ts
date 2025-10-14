import api from "@/lib/axios";

// Fetch Driver Profile
export const fetchDriverProfileData = async (id:string) => {
    try {
        const res = await api.post(`/driver/profile`, {driverId: id})
        console.log(res);
        return await res.data
    } 
    catch (err:any) {
        const message = err.response?.data?.message || 'Failed to get Profile';
        throw new Error(message);  
    }
}
// Fetch All Driver Profiles
export const fetchAllDrivers = async () => {
    try {
        const res = await api.get(`/admin/drivers`)
        return await res.data
    } 
    catch (err:any) {
        const message = err.response?.data?.message || 'Failed to get Drivers';
        throw new Error(message);  
    }
}

// Fetch Active Orders
export const fetchActiveOrders = async () => {
    try {
        const res = await api.get('/driver/active-orders')
        return await res.data
    } 
    catch (err:any) {
        const message = err.response?.data?.message || 'Failed to fetch orders';
        throw new Error(message);  
    }
}

// Fetch Available Orders
export const fetchAvailableOrders = async () => {
    try {
        const res = await api.get('/driver/available-orders')
        return await res.data
    } 
    catch (err:any) {
        const message = err.response?.data?.message || 'Failed to fetch orders';
        throw new Error(message);  
    }
}

// Fetch Drivers Orders
export const fetchDriversOrders = async (driverId:string) => {
    try {
        const res = await api.get(`/driver/get-driver-orders/${driverId}`)
        return await res.data
    } 
    catch (err:any) {
        const message = err.response?.data?.message || 'Failed to fetch orders';
        throw new Error(message);  
    }
}
// Fetch Drivers Orders
export const clearDriverOrders = async (driverId:string) => {
    try {
        const res = await api.put(`/driver/clear-account/${driverId}`)
        return await res.data
    } 
    catch (err:any) {
        const message = err.response?.data?.message || 'Failed to fetch orders';
        throw new Error(message);  
    }
}

// Fetch Available Orders
export const fetchDriverOrders = async () => {
    try {
        const res = await api.get('/driver/orders')
        return await res.data
    } 
    catch (err:any) {
        const message = err.response?.data?.message || 'Failed to fetch orders';
        throw new Error(message);  
    }
}

// Driver Accept Order
export const driverAcceptJob = async (orderId:string) => {
    try {
        const res = await api.put('/driver/accept-order', {orderId: orderId})
        return await res.data
    } 
    catch (err:any) {
        const message = err.response?.data?.message || 'Failed to Accept Job';
        throw new Error(message);  
    }
}

// Driver Update Order Status
export const driverUpdateOrderStatus = async ({orderId, status}:{orderId:string, status:string}) => {
    try {
        const res = await api.put('/driver/update-order-status', {orderId, status})
        return await res.data
    } 
    catch (err:any) {
        const message = err.response?.data?.message || 'Failed to Accept Job';
        throw new Error(message);  
    }
}

// Driver Update Order Status
export const updateDriverStatus = async ({driverId, isActive}:{driverId:string, isActive:boolean}) => {
    try {
        const res = await api.put('/driver/update-driver-status', {driverId, isActive})
        return await res.data
    } 
    catch (err:any) {
        const message = err.response?.data?.message || 'Failed to Accept Job';
        throw new Error(message);  
    }
}
