import DriverOrderCard from '@/components/DriverOrderCard';
import { createFileRoute } from '@tanstack/react-router'
import { fetchActiveOrders } from '@/api/driver';
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import type { Order } from '@/types';

const activeOrdersQueryOptions = queryOptions({
  queryKey: ['active-orders'],
  queryFn: () => fetchActiveOrders()
})

export const Route = createFileRoute('/dashboard/driver/active-deliveries/')({
  head: () => ({
    meta: [
      {title: 'Driver | Active Deliveries'}
    ]
  }),
  component: ActiveDeliveriesPage,
  loader: async ({context: {queryClient}}) => {
    return queryClient.ensureQueryData(activeOrdersQueryOptions);
  }
})

function ActiveDeliveriesPage() {
  const {data:activeOrders} = useSuspenseQuery(activeOrdersQueryOptions)
  console.log(activeOrders);
  return (
    <div className="min-h-screen p-8 flex flex-col justify-center items-center">
      
        {activeOrders.orders ? <>
          <h1 className="text-lg text-gray-700 w-full text-center">{activeOrders.message}</h1>
        </> 
        : <>
        <h1 className="text-3xl sm:text-4xl md:text-3xl font-semibold text-center text-gray-900 mb-10">
         Active Orders
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl">
        {activeOrders.map((order:Order, index:number) => (
          <DriverOrderCard role='driver' key={index} order={order} />
        ))}
      </div>
        </>}
    </div>
  )
}
