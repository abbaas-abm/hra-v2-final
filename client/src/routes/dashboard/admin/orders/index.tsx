import DriverOrderCard from '@/components/DriverOrderCard';
import { createFileRoute } from '@tanstack/react-router'
import { fetchAllOrders } from '@/api/admin';
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import type { Order } from '@/types';
import { useEffect, useState } from 'react';

const ordersQueryOptions = queryOptions({
  queryKey: ['orders'],
  queryFn: () => fetchAllOrders()
})

export const Route = createFileRoute('/dashboard/admin/orders/')({
  head: () => ({
    meta: [
      {title: 'Driver | Active Deliveries'}
    ]
  }),
  component: ActiveDeliveriesPage,
  loader: async ({context: {queryClient}}) => {
    return queryClient.ensureQueryData(ordersQueryOptions);
  }
})

function ActiveDeliveriesPage() {
   const { data: orders } = useSuspenseQuery(ordersQueryOptions);

  // Sort newest first
  const sortedOrders = orders.sort(
    (a: Order, b: Order) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const [filteredOrders, setFilteredOrders] = useState<Order[]>(sortedOrders);
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");

  const statusOptions = [
    { value: "order-placed", label: "No Driver" },
    { value: "out-for-pickup", label: "Out for Pickup" },
    { value: "out-for-dropoff", label: "Out for Dropoff" },
    { value: "completed", label: "Completed" },
  ];

  // Update filtered list when search or status changes
  useEffect(() => {
    let result = sortedOrders;

    if (status) {
      result = result.filter((order) => order.status === status);
    }

    if (search.trim()) {
      const s = search.toLowerCase();
      result = result.filter((order) => {
        const { pickup, dropoff } = order.addressDetails || {};
        const { firstname, lastname, email, mobile } = order.personalDetails || {};
        return (
          order._id.toLowerCase().includes(s) ||
          pickup?.toLowerCase().includes(s) ||
          dropoff?.toLowerCase().includes(s) ||
          firstname?.toLowerCase().includes(s) ||
          lastname?.toLowerCase().includes(s) ||
          email?.toLowerCase().includes(s) ||
          mobile?.toLowerCase().includes(s)
        );
      });
    }

    setFilteredOrders(result);
  }, [status, search, sortedOrders]);

  const handleReset = () => {
    setStatus("");
    setSearch("");
    setFilteredOrders(sortedOrders);
  };

  return (
    <div className="min-h-screen p-8 flex flex-col items-center bg-gray-50">
      {!orders || orders.length === 0 ? (
        <h1 className="text-lg text-gray-700 w-full text-center">No Orders Yet.</h1>
      ) : (
        <>
          <h1 className="text-3xl md:text-4xl font-semibold text-center text-gray-900 mb-10">
            All Orders
          </h1>

          {/* Search & Filter */}
          <form className="flex flex-col md:flex-row gap-5 justify-between items-center w-full md:max-w-7xl my-4">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border py-2 px-4 w-[250px] md:w-[600px] rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              placeholder="Search by name, address, email, or ID..."
            />

            <div className="flex gap-3 items-center">
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full md:w-52 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Statuses</option>
                {statusOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>

              {(status || search) && (
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-sm font-medium transition-all"
                >
                  Reset
                </button>
              )}
            </div>
          </form>

          {/* Orders Display */}
          {filteredOrders.length === 0 ? (
            <h1 className="text-center text-xl text-gray-500 mt-10">
              No orders found matching your filters.
            </h1>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl">
              {filteredOrders.map((order, index) => (
                <DriverOrderCard key={order._id || index} role="admin" order={order} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
