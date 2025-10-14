import React, { useState } from 'react';
import { FaCalendar, FaClock } from 'react-icons/fa';
import { FaStairs } from 'react-icons/fa6';


type PickUpAndDropOffProps = {
    setPickupT: (pickupTime:string) => void;
    // setDropoffT: (dropoffTime:string) => void;
    setDeliveryD: (deliveryD:string) => void;
    setStairs: (stairs:number) => void;
}


const PickUpAndDropOffForm = ({ setPickupT, setStairs, setDeliveryD}:PickUpAndDropOffProps) => {
  const [pickupTime, setPickupTime] = useState('');
  // const [dropoffTime, setDropoffTime] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [flightsOfStairs, setFlightsOfStairs] = useState(0);
  

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // In a real application, you would handle form submission here.
    // For now, we'll just log the values and show a message.
   
    
  };

  const stairOptions = [1,2,3,4,5,6,7,8,9,10,11,12];

  return (
    <div data-aos="fade-right" className="min-h-screen bg-white flex items-center justify-center p-4 sm:p-6 md:p-12 font-inter">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl p-6 sm:p-8 md:p-10 border border-yellow-500/20">
        
        {/* Header Section */}
        <div className="text-center mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-black mb-2">
            Step 2: Pick-up and Drop-off
          </h2>
          <p className="text-sm sm:text-base text-gray-400">
            Please provide your preferred pickup and drop-off times, as well as pick-up date, and let us know about the building access.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Pickup Time Field */}
          <div className="mb-6">
            <label htmlFor="pickup-date" className="block text-sm font-medium text-yellow-500 mb-2 flex items-center">
              <FaCalendar className='text-lg mr-3' /> Pick Up Date
            </label>
            <input
              type="date"
              id="pickup-date"
              className="w-full px-4 py-3 bg-gray-200 text-black border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 transition duration-300"
              value={deliveryDate}
              onChange={(e) => {
                setDeliveryDate(e.target.value)
                setDeliveryD(e.target.value)
            }}
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="pickup-time" className="block text-sm font-medium text-yellow-500 mb-2 flex items-center">
              <FaClock className='text-lg mr-3' /> Pick Up Time
            </label>
            <input
              type="time"
              id="pickup-time"
              className="w-full px-4 py-3 bg-gray-200 text-black border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 transition duration-300"
              value={pickupTime}
              onChange={(e) => {
                setPickupTime(e.target.value)
                setPickupT(e.target.value)
            }}
              required
            />
          </div>

          {/* Drop-off Time Field */}
          {/* <div className="mb-6">
            <label htmlFor="dropoff-time" className="block text-sm font-medium text-yellow-500 mb-2 flex items-center">
              <FaClock className='text-lg mr-3'/> Drop-off Time
            </label>
            <input
              type="time"
              id="dropoff-time"
              className="w-full px-4 py-3 bg-gray-200 text-black border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 transition duration-300"
              value={dropoffTime}
              onChange={(e) => {
                setDropoffTime(e.target.value)
                setDropoffT(e.target.value)
            }
            }
              required
            />
          </div> */}

          {/* Flights of Stairs Field */}
          <div className="mb-8">
            <label htmlFor="flights-of-stairs" className="block text-sm font-medium text-yellow-500 mb-2 flex items-center">
              <FaStairs className='text-lg mr-3'/> Flights of Stairs
            </label>
            <div className="relative">
              <select
                id="flights-of-stairs"
                className="block w-full px-4 py-3 bg-gray-200 text-black rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-yellow-500 transition duration-300 pr-10"
                value={flightsOfStairs}
                onChange={(e) => {
                    setFlightsOfStairs(+e.target.value);
                    setStairs(+e.target.value);
                }}
              >
                {stairOptions.map((option, index) => (
                  <option key={index} value={option}>{option}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-yellow">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PickUpAndDropOffForm;
