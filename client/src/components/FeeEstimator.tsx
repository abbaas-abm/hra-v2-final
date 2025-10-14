import { Link } from '@tanstack/react-router';
import React, { useState, useEffect } from 'react';

// Define the interface for the delivery details object
interface DeliveryDetails {
  items: {
    weight: number;
    numberOfItems: number;
  };
  stairs: number;
  truckType: 'Bakkie' | 'Minivan' | 'Truck';
}

// Define the interface for the calculation result object
interface CalculationResult {
  callOutFee: number;
  timeFee: number;
  fuelFee: number;
  massFee: number;
  itemFee: number;
  stairFee: number;
  total: number;
  timeNum: number;
}

// Main App component that holds the entire application
const App: React.FC = () => {
  const [weight, setWeight] = useState<number>(0);
  const [numberOfItems, setNumberOfItems] = useState<number>(0);
  const [truckType, setTruckType] = useState<'Bakkie' | 'Minivan' | 'Truck'>('Bakkie');
  const [hasStairs, setHasStairs] = useState<number>(0);
  const [totalCost, setTotalCost] = useState<number>(0);
  const [distance, setDistance] = useState<number>(0);
  const [estimatedTime, setEstimatedTime] = useState<number>(0);

  // This useEffect hook recalculates the cost whenever any of the input values change.
  useEffect(() => {
    // Estimate time based on weight and number of items
    const newEstimatedTime: number = 30 + (weight * 0.1) + (numberOfItems * 2);
    setEstimatedTime(newEstimatedTime);
    
    // Call the main calculation function with user-provided distance and estimated time
    const newCost: CalculationResult = calculateCost(distance, newEstimatedTime, {
      items: { weight, numberOfItems },
      stairs: hasStairs,
      truckType,
    });
    setTotalCost(newCost.total);
  }, [weight, numberOfItems, truckType, hasStairs, distance]);

  // CALCULATION LOGIC FUNCTIONS
  // These functions are adapted from the logic you provided.

  // CALCULATES TIME COST
  const timeCost = (time: number): number => time * 1.6783;

  // CALCULATES DISTANCE/FUEL COST
  const fuelCost = (distance: number): number => (distance * 9.1 / 100) * 32.42;

  // CALCULATES MASS COST based on a single weight number
  const massCost = (items: { weight: number }): { weightCost: number; totalWeight: number } => {
    let totalWeight: number = items.weight;
    let weightCost: number = totalWeight * 1;
    return { weightCost, totalWeight };
  };

  // CALCULATES ITEM COST based on the number of items
  const itemCost = (items: { numberOfItems: number }): number => items.numberOfItems;

  // CALCULATES STAIR COST
  const stairCost = (stairs: number): number => stairs * 50;
  
  // Main calculation function
  const calculateCost = (distance: number, time: number, deliveryDetails: DeliveryDetails): CalculationResult => {
    // Determine multipliers based on truck type
    let timeMultiplier: number = 1.0;
    let fuelMultiplier: number = 1.0;

    switch (deliveryDetails.truckType) {
      case 'Bakkie':
        timeMultiplier = 1.0;
        fuelMultiplier = 1.0;
        break;
      case 'Minivan':
        timeMultiplier = 1.2;
        fuelMultiplier = 1.1;
        break;
      case 'Truck':
        timeMultiplier = 1.5;
        fuelMultiplier = 1.3;
        break;
    }

    const distanceNum: number = +distance;
    const timeNum: number = +time * timeMultiplier;
    const fuelNum: number = distanceNum * fuelMultiplier;
  
    const timeFee: number = timeCost(timeNum);
    const fuelFee: number = fuelCost(fuelNum);
    const massFee: number = massCost(deliveryDetails.items).weightCost;
    const itemFee: number = itemCost(deliveryDetails.items);
    const stairFee: number = stairCost(deliveryDetails.stairs);
    
    const subTotal: number = timeFee + fuelFee + massFee + itemFee + stairFee;
    const callOutFee: number = subTotal <= 400 ? 200 : subTotal * 0.5;
  
    const total: number = callOutFee + timeFee + fuelFee + massFee + itemFee + stairFee;
  
    return {
      callOutFee, timeFee, fuelFee, massFee, itemFee, stairFee, total, timeNum
    };
  };

  return (
    <div data-aos="fade-up" className="flex flex-col items-center justify-center min-h-screen  p-4 font-sans">
      <script src="https://cdn.tailwindcss.com"></script>
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-2xl">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Delivery Cost Estimator</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Input for Weight */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Total Weight (kg)</label>
            <input
              type="number"
              value={weight}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setWeight(Math.max(0, parseFloat(e.target.value) || 0))}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              min="0"
            />
          </div>

          {/* Input for Number of Items */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Number of Items</label>
            <input
              type="number"
              value={numberOfItems}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNumberOfItems(Math.max(0, parseInt(e.target.value) || 0))}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              min="0"
            />
          </div>

          {/* Input for Stairs */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Number of Floors with Stairs</label>
            <input
              type="number"
              value={hasStairs}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setHasStairs(Math.max(0, parseInt(e.target.value) || 0))}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              min="0"
            />
          </div>

          {/* Select for Truck Type */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Truck Type</label>
            <select
              value={truckType}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setTruckType(e.target.value as 'Bakkie' | 'Minivan' | 'Truck')}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            >
              <option value="Bakkie">Bakkie</option>
              <option value="Minivan">Minivan</option>
              <option value="Truck">Truck</option>
            </select>
          </div>
        </div>
        
        {/* Slider for Distance */}
        <div className="mb-8">
          <label className="block text-gray-700 font-medium mb-2">
            Distance: <span className="text-lg font-bold text-yellow-600">{distance.toFixed(1)} km</span>
          </label>
          <input
            type="range"
            min="0"
            max="200"
            value={distance}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDistance(parseFloat(e.target.value))}
            className="w-full h-2 bg-yellow-100 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>

        {/* Estimated Values Display */}
        <div className="text-center text-gray-600 mb-4">
          <p>Estimated Time: <span className="font-semibold">{estimatedTime.toFixed(1)} mins</span></p>
        </div>

        {/* Estimated Cost Display */}
        <div className="text-center bg-gray-200 p-6 rounded-xl mb-6 shadow-inner">
          <h2 className="text-xl font-semibold text-gray-700">Estimated Delivery Cost</h2>
          <p className="text-5xl font-extrabold text-yellow-600 mt-2">
            R {totalCost.toFixed(2)}
          </p>
        </div>

        {/* Schedule Delivery Button */}
        <Link to='/services/delivery/order'>
          <button
          className="w-full py-4 bg-yellow-500 text-white font-bold rounded-xl shadow-lg hover:bg-yellow-600 transition-colors duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-yellow-400"
        >
          Schedule Delivery
        </button>
        </Link>
      </div>
    </div>
  );
}

export default App;
