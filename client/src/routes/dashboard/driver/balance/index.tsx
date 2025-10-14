import { fetchDriverOrders } from '@/api/driver';
import type { Order } from '@/types';
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router'
import { FaCheckCircle, FaTimesCircle, FaWallet } from 'react-icons/fa';


const driverOrdersQueryOptions = queryOptions({
  queryKey: ['driver-orders'],
  queryFn: fetchDriverOrders
})


export const Route = createFileRoute('/dashboard/driver/balance/')({
  component: BalanceDashborad,
  head: () => ({
        meta: [
            {title: 'Driver | My Balance'}
        ]
    }),
    loader: async ({context:{queryClient}}) => {
      return queryClient.ensureQueryData(driverOrdersQueryOptions)
    }
})


function BalanceDashborad  () {

  const {data:orders} = useSuspenseQuery(driverOrdersQueryOptions)

const balanceData = {
  totalEarnings: () => {
    const payed = orders.filter((item:Order) => item.driverPaid);
    const total = payed.reduce((prev:any, curr:any)=> prev + (curr.costs.total)  , 0)  * 0.75;
    return total.toFixed(2);
  },
  pendingPayments: () => {
    const unpayed = orders.filter((item:Order) => !item.driverPaid);
    const total = unpayed.reduce((prev:any, curr:any)=> prev + (curr.costs.total)  , 0) * 0.75;
    return total.toFixed(2);
  }
};



  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white font-sans p-4 sm:p-8">
      <div className="w-full">
        {/* Balance Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-yellow-200 flex flex-col sm:flex-row items-center justify-between">
          <div className="flex items-center space-x-4">
            <FaWallet className="text-yellow-500 text-3xl" />
            <div>
              <h2 className="text-xl font-bold text-gray-900">Balance Overview</h2>
              <p className="text-gray-700">Total Earnings: <span className="font-semibold">R{balanceData.totalEarnings()}</span></p>
              <p className="text-gray-700">Pending Payments: <span className="font-semibold">R{balanceData.pendingPayments()}</span></p>
            </div>
          </div>
          
        </div>

        {/* Orders Table */}
       {orders.length === 0 
        ? (<>
        <p className="text-center text-lg text-gray-700 my-4 w-full">No Deliveries Yet.</p>
        </>)
        : (
          <>
           <div className="bg-white rounded-2xl shadow-xl border border-yellow-200 overflow-x-auto">
          <h1 className="text-3xl font-extrabold text-gray-900 p-6">Orders</h1>
          <table className="w-full text-left">
            <thead>
              <tr className="bg-yellow-100 text-gray-900">
                <th className="p-4 font-semibold">Customer</th>
                <th className="p-4 font-semibold">Pickup</th>
                <th className="p-4 font-semibold">Dropoff</th>
                <th className="p-4 font-semibold">Earnings</th>
                <th className="p-4 font-semibold">Payment</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order:Order, _:number) => (
                <tr key={order.userId} className="border-b border-yellow-100 hover:bg-yellow-50 transition-all duration-200">
                  <td className="p-4 text-gray-700">{`${order.personalDetails.firstname} ${order.personalDetails.lastname}`}</td>
                  <td className="p-4 text-gray-700">{order.addressDetails.pickup}</td>
                  <td className="p-4 text-gray-700">{order.addressDetails.dropoff}</td>
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
          </>
        )}
      </div>
    </div>
  );
};

export default BalanceDashborad;