import { fetchDriverProfileData } from '@/api/driver'
import DriverDashboardSidebar from '@/components/DriverDashboardSidebar'
import DriverLogoutButton from '@/components/DriverLogoutButton'
import { useDriverAuth } from '@/context/DriverAuthContext'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute, Outlet, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'


const profileQueryOptions = (id:string) => queryOptions({
    queryFn: () => fetchDriverProfileData(id),
    queryKey: ['driver', id]
})

export const Route = createFileRoute('/dashboard/driver')({
  component: DriverDashboardLayout,
   loader: async ({context: {queryClient}}) => {
    const driver = JSON.parse(localStorage.getItem('driver_info') ?? '')
    return queryClient.ensureQueryData(profileQueryOptions(driver._id))
  }
})

function DriverDashboardLayout() {
  const navigate = useNavigate();
  const {driver} = useDriverAuth();
    const {data:driverData} = useSuspenseQuery(profileQueryOptions(driver?._id ?? ''))

  
  useEffect(()=> {
    if(!driver) {
      navigate({to: '/driver-login'})
    }
  }, [])

  if (!driverData.isActive) {
    return (
       <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="mb-6">
          <svg
            className="mx-auto h-16 w-16 text-yellow-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Account Inactive
        </h1>
        <p className="text-gray-600 mb-6">
          Your driver account is currently inactive and pending review. Our team is carefully reviewing your application, and we’ll notify you once the process is complete.
        </p>
        <p className="text-gray-500 text-sm mb-8">
          This typically takes 1-3 business days. Thank you for your patience!
        </p>
        <button
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
          onClick={() => window.location.href = '/contact'}
        >
          Contact Support
        </button>
      </div>
    </div>
    )
  }

  return (<main className='flex'>
    <DriverDashboardSidebar/>
    <div className='ml-15 md:ml-70'>
        <Outlet/>
        <DriverLogoutButton/>
    </div>
  </main>)
}
