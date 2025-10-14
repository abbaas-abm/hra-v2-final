import { createFileRoute, Link } from '@tanstack/react-router'
import { FaRoad, FaMoneyBill, FaUser, FaClock, FaShoppingBasket, FaBox, FaMapMarker, FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from '@tanstack/react-router';
import { useUser } from '@clerk/clerk-react';
import { useEffect } from 'react';
import { fetchOrder } from '@/api/orders';
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';

const orderQueryOptions  = (id:string) => queryOptions({
  queryFn: () => fetchOrder(id),
  queryKey: ['order', id]
})

  
  
export const Route = createFileRoute('/dashboard/user/$reciept/')({
  head: () => ({
    meta: [{ title: "Reciept | HRA Transportation Order" }]
  }),
  component: RecieptPage,
  loader: async ({ params, context: {queryClient} }) => {
    return queryClient.ensureQueryData(orderQueryOptions(params.reciept))
  }
})

function RecieptPage() {
  const {reciept} = Route.useParams()
  const { data:order} = useSuspenseQuery(orderQueryOptions(reciept));

  const {user} = useUser();
  const navigate = useNavigate();

  useEffect(()=> {
    if (!user?.id){
      navigate({to: '/'})
    }
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'order-placed':
        return 'bg-blue-100 text-blue-800';
      case 'out-for-pickup':
        return 'bg-yellow-100 text-yellow-800';
      case 'out-for-dropoff':
        return 'bg-orange-100 text-orange-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const statusBadgeColor = getStatusColor(order.status);

  return (
    <div className="min-h-screen bg-yellow-50 p-4 flex items-center justify-center font-sans">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl p-6 md:p-10 space-y-8">
        <Link to="/dashboard/user" className='font-semibold flex items-center gap-3 text-yellow-500 text-lg underline'><FaArrowLeft/> Go Back</Link>
        {/* Header */}
        <div className="flex justify-between items-center pb-4 border-b border-gray-200">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">Order Details</h1>
          <span className={`px-4 py-2 rounded-full font-bold text-sm uppercase ${statusBadgeColor}`}>
            {order.status.replace(/-/g, ' ')}
          </span>
        </div>

        {/* Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Order ID */}
          <div className="bg-white p-6 rounded-2xl shadow-md border border-yellow-200">
            <h3 className="text-lg font-bold text-gray-800 mb-2 flex items-center">
              <span className="bg-yellow-100 p-2 rounded-full mr-3">
                <FaShoppingBasket className='text-yellow-300 text-xl' />
              </span>
              Order ID
            </h3>
            <p className="text-gray-600 font-semibold">{order._id.slice(0,8)}</p>
          </div>

          {/* Cost */}
          <div className="bg-white p-6 rounded-2xl shadow-md border border-yellow-200">
            <h3 className="text-lg font-bold text-gray-800 mb-2 flex items-center">
              <span className="bg-yellow-100 p-2 rounded-full mr-3">
                <FaMoneyBill className='text-yellow-300 text-xl' />
              </span>
              Cost
            </h3>
            <p className="text-gray-600 font-semibold">R{+order.costs.total.toFixed(2)}</p>
          </div>
          
          {/* Pickup Date + Time */}
          <div className="bg-white p-6 rounded-2xl shadow-md border border-yellow-200">
            <h3 className="text-lg font-bold text-gray-800 mb-2 flex items-center">
              <span className="bg-yellow-100 p-2 rounded-full mr-3">
                <FaClock className='text-yellow-300 text-xl' />
              </span>
              Pickup
            </h3>
            <p className="text-gray-600">Date: <span className="font-semibold">{order.deliveryDetails.pickupDate}</span></p>
            <p className="text-gray-600">Time: <span className="font-semibold">{order.deliveryDetails.pickupTime}</span></p>
          </div>
          
          {/* Distance + Duration */}
          <div className="bg-white p-6 rounded-2xl shadow-md border border-yellow-200">
            <h3 className="text-lg font-bold text-gray-800 mb-2 flex items-center">
              <span className="bg-yellow-100 p-2 rounded-full mr-3">
                <FaRoad className='text-yellow-300 text-xl' />
              </span>
              Trip
            </h3>
            <p className="text-gray-600">Distance: <span className="font-semibold">{order.tripDetails.distance} Km</span></p>
            <p className="text-gray-600">Duration: <span className="font-semibold">{order.tripDetails.duration}</span></p>
          </div>
        </div>

        {/* Items */}
        <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200">
          <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
            <span className="bg-gray-100 p-2 rounded-full mr-3">
              <FaBox className='text-yellow-300 text-xl' />
            </span>
            Items
          </h3>
          <ul className="divide-y divide-gray-200">
            {order.deliveryDetails.items.map(item => (
              <li key={item.id} className="py-4 flex justify-between items-center">
                <span className="text-gray-600 font-medium">{item.name}</span>
                <span className="text-gray-500 text-sm">Qty: {item.quantity} | Weight: {item.weight * item.quantity}kg</span>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Personal Details */}
        <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200">
          <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
            <span className="bg-gray-100 p-2 rounded-full mr-3">
              <FaUser className='text-yellow-300 text-xl' />
            </span>
            Personal Details
          </h3>
          <div className="space-y-2 text-gray-600">
            <p><span className="font-bold">Name:</span> {order.personalDetails.firstname} {order.personalDetails.lastname}</p>
            <p><span className="font-bold">Email:</span> {order.personalDetails.email}</p>
            <p><span className="font-bold">Phone:</span> {order.personalDetails.mobile}</p>
            <p><span className="font-bold">Notes:</span> {order.personalDetails.message}</p>
          </div>
        </div>
        
        {/* Locations */}
        <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200">
          <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
            <span className="bg-gray-100 p-2 rounded-full mr-3">
              <FaMapMarker className='text-yellow-300 text-xl' />
            </span>
            Locations
          </h3>
          <div className="space-y-2 text-gray-600">
            <p><span className="font-bold">Pickup:</span> {order.addressDetails.pickup}</p>
            <p><span className="font-bold">Dropoff:</span> {order.addressDetails.dropoff}</p>
          </div>
        </div>
        
      </div>
    </div>
  )
}
