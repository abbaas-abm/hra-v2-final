import {  fetchAllDrivers } from '@/api/driver'
import DriversTable from '@/components/DriversTable'
import { queryOptions, useSuspenseQuery} from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'

const driverOrdersQueryOptions = queryOptions({
  queryKey: ['drivers'],
  queryFn: fetchAllDrivers
})

export const Route = createFileRoute('/dashboard/admin/drivers/')({
  component: DriverOrdersPage,
  head: () => ({
        meta: [
            {title: 'Admin | HRA Drivers'}
        ]
    }),
    loader: async ({context:{queryClient}}) => {
      return queryClient.ensureQueryData(driverOrdersQueryOptions)
    }
})

function DriverOrdersPage() {
  const {data:drivers} = useSuspenseQuery(driverOrdersQueryOptions);


  return <div className="p-5">
    {drivers.length === 0 
    ? <>
      <h1 className="text-lg text-gray-700 text-center">No Drivers Yet.</h1>
    </>
    : <>
      <DriversTable drivers={drivers}/>
    </>
  }
  </div>
}
