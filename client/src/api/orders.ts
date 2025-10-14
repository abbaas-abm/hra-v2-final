import api from "@/lib/axios";
import type {  Order, OrderRequest, OrderResponse } from "@/types";


// Create new Idea |    POST
export const createOrder = async (order:OrderRequest):Promise<OrderResponse> => {
    const res = await api.post('/api/orders', order);
    return (res.data as OrderResponse)
}


// Fetch User Orders
export const fetchOrders =  async (userId:string):Promise<OrderResponse[]> => {
   const res = await api.get(`/api/orders/${userId}`);
   return res.data
};

// Fetch Sinle Order
export const fetchOrder = async (orderId:string):Promise<Order> => {
    const res = api.get(`/api/user/order/${orderId}`);
    return (await res).data as Order;
}

// {
//     paymentMethod,
//     userId
//     addressDetails,
//     deliveryDetails,
//     personalDetails,
//     costs,
//     tripDetails,
//   }

