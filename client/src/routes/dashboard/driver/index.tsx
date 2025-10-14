import { createFileRoute } from '@tanstack/react-router'
import { FaUser, FaEnvelope, FaPhone, FaBuilding, FaCar, FaCalendar, FaKey } from 'react-icons/fa';
import { useSuspenseQuery, queryOptions } from '@tanstack/react-query';
import { fetchDriverProfileData } from '@/api/driver';
import { useDriverAuth } from '@/context/DriverAuthContext';

const profileQueryOptions = (id:string) => queryOptions({
    queryFn: () => fetchDriverProfileData(id),
    queryKey: ['driver', id]
})

export const Route = createFileRoute('/dashboard/driver/')({
  component: DriverProfile,
  head: () => ({
    meta: [
        {title: 'Driver | Profile Information'}
    ]
  }),
  loader: async ({context: {queryClient}}) => {
    const driver = JSON.parse(localStorage.getItem('driver_info') ?? '')
    return queryClient.ensureQueryData(profileQueryOptions(driver._id))
  }
})

function DriverProfile() {
    const {driver} = useDriverAuth();

    const {data:driverData} = useSuspenseQuery(profileQueryOptions(driver?._id ?? ''))
    
  const {
    companyDetails: {
      companyName,
      regIdNumber,
      licenseDiskDate,
      vatNumber,
      vehicleType,
      vehicleMake,
      vehicleModel,
      vinNumber,
      vehicleColor
    },
    userDetails: { firstName, lastName, email, mobileNumber },
    bankDetails: {accountHolderName, bankName, accountNumber, branchCode, accountType},
    createdAt,
    updatedAt
  } = driverData;
 
  const formatDate = (dateString:any) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-white p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-black mb-6 text-center">Driver Dashboard</h1>
        
        {/* Responsive Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* User Details Card */}
          <div className="bg-gray-50 shadow-lg rounded-lg p-6 border-l-4 border-yellow-400">
            <h2 className="text-xl font-semibold text-black mb-4 flex items-center">
              <FaUser className="mr-2 text-yellow-400" /> Personal Information
            </h2>
            <p className="text-black mb-2"><span className="font-medium">Name:</span> {firstName} {lastName}</p>
            <p className="text-black mb-2 flex items-center">
              <FaEnvelope className="mr-2 text-yellow-400" /> <span className="font-medium">Email:</span> {email}
            </p>
            <p className="text-black mb-2 flex items-center">
              <FaPhone className="mr-2 text-yellow-400" /> <span className="font-medium">Mobile:</span> {mobileNumber}
            </p>
          </div>

          {/* Company Details Card */}
          <div className="bg-gray-50 shadow-lg rounded-lg p-6 border-l-4 border-yellow-400">
            <h2 className="text-xl font-semibold text-black mb-4 flex items-center">
              <FaBuilding className="mr-2 text-yellow-400" /> Company Information
            </h2>
            <p className="text-black mb-2"><span className="font-medium">Company:</span> {companyName}</p>
            <p className="text-black mb-2"><span className="font-medium">Reg ID:</span> {regIdNumber}</p>
            <p className="text-black mb-2"><span className="font-medium">VAT Number:</span> {vatNumber}</p>
            <p className="text-black mb-2 flex items-center">
              <FaCalendar className="mr-2 text-yellow-400" /> 
              <span className="font-medium">License Disk Date:</span> {formatDate(licenseDiskDate)}
            </p>
          </div>

          {/* Vehicle Details Card */}
          <div className="bg-gray-50 shadow-lg rounded-lg p-6 border-l-4 border-yellow-400">
            <h2 className="text-xl font-semibold text-black mb-4 flex items-center">
              <FaCar className="mr-2 text-yellow-400" /> Vehicle Information
            </h2>
            <p className="text-black mb-2"><span className="font-medium">Type:</span> {vehicleType}</p>
            <p className="text-black mb-2"><span className="font-medium">Make:</span> {vehicleMake}</p>
            <p className="text-black mb-2"><span className="font-medium">Model:</span> {vehicleModel}</p>
            <p className="text-black mb-2"><span className="font-medium">VIN:</span> {vinNumber}</p>
            <p className="text-black mb-2"><span className="font-medium">Color:</span> {vehicleColor}</p>
          </div>

          {/* Bank Details Card */}
          <div className="bg-gray-50 shadow-lg rounded-lg p-6 border-l-4 border-yellow-400 sm:col-span-2 lg:col-span-3">
            <h2 className="text-xl font-semibold text-black mb-4 flex items-center">
              <FaKey className="mr-2 text-yellow-400" /> Banking Details
            </h2>
            <p className="text-black mb-2"><span className="font-medium">Account Holder Name:</span> {accountHolderName}</p>
            <p className="text-black mb-2"><span className="font-medium">Bank Name:</span> {bankName}</p>
            <p className="text-black mb-2"><span className="font-medium">Account Number:</span> {accountNumber}</p>
            <p className="text-black mb-2"><span className="font-medium">Branch Code:</span> {branchCode}</p>
            <p className="text-black mb-2"><span className="font-medium">Account Type:</span> {accountType}</p>
          </div>

          {/* Account Details Card */}
          <div className="bg-gray-50 shadow-lg rounded-lg p-6 border-l-4 border-yellow-400 sm:col-span-2 lg:col-span-3">
            <h2 className="text-xl font-semibold text-black mb-4 flex items-center">
              <FaKey className="mr-2 text-yellow-400" /> Account Details
            </h2>
            <p className="text-black mb-2"><span className="font-medium">Account Created:</span> {formatDate(createdAt)}</p>
            <p className="text-black mb-2"><span className="font-medium">Last Updated:</span> {formatDate(updatedAt)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
