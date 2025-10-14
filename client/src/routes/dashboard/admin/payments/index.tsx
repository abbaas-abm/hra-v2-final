import { fetchAllDrivers, fetchDriversOrders, clearDriverOrders } from '@/api/driver';
import { queryOptions, useSuspenseQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { FaCar, FaCheck, FaEnvelope, FaUser, FaUsers } from 'react-icons/fa';
import { FaMoneyBill1, FaSpinner } from 'react-icons/fa6'; // Added FaSpinner for loading state
import { toast } from 'sonner';

// 🔹 Query for all drivers
const driverOrdersQueryOptions = queryOptions({
  queryKey: ['drivers'],
  queryFn: fetchAllDrivers,
  staleTime: 1000 * 60 * 2, // 2 minutes cache
});

// 🔹 Query for a specific driver's orders
const driverOrdersQOptions = (driverId: string) =>
  queryOptions({
    queryKey: ['driver-orders', driverId],
    queryFn: () => fetchDriversOrders(driverId),
    enabled: !!driverId,
    staleTime: 1000 * 60 * 2,
  });

// 🔹 Route Definition
export const Route = createFileRoute('/dashboard/admin/payments/')({
  component: NewDeliveriesPage,
  head: () => ({
    meta: [{ title: 'Admin | HRA Drivers' }],
  }),
  loader: async ({ context: { queryClient } }) => {
    // Only prefetch all drivers (not per-driver orders)
    return queryClient.ensureQueryData(driverOrdersQueryOptions);
  },
});

// 🔹 Main Component
function NewDeliveriesPage() {
  const { data: drivers } = useSuspenseQuery(driverOrdersQueryOptions);
  const navigate = useNavigate();

  if (!drivers || drivers.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-lg text-gray-700">No Drivers Yet.</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-4 sm:p-6 lg:p-8 w-full">
      <div className="w-full mx-auto">
        <h1 className="text-3xl font-bold text-black mb-6 text-center flex items-center justify-center">
          <FaUsers className="mr-2 text-yellow-500" /> Drivers List
        </h1>

        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse border border-yellow-300 md:min-w-[700px]">
            <thead>
              <tr className="bg-yellow-100">
                <Th icon={<FaUser />} label="Name" />
                <Th icon={<FaCar />} label="Vehicle Make" />
                <Th icon={<FaEnvelope />} label="Email" />
                <Th icon={<FaMoneyBill1 />} label="Amount Due (R)" />
                <Th icon={<FaCheck />} label="Mark Paid" />
              </tr>
            </thead>
            <tbody>
              {drivers.map((driver: any) => (
                <DriverRow key={driver._id} driver={driver} navigate={navigate} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// 🔹 Reusable Table Header Cell Component
function Th({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <th className="px-4 py-3 text-left text-sm font-semibold text-black border-b border-yellow-300">
      <div className="flex items-center">
        <span className="mr-2 text-yellow-500">{icon}</span> {label}
      </div>
    </th>
  );
}

// 🔹 Single Driver Row Component
function DriverRow({ driver, navigate }: { driver: any; navigate: any }) {
  // Fetch orders for this specific driver
  const { data: driverOrders } = useSuspenseQuery(driverOrdersQOptions(driver._id));
  const queryClient = useQueryClient();
  
  // 🐛 FIX: Correct mutation setup for invalidation and pending state
  const { mutateAsync, isPending: clearingPending } = useMutation({
    mutationKey: ['clear-driver-account'],
    // 💡 Note: clearDriverOrders function must accept driverId as its argument
    mutationFn: clearDriverOrders, 
    // 🐛 FIX: Invalidate the specific driver's orders query upon success
    onSuccess: (_, driverId) => { 
      // Invalidate the query for this specific driver's unpaid orders
      queryClient.invalidateQueries({ queryKey: ['driver-orders', driverId] }); 
      
      // Optional: Invalidate the main drivers list if aggregated data needs refresh
      // queryClient.invalidateQueries({ queryKey: ['drivers'] });
      
      toast.success('Payment Marked!');
    },
    onError: (error) => {
      toast.error(`Payment failed: "${error.message}"`);
    }
  });


  // Calculate total unpaid amount
  const dueAmount = driverOrders.filter((order: any) => order.status === 'completed' && order.driverPaid === false);

  const totalDue = (dueAmount.length > 0) 
    ? dueAmount.reduce((prev: any, curr: any) => prev + curr.costs.total, 0) * 0.75 
    : 0;

  const handlePayout = async () => {
    // Pass the driverId to the mutation function
    await mutateAsync(driver._id);
  };

  const isDue = totalDue > 0;

  return (
    <tr
      className="hover:bg-yellow-50 transition-colors cursor-pointer"
      onClick={() => navigate({ to: `/dashboard/admin/driver-details/${driver._id}` })}
    >
      <td className="px-4 py-3 text-black border-b border-yellow-300">
        {driver.userDetails.firstName} {driver.userDetails.lastName}
      </td>
      <td className="px-4 py-3 text-black border-b border-yellow-300">
        {driver.companyDetails.vehicleMake}
      </td>
      <td className="px-4 py-3 text-black border-b border-yellow-300">
        {driver.userDetails.email}
      </td>
      <td className={`px-4 py-3 border-b border-yellow-300 font-semibold ${isDue ? 'text-red-600' : 'text-green-600'}`}>
        R {totalDue.toFixed(2).toLocaleString()}
      </td>
      <td className="px-4 py-3 border-b border-yellow-300">
        <button
          onClick={(e) => {
            e.stopPropagation(); // prevent row click navigation
            handlePayout();
          }}
          // 🐛 FIX: Use clearingPending and totalDue to control button state/style
          className={`py-2 px-4 rounded transition text-white text-lg flex items-center justify-center min-w-[100px] 
            ${isDue && !clearingPending
              ? 'bg-yellow-500 cursor-pointer hover:scale-[1.02] hover:bg-yellow-600'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          disabled={!isDue || clearingPending} // Disable if nothing is due OR payment is pending
        >
          {clearingPending ? (
            <>
              <FaSpinner className="animate-spin mr-2" /> Processing
            </>
          ) : (
            isDue ? 'Pay Out' : 'Paid'
          )}
        </button>
      </td>
    </tr>
  );
}