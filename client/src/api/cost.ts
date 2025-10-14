import api from "@/lib/axios";
import type { Cost, DeliveryRequest } from "@/types";


// Create new Idea |    POST
export const getCost = async (cost:Cost):Promise<DeliveryRequest> => {
    const res = await api.post('/api/cost', cost);
    return (res.data as DeliveryRequest)
}