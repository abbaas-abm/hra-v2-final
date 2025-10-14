import { driverAcceptJob } from '@/api/driver';
import { fetchOrder } from '@/api/orders';
import { queryOptions, useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute, Link } from '@tanstack/react-router'
import { FaMapMarkerAlt, FaBox, FaPhone, FaRoad,  FaMoneyBill, FaArrowAltCircleLeft } from 'react-icons/fa';
import { toast } from 'sonner';

const orderDetailsQueryOptions = (orderId:string) => queryOptions({
  queryKey: ['order-details'],
  queryFn: () => fetchOrder(orderId)
})

export const Route = createFileRoute('/dashboard/driver/order-details/$orderId/')({
  component: OrderDetailsPage,
  head: () => ({
    meta: [
      {title: 'Driver | Order Details'}
    ]
  }),
  loader: async ({params, context : {queryClient}})=> {
    return queryClient.ensureQueryData(orderDetailsQueryOptions(params.orderId))
  }
})

function OrderDetailsPage() {
  const {orderId} = Route.useParams();
  const queryClient = useQueryClient();

  const {data:deliveryData} = useSuspenseQuery(orderDetailsQueryOptions(orderId));

  
    const {mutateAsync, isPending:jobLoading} =  useMutation({
      mutationKey: ['accept-job'],
      mutationFn: driverAcceptJob,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['available-orders'] });
        queryClient.invalidateQueries({ queryKey: ['order-details'] });
        toast.success('Job Accepted, View under "Active Deliveries!"')
      }
    })
    
    const handleAcceptJob = async (id:string) => {
    await mutateAsync(id)
    }

   return (
     <div className="min-h-screen sm:w-full md:min-w-[1000px] p-4 bg-gradient-to-b from-yellow-50 to-white font-sans">
       <div className="w-full p-4 sm:p-8">
 
         {/* Delivery Information */}
         <div className="bg-white rounded-2xl shadow-xl p-6 border border-yellow-200">
          <Link 
          to='/dashboard/driver/new-deliveries'
          className='text-yellow-400 flex itex-center gap-3 underline font-semibold text-lg'
          ><FaArrowAltCircleLeft/> Go Back</Link>
           <h1 className="text-3xl font-extrabold text-gray-900 mb-6">Order Details</h1>
 
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
             <p className="text-gray-700">Pickup Date: {deliveryData?.deliveryDetails.pickupDate}</p>
             <p className="text-gray-700">Pickup Time: {deliveryData?.deliveryDetails.pickupTime}</p>
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
             <p className="text-gray-700">R {+((deliveryData?.costs.total ?? 0) * 0.75).toFixed(2)}</p>
           </div>
 
           {/* Trip Details */}
           <div>
             <h3 className="text-xl font-semibold text-gray-900 flex items-center mb-3">
               <FaRoad className="mr-2 text-yellow-500" /> Trip Details
             </h3>
             <p className="text-gray-700">Distance: {deliveryData?.tripDetails.distance}</p>
             <p className="text-gray-700">Duration: {deliveryData?.tripDetails.duration}</p>
           </div>

        {!deliveryData?.driver && <button 
        onClick={()=> handleAcceptJob(deliveryData._id)} 
        className={`w-full mt-3 cursor-pointer py-3 px-6 text-lg font-bold rounded-full transition-all duration-300 transform ${jobLoading ? 'bg-gray-500': 'bg-blue-400'} text-white shadow-lg hover:bg-blue-500 hover:scale-105`}>
          {jobLoading ? 'Accepting' : 'Accept Job'}
        </button>}
         </div>
       </div>
     </div>
   );
}
