import { FaMoneyBillWave, FaHandHoldingUsd, FaChartLine, FaShoppingCart } from 'react-icons/fa';

const RevenueDashboard = () => {
  // Dummy data for summary
  const summaryData = {
    earnings: 12500.75,
    payouts: 7800.50,
    profit: 4700.25
  };

  // Dummy data for orders
  const orders = [
    {
      orderId: "ORD001",
      driverName: "Sipho Nxumalo",
      amount: 350.25,
      date: "2025-09-20T10:30:00.000Z",
      status: "Completed"
    },
    {
      orderId: "ORD002",
      driverName: "John Doe",
      amount: 420.80,
      date: "2025-09-21T14:45:00.000Z",
      status: "Pending"
    },
    {
      orderId: "ORD003",
      driverName: "Lerabo Thabang",
      amount: 275.00,
      date: "2025-09-22T09:15:00.000Z",
      status: "Completed"
    }
  ];

  const formatCurrency = (amount:any) => {
    return new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR' }).format(amount);
  };

  const formatDate = (dateString:any) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-white p-4 sm:p-6 lg:p-8 w-full md:w-[1000px]">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-black mb-8 text-center flex items-center justify-center">
          <FaChartLine className="mr-2 text-yellow-500" /> Revenue Dashboard
        </h1>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          {/* Earnings Card */}
          <div className="bg-white shadow-lg rounded-lg p-6 border-l-4 border-yellow-400 hover:shadow-xl transition-shadow">
            <h2 className="text-xl font-semibold text-black mb-4 flex items-center">
              <FaMoneyBillWave className="mr-2 text-yellow-500" /> Earnings
            </h2>
            <p className="text-2xl font-bold text-black">{formatCurrency(summaryData.earnings)}</p>
          </div>

          {/* Payouts Card */}
          <div className="bg-white shadow-lg rounded-lg p-6 border-l-4 border-yellow-400 hover:shadow-xl transition-shadow">
            <h2 className="text-xl font-semibold text-black mb-4 flex items-center">
              <FaHandHoldingUsd className="mr-2 text-yellow-500" /> Payouts
            </h2>
            <p className="text-2xl font-bold text-black">{formatCurrency(summaryData.payouts)}</p>
          </div>

          {/* Profit Card */}
          <div className="bg-white shadow-lg rounded-lg p-6 border-l-4 border-yellow-400 hover:shadow-xl transition-shadow">
            <h2 className="text-xl font-semibold text-black mb-4 flex items-center">
              <FaChartLine className="mr-2 text-yellow-500" /> Profit
            </h2>
            <p className="text-2xl font-bold text-black">{formatCurrency(summaryData.profit)}</p>
          </div>
        </div>

        {/* Orders Table */}
        <div className="overflow-x-auto">
          <h2 className="text-2xl font-semibold text-black mb-4 flex items-center">
            <FaShoppingCart className="mr-2 text-yellow-500" /> Orders
          </h2>
          <table className="w-full table-auto border-collapse border border-yellow-300">
            <thead>
              <tr className="bg-yellow-100">
                <th className="px-4 py-3 text-left text-sm font-semibold text-black border-b border-yellow-300">Order ID</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-black border-b border-yellow-300">Driver Name</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-black border-b border-yellow-300">Amount</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-black border-b border-yellow-300">Date</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-black border-b border-yellow-300">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.orderId} className="hover:bg-yellow-50 transition-colors">
                  <td className="px-4 py-3 text-black border-b border-yellow-300">{order.orderId}</td>
                  <td className="px-4 py-3 text-black border-b border-yellow-300">{order.driverName}</td>
                  <td className="px-4 py-3 text-black border-b border-yellow-300">{formatCurrency(order.amount)}</td>
                  <td className="px-4 py-3 text-black border-b border-yellow-300">{formatDate(order.date)}</td>
                  <td className="px-4 py-3 border-b border-yellow-300">
                    <span className={`inline-block px-2 py-1 rounded-full text-sm ${
                      order.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RevenueDashboard;