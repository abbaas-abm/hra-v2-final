import {  fetchDriverOrders } from '@/api/driver'
import OrdersTable from '@/components/OrdersTable'
import { queryOptions, useSuspenseQuery} from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'

const driverOrdersQueryOptions = queryOptions({
  queryKey: ['driver-orders'],
  queryFn: fetchDriverOrders
})

export const Route = createFileRoute('/dashboard/driver/my-deliveries/')({
  component: DriverOrdersPage,
  head: () => ({
        meta: [
            {title: 'Driver | My Deliveries'}
        ]
    }),
    loader: async ({context:{queryClient}}) => {
      return queryClient.ensureQueryData(driverOrdersQueryOptions)
    }
})

function DriverOrdersPage() {
  const {data:orders} = useSuspenseQuery(driverOrdersQueryOptions);


  return <div className="p-5">
    {orders.length === 0 
    ? <>
      <h1 className="text-lg text-gray-700 text-center">No Deliveries Yet.</h1>
    </>
    : <>
      <OrdersTable orders={orders}/>
    </>
  }
  </div>
}
