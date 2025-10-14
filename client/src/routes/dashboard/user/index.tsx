import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { FaBoxOpen, FaCheckCircle, FaTruck } from 'react-icons/fa';
import { useUser } from '@clerk/clerk-react';
import { useEffect, useState } from 'react';
import type { Order } from '@/types';

export const Route = createFileRoute('/dashboard/user/')({
  head: () => ({
    meta: [{ title: 'Dashboard | User Dashboard' }],
  }),
  component: UserDashboard,
});

function UserDashboard() {
  const { user } = useUser();
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(()=> {
    if (!user){
      navigate({to: '/'})
    }
  }, [])

  useEffect(() => {
    if (!user) return;
    const fetchOrders = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/orders/${user.id}`);
        const data = await res.json();
        setOrders(data);
      } catch (err) {
        console.error('Failed to fetch orders:', err);
      }
    };
    fetchOrders();
  }, [user]);
  const completedOrders = orders.filter((order:any) => order.status === 'completed');
  const activeOrders = orders.filter((order:any) => order.status !== 'completed');
  const orderedOrders: Order[] =
  orders
    ?.filter((order:Order) => order.userPaid)
    .sort((a:Order, b:Order) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()) || []
    
  return (
    <div className="min-h-screen bg-white text-gray-800 p-4 md:p-8">
      {/* Header */}

      <header className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
          User Dashboard
        </h1>
        <p className="text-gray-600">
          Welcome back {user?.firstName || 'User'}! Here’s an overview of your
          orders.
        </p>
      </header>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="flex items-center justify-between p-6 bg-yellow-400 rounded-2xl shadow-md hover:shadow-lg transition">
          <div>
            <h2 className="text-lg font-semibold text-white">Active Orders</h2>
            <p className="text-3xl font-bold text-white">{activeOrders.length}</p>
          </div>
          <FaBoxOpen className="text-5xl text-white opacity-80" />
        </div>

        <div className="flex items-center justify-between p-6 bg-yellow-400 rounded-2xl shadow-md hover:shadow-lg transition">
          <div>
            <h2 className="text-lg font-semibold text-white">Completed Orders</h2>
            <p className="text-3xl font-bold text-white">{completedOrders.length}</p>
          </div>
          <FaCheckCircle className="text-5xl text-white opacity-80" />
        </div>
      </div>

      {/* New Order Button */}
      <Link to="/services/delivery/order">
        <button className="cursor-pointer py-2 px-4 rounded-md flex items-center gap-2 bg-yellow-300 text-lg font-semibold my-4 text-white transition hover:scale-105 hover:shadow">
          Schedule New Delivery <FaTruck />
        </button>
      </Link>

      {/* Recent Orders */}

      {orders.length === 0 ? (

    <div className="p-5 text-center text-lg text-gray-500">
      No Items Yet.
    </div>
      ) : (

        <section>
          <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
          <div className="overflow-x-auto rounded-lg shadow">
            <table className="min-w-full text-left bg-white">
              <thead className="bg-yellow-300 text-white">
                <tr>
                  <th className="px-4 py-2">Order ID</th>
                  <th className="px-4 py-2">Status</th>
                  <th className="px-4 py-2">Pickup</th>
                  <th className="px-4 py-2">Dropoff</th>
                </tr>
              </thead>
              <tbody>
                {orderedOrders.map((order: any) => (
                  <tr
                    key={order._id}
                    className="border-t hover:bg-yellow-50 cursor-pointer"
                    onClick={() =>
                      navigate({ to: `/dashboard/user/${order._id}` })
                    }
                  >
                    <td className="px-4 py-2">{order._id}</td>
                    <td
                      className={`px-4 py-2 ${
                        order.status === 'completed'
                          ? 'text-green-400'
                          : 'text-yellow-400'
                      } font-medium`}
                    >
                      {order.status === 'completed' ? 'Completed' : 'Active'}
                    </td>
                    <td className="px-4 py-2">
                      {order.addressDetails?.pickup}
                    </td>
                    <td className="px-4 py-2">
                      {order.addressDetails?.dropoff}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </div>
  );
}
