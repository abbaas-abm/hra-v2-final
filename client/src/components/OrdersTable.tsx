import type { Order } from '@/types';
import { useNavigate } from '@tanstack/react-router';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';


const OrdersTable = ({orders}:{orders:Order[]}) => {
    const myOrders = orders;

    const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white font-sans p-4 sm:p-8">
      <div className="w-full">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-6">Orders Overview</h1>
        <div className="bg-white rounded-2xl shadow-xl border border-yellow-200 overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-yellow-100 text-gray-900">
                <th className="p-4 font-semibold">Order ID</th>
                <th className="p-4 font-semibold">Customer</th>
                <th className="p-4 font-semibold">Pickup</th>
                <th className="p-4 font-semibold">Dropoff</th>
                <th className="p-4 font-semibold">Date</th>
                <th className="p-4 font-semibold">Total</th>
                <th className="p-4 font-semibold">Payment</th>
              </tr>
            </thead>
            <tbody>
              {myOrders.map((order, _) => (
                <tr onClick={() => navigate({ to: '/dashboard/driver/order-details/$orderId', params: { orderId: order._id } })} key={order._id} className="border-b cursor-pointer border-yellow-100 hover:bg-yellow-50 transition-all duration-200">
                  <td className="p-4 text-gray-700">{order._id.slice(0,5)}</td>
                  <td className="p-4 text-gray-700">{`${order.personalDetails.firstname} ${order.personalDetails.lastname}`}</td>
                  <td className="p-4 text-gray-700">{order.addressDetails.pickup}</td>
                  <td className="p-4 text-gray-700">{order.addressDetails.dropoff}</td>
                  <td className="p-4 text-gray-700">{order.deliveryDetails.pickupDate}</td>
                  <td className="p-4 text-gray-700">R{(+order.costs.total * 0.75).toFixed(2)}</td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${order.driverPaid ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {order.driverPaid ? (
                        <>
                          <FaCheckCircle className="mr-1" /> Paid
                        </>
                      ) : (
                        <>
                          <FaTimesCircle className="mr-1" /> Unpaid
                        </>
                      )}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrdersTable;