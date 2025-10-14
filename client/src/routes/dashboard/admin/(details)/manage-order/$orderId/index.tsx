import { driverUpdateOrderStatus } from '@/api/driver';
import { fetchOrder } from '@/api/orders';
import { queryOptions, useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react';
import { FaMapMarkerAlt, FaBox, FaPhone,  FaRoad, FaCheckCircle, FaTimesCircle, FaMoneyBill } from 'react-icons/fa';
import { toast } from 'sonner';

const orderDetailsQueryOptions = (orderId:string) => queryOptions({
  queryKey: ['order-details'],
  queryFn: () => fetchOrder(orderId)
})


export const Route = createFileRoute('/dashboard/admin/(details)/manage-order/$orderId/')({
    head: () => ({
        meta: [
            {title: 'Driver | Manage Order'}
        ]
    }),
    component: ManageOrderPage,
     loader: async ({params, context : {queryClient}})=> {
      return queryClient.ensureQueryData(orderDetailsQueryOptions(params.orderId))
  }
})


function ManageOrderPage() {
  const {orderId} = Route.useParams();
  const queryClient = useQueryClient();
  const {data:deliveryData} = useSuspenseQuery(orderDetailsQueryOptions(orderId));

  const [status, setStatus] = useState(deliveryData?.status);

  
    const {mutateAsync, isPending:statusUpdating} =  useMutation({
      mutationKey: ['order-status-update'],
      mutationFn: driverUpdateOrderStatus,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['order-details'] });
        toast.success('Delivery Status Updated!')
      }
    })
  

  const handleStatusChange = (e:any) => {
    setStatus(e.target.value);
  };

  const handleSave = async () => {
    await mutateAsync({
      orderId: orderId,
      status
    })
  };

  return (
    <div className="min-h-screen sm:w-full md:min-w-[1000px] p-4 bg-gradient-to-b from-yellow-50 to-white font-sans">
      <div className="w-full p-4 sm:p-8">
        {/* Status Update Form */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-yellow-200">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Update Delivery Status</h2>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <select
              value={status}
              onChange={handleStatusChange}
              className="w-full sm:w-auto flex-grow p-3 rounded-xl border border-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-white text-gray-900 transition-all duration-300"
            >
              <option value="order-placed">Order Placed</option>
              <option value="out-for-pickup">Out for Pickup</option>
              <option value="out-for-dropoff">Out for Dropoff</option>
              <option value="completed">Completed</option>
            </select>
            <button
              onClick={handleSave}
              className={`w-full sm:w-auto ${statusUpdating ? `bg-gray-500 cursor-not-allowed` : `bg-yellow-500 hover:bg-yellow-600 cursor-pointer`} text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300`}
              disabled={statusUpdating}
            >
              {statusUpdating ? 'Updating' : 'Save Status'}
            </button>
          </div>
        </div>

        {/* Delivery Information */}
        <div className="bg-white rounded-2xl shadow-xl p-6 border border-yellow-200">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-6">Manage Order</h1>

          {/* Driver Payment Status */}
          <div className="flex items-center mb-6">
            <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${deliveryData?.driverPaid ? `bg-green-100 text-green-800` : `bg-red-100 text-red-800`} transition-all duration-300`}>
              {deliveryData?.driverPaid ? (
                <>
                  <FaCheckCircle className="mr-2" /> Paid
                </>
              ) : (
                <>
                  <FaTimesCircle className="mr-2" /> Unpaid
                </>
              )}
            </span>
          </div>

          {/* Address Details */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 flex items-center mb-3">
              <FaMapMarkerAlt className="mr-2 text-yellow-500" /> Address
            </h3>
            <p className="text-gray-700">Pickup: {deliveryData?.addressDetails.pickup}</p>
            <p className="text-gray-700">Dropoff: {deliveryData?.addressDetails.dropoff}</p>
          </div>

          {/* Delivery Details */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 flex items-center mb-3">
              <FaBox className="mr-2 text-yellow-500" /> Delivery Details
            </h3>
            <p className="text-gray-700">Date: {deliveryData?.deliveryDetails.pickupDate}</p>
            <p className="text-gray-700">Time: {deliveryData?.deliveryDetails.pickupTime}</p>
            <p className="text-gray-700">Stairs: {deliveryData?.deliveryDetails.stairs}</p>
            <p className="text-gray-700">Items:</p>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              {deliveryData?.deliveryDetails.items.map((item) => (
                <li key={item.id}>
                  {item.name} (Weight: {item.weight}kg, Quantity: {item.quantity})
                </li>
              ))}
            </ul>
          </div>

          {/* Personal Details */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 flex items-center mb-3">
              <FaPhone className="mr-2 text-yellow-500" /> Contact
            </h3>
            <p className="text-gray-700">Name: {deliveryData?.personalDetails.firstname} {deliveryData?.personalDetails.lastname}</p>
            <p className="text-gray-700">Email: {deliveryData?.personalDetails.email}</p>
            <p className="text-gray-700">Mobile: {deliveryData?.personalDetails.mobile}</p>
            <p className="text-gray-700">Message: {deliveryData?.personalDetails.message}</p>
          </div>

          {/* Costs */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 flex items-center mb-3">
              <FaMoneyBill className="mr-2 text-yellow-500" /> Earnings
            </h3>
            <p className="text-gray-700">R {+((deliveryData?.costs?.total ?? 0) * 0.75).toFixed(2)}</p>
          </div>

          {/* Trip Details */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 flex items-center mb-3">
              <FaRoad className="mr-2 text-yellow-500" /> Trip Details
            </h3>
            <p className="text-gray-700">Distance: {deliveryData?.tripDetails.distance}</p>
            <p className="text-gray-700">Duration: {deliveryData?.tripDetails.duration}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
