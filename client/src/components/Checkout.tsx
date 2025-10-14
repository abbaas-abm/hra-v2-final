import React, { useState } from 'react';
import { FaMapMarkerAlt, FaCalendarAlt, FaTruck, FaBox, FaCreditCard, FaUser, FaInfoCircle } from 'react-icons/fa';

const CheckoutForm = ({responseCost}: {responseCost:any}) => {
  const [paymentMethod, setPaymentMethod] = useState('Payfast');

  const deliveryData = responseCost;

  const {
    addressDetails,
    deliveryDetails,
    personalDetails,
    costs,
    tripDetails,
  } = deliveryData;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Placing order with payment method:', paymentMethod);
    // Add API call or further logic here
  };

  const InfoCard = ({ icon, title, children }: { icon:any, title:any, children:any }) => (
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-yellow-200">
      <div className="flex items-center text-yellow-300 mb-3">
        {icon}
        <h3 className="ml-3 text-lg font-bold text-gray-800">{title}</h3>
      </div>
      <div className="text-gray-600 space-y-2 text-sm sm:text-base">
        {children}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-yellow-50 flex items-center justify-center p-4" data-aos="fade-in">
      <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 md:p-10 w-full max-w-3xl border-t-8 border-yellow-300">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 tracking-tight">
            Checkout
          </h1>
          <p className="text-gray-500 mt-2 text-sm sm:text-base">
            Review your order and select a payment method to complete the booking.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Delivery & Personal Details */}
            <InfoCard icon={<FaUser size={20} />} title="Personal Details">
              <p className="font-semibold text-gray-800">{personalDetails.firstname} {personalDetails.lastname}</p>
              <p className="font-medium text-gray-700">{personalDetails.email}</p>
              <p className="text-gray-700">{personalDetails.mobile}</p>
              {personalDetails.message && (
                <div className="mt-2 text-gray-500">
                  <span className="font-semibold text-gray-700">Notes: </span>
                  {personalDetails.message}
                </div>
              )}
            </InfoCard>

            <InfoCard icon={<FaMapMarkerAlt size={20} />} title="Trip Summary">
              <p className="font-semibold text-gray-800">
                <span className="font-medium text-gray-700">From: </span>
                {addressDetails.pickup}
              </p>
              <p className="font-semibold text-gray-800">
                <span className="font-medium text-gray-700">To: </span>
                {addressDetails.dropoff}
              </p>
              <div className="flex flex-col justify-between items-center mt-2 pt-2 border-t border-yellow-100">
                <p>
                  <FaTruck className="inline-block mr-2 text-yellow-300" />
                  Distance: {tripDetails.distance} km
                </p>
                <p>
                  <FaCalendarAlt className="inline-block mr-2 text-yellow-300" />
                  Duration: {tripDetails.duration}
                </p>
              </div>
            </InfoCard>
          </div>

          {/* Items & Costs Section */}
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-yellow-200 mb-8">
            <div className="flex items-center text-yellow-300 mb-4">
              <FaBox size={20} />
              <h3 className="ml-3 text-lg font-bold text-gray-800">Items & Total</h3>
            </div>
            <ul className="divide-y divide-gray-200 text-sm sm:text-base">
              {deliveryDetails.items.map((item:any, index:any) => (
                <li key={index} className="py-3 flex justify-between items-center text-gray-700">
                  <span className="font-medium">{item.quantity} x {item.name}</span>
                  <span className="text-gray-500">{item.weight} kg each</span>
                </li>
              ))}
            </ul>
            <div className="flex justify-between items-center mt-4 pt-4 border-t border-yellow-200">
              <span className="text-xl font-bold text-gray-800">Total</span>
              <span className="text-2xl font-extrabold text-yellow-300">
                R{costs.total.toFixed(2)}
              </span>
            </div>
          </div>
          
          {/* Payment Method Section */}
          <div className="mb-8">
            <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
              <FaInfoCircle className="text-yellow-600 mr-2" />
              Select Payment Method
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                type="button"
                className={`flex flex-col items-center p-6 rounded-xl border-2 transition-all duration-300 ${
                  paymentMethod === 'Payfast'
                    ? 'border-yellow-500 bg-yellow-50 shadow-md'
                    : 'border-gray-300 hover:border-yellow-400'
                }`}
                onClick={() => setPaymentMethod('Payfast')}
              >
                <FaCreditCard className="text-4xl text-yellow-600 mb-2" />
                <span className="font-semibold text-lg text-gray-800">Payfast</span>
                <p className="text-xs text-gray-500 mt-1 text-center">
                  Pay securely with card or instant EFT.
                </p>
              </button>
            </div>
          </div>
          
         
        </form>
      </div>
    </div>
  );
};

export default CheckoutForm;