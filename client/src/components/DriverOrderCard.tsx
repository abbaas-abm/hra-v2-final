import type { Order } from '@/types';
import { Link } from '@tanstack/react-router';
import { FaBox, FaMapMarkedAlt, FaMapMarkerAlt } from 'react-icons/fa';
import { FaUser } from 'react-icons/fa6';

// The main application component that renders the grid of cards.
const DriverOrderCard = ({order, role}:{order:Order, role:string}) => {
  // Sample data, duplicated to show the grid layout.
  
  // Helper component to display a single card.
    return (
      <div className="bg-white rounded-3xl shadow p-6 md:p-8 flex flex-col justify-between max-w-sm w-full mx-auto border-gray-200">
        {/* Header Section */}
        <div className="flex items-center space-x-4 mb-6">
          {/* User Icon SVG */}
          <div className="h-10 w-10 p-1 rounded-full bg-yellow-100 flex items-center justify-center">
            <FaUser className='text-yellow-300 text-lg '/>
          </div>
          <div className="flex-1">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800">
              {order.personalDetails.firstname} {order.personalDetails.lastname}
            </h2>
            <p className="text-sm mt-2 text-gray-500">
              Pick-Up Date: {order.deliveryDetails.pickupDate}
            </p>
            <p className="text-sm mt-1 text-gray-500">
              Pick-Up Time: {order.deliveryDetails.pickupTime}
            </p>
          </div>
        </div>

        {/* Address Details */}
        <div className="space-y-4 mb-6">
          <div className="flex items-start space-x-3">
            {/* Pickup Icon SVG */}
            <FaMapMarkedAlt className='text-yellow-500 text-lg'/>
            <div className="flex-1">
              <p className="font-semibold text-sm text-gray-600">Pickup</p>
              <p className="text-gray-900 text-base">{order.addressDetails.pickup}</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            {/* Dropoff Icon SVG */}
            <FaMapMarkerAlt className='text-yellow-500 text-lg'/>
            <div className="flex-1">
              <p className="font-semibold text-sm text-gray-600">Dropoff</p>
              <p className="text-gray-900 text-base">{order.addressDetails.dropoff}</p>
            </div>
          </div>
        </div>

        {/* Delivery Details */}
        <div className="space-y-4 mb-6">
          <h3 className="text-lg font-semibold text-gray-800">Delivery Details</h3>
          <div className="flex items-center space-x-3">
            {/* Items Icon SVG */}
            <FaBox className='text-yellow-500 text-lg'/>
            <p className="text-base text-gray-900">
              {order.deliveryDetails.items.reduce((total, item) => total + item.quantity, 0)} items total
            </p>
          </div>
        </div>

        {/* Action Button */}
        {role === 'driver' 
        ? <>
          <Link 
            to="/dashboard/driver/manage-order/$orderId" 
            params={{ orderId: String(order._id) }}
          >
          <button className="w-full mt-auto cursor-pointer py-3 px-6 text-lg font-bold rounded-full transition-all duration-300 transform bg-yellow-400 text-white shadow-lg hover:bg-yellow-500 hover:scale-105">
            Manage
          </button>
        </Link>
        </>
        : <>
        <Link 
            to="/dashboard/admin/order-details/$orderId" 
            params={{ orderId: String(order._id) }}
          >
          <button className="w-full mt-auto cursor-pointer py-3 px-6 text-lg font-bold rounded-full transition-all duration-300 transform bg-blue-400 text-white shadow-lg hover:bg-blue-500 hover:scale-105">
            Details
          </button>
        </Link>
        </>}
      </div>
    );
};

export default DriverOrderCard;
