import { fetchAllDrivers, updateDriverStatus } from '@/api/driver'
import { queryOptions, useSuspenseQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { FaCar, FaCheckCircle, FaEnvelope, FaTimesCircle, FaUser, FaUsers } from 'react-icons/fa'
import { toast } from 'sonner'

const driverOrdersQueryOptions = queryOptions({
  queryKey: ['drivers'],
  queryFn: fetchAllDrivers
})

export const Route = createFileRoute('/dashboard/admin/pending-drivers/')({
  component: RouteComponent,
  head: () => ({
    meta: [
      {title: 'Admin | Pending Drivers'}
    ]
  }),
   loader: async ({context:{queryClient}}) => {
      return queryClient.ensureQueryData(driverOrdersQueryOptions)
    }
})

function RouteComponent() {
  const {data:drivers} = useSuspenseQuery(driverOrdersQueryOptions);
  const queryClient = useQueryClient();
  
  
    const {mutateAsync} =  useMutation({
      mutationKey: ['driver-status-updating'],
      mutationFn: updateDriverStatus,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['drivers'] });
        toast.success('Driver Profile Status Updated!')
      }
    })

    const handleStatusUpdate = async (driverId:string, isActive:string) => {
      await mutateAsync({driverId, isActive: !isActive})
    }

  return (
    <div className="min-h-screen bg-white p-4 sm:p-6 lg:p-8 w-full">
      <div className="w-full mx-auto">
        <h1 className="text-3xl font-bold text-black mb-6 text-center flex items-center justify-center">
          <FaUsers className="mr-2 text-yellow-500" /> All Drivers
        </h1>
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse border border-yellow-300">
            <thead>
              <tr className="bg-yellow-100">
                <th className="px-4 py-3 text-left text-sm font-semibold text-black border-b border-yellow-300">
                  <div className="flex items-center">
                    <FaUser className="mr-2 text-yellow-500" /> Name
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-black border-b border-yellow-300">
                  <div className="flex items-center">
                    <FaCar className="mr-2 text-yellow-500" /> Vehicle Make
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-black border-b border-yellow-300">
                  <div className="flex items-center">
                    <FaEnvelope className="mr-2 text-yellow-500" /> Email
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-black border-b border-yellow-300">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-black border-b border-yellow-300">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {drivers.map((driver:any) => (
                <tr key={driver._id} className="hover:bg-yellow-50 transition-colors">
                  <td className="px-4 py-3 text-black border-b border-yellow-300">
                    {driver.userDetails.firstName} {driver.userDetails.lastName}
                  </td>
                  <td className="px-4 py-3 text-black border-b border-yellow-300">
                    {driver.companyDetails.vehicleMake}
                  </td>
                  <td className="px-4 py-3 text-black border-b border-yellow-300">
                    {driver.userDetails.email}
                  </td>
                  <td className="px-4 py-3 border-b border-yellow-300">
                    <span className={`flex items-center ${driver.isActive ? 'text-green-500' : 'text-red-500'}`}>
                      {driver.isActive ? <FaCheckCircle className="mr-1" /> : <FaTimesCircle className="mr-1" />}
                      {driver.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-4 py-3 border-b border-yellow-300">
                    <button
                      className={`px-4 py-2 rounded-md text-white cursor-pointer font-medium ${
                        driver.isActive ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
                      }`}
                      onClick={() => {
                        handleStatusUpdate(driver._id, driver.isActive)
                      }}
                    >
                      {driver.isActive ? 'Deactivate' : 'Activate'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
