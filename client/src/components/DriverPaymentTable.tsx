import { useNavigate } from '@tanstack/react-router';
import { FaCar, FaEnvelope, FaUser, FaUsers } from 'react-icons/fa';
import { FaMoneyBill1 } from 'react-icons/fa6';

const DriverPaymentTable = ({ drivers }:{drivers:any}) => {
  const navigate = useNavigate()

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
                  <div className="flex items-center">
                    <FaMoneyBill1 className="mr-2 text-yellow-500" /> Amount Due (R)
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {drivers.map((driver:any) => {
                return (
                <tr 
                key={driver._id} 
                className="hover:bg-yellow-50 transition-colors cursor-pointer"
                onClick={()=> navigate({to: `/dashboard/admin/driver-details/${driver._id}`})}
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
                </tr>
              )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DriverPaymentTable;