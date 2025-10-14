import { createFileRoute } from '@tanstack/react-router'
import DriverOrderCard from '@/components/DriverApplyCard';
import { queryOptions, useSuspenseQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { driverAcceptJob, fetchAvailableOrders } from '@/api/driver';
import type { Order } from '@/types';
import { toast } from 'sonner';

const availableOrdersQueryOptions = queryOptions({
  queryKey: ['available-orders'],
  queryFn: fetchAvailableOrders
})

export const Route = createFileRoute('/dashboard/driver/new-deliveries/')({
  head: () => ({
      meta: [
        {title: 'Driver | New Deliveries'}
      ]
    }),
    component: NewDeliveriesPage,
    loader: async ({context: {queryClient}}) => {
      return queryClient.ensureQueryData(availableOrdersQueryOptions)
    }
})

function NewDeliveriesPage() {
  const queryClient = useQueryClient();

  const {data:availableOrders} = useSuspenseQuery(availableOrdersQueryOptions);

  const paidOrders = availableOrders?.filter((order:Order)=> order.userPaid === true)

  
  const {mutateAsync, isPending:jobLoading} =  useMutation({
    mutationKey: ['accept-job'],
    mutationFn: driverAcceptJob,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['available-orders'] });
      toast.success('Job Accepted, View under "Active Deliveries!"')
    }
  })

  const handleAcceptJob = async (id:string) => {
    await mutateAsync(id)
  }

  return (
    <div className="min-h-screen p-8 flex flex-col justify-center items-center">
     {availableOrders.length === 0 
        ? (<>
        <p className="text-lg text-center text-gray-700 my-4">No Orders Yet.</p>
        </>)
        : (<>
           <h1 className="text-3xl sm:text-4xl md:text-3xl font-semibold text-center text-gray-900 mb-10">
        New Orders
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl">
        {paidOrders.map((order:Order, index:number) => (
          <DriverOrderCard key={index} order={order}>
          <button 
          onClick={() => handleAcceptJob(order._id)}
          disabled={jobLoading}
            className={`w-full mt-3 cursor-pointer py-3 px-6 text-lg font-bold rounded-full transition-all duration-300 transform ${jobLoading ? 'bg-gray-500': 'bg-blue-400'} text-white shadow-lg hover:bg-blue-500 hover:scale-105`}>
            {jobLoading ? 'Accepting' : 'Accept Job'}
          </button>  
          </DriverOrderCard>
        ))}
      </div>
        </>)
      }
    </div>
  )
}
