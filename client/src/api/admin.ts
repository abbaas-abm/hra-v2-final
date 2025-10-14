import api from "@/lib/axios";
import type {Order, OrderResponse } from "@/types";

// Fetch User Orders
export const fetchAllOrders =  async ():Promise<Order[]> => {
   const res = await api.get(`/api/orders/`);
   return (res.data as Order[])
};

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
