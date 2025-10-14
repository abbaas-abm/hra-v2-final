const costs = require('../utils/calculateCosts');
const getDistanceAndTime = require('../utils/getDistanceAndTIme')
const getNearestPublicUniversity = require('../utils/geodesic')


const getCost = async (req, res) => {
  const { addressDetails, deliveryDetails, personalDetails } = req.body;
  
  // Pickup and DropOff addresses
  const pickupAddress = addressDetails.pickup;
  const dropoffAddress = addressDetails.dropoff;

  // const startAndEndLocation = 'University of Witwatersrand, 1 Jan Smuts Ave, Johannesburg, South Africa';
  const startAndEndLocation = await getNearestPublicUniversity(pickupAddress);
  
   try{

    // Call the Google Distance Matrix API
    // const googleResponse = await getDistanceAndTime(pickupAddress, dropoffAddress);

    // LEG 1 OF JOURNEY
    const leg1 = await getDistanceAndTime(startAndEndLocation, pickupAddress);
    // LEG 2 OF JOURNEY
    const leg2 = await getDistanceAndTime(pickupAddress, dropoffAddress);
    // LEG 3 OF JOURNEY  
    const leg3 = await getDistanceAndTime(dropoffAddress, startAndEndLocation);

    const cleanData = (data) => {
      return +data.split(' ')[0];
    }

     function cleanTime(duration1, duration2, duration3) {
      // Helper to parse individual duration strings like "3 hours 42 mins"
      const parseDuration = (durationStr) => {
        let totalMinutes = 0;

        const hrMatch = durationStr.match(/(\d+)\s*hour/);
        const minMatch = durationStr.match(/(\d+)\s*min/);

        if (hrMatch) totalMinutes += parseInt(hrMatch[1]) * 60;
        if (minMatch) totalMinutes += parseInt(minMatch[1]);

        return totalMinutes;
      };

      const total = parseDuration(duration1) + parseDuration(duration2) + parseDuration(duration3);
      return total;
}

    // Perform further calculations with the received distance and time
    const distance = cleanData(leg1.distance) + cleanData(leg2.distance) + cleanData(leg3.distance); 
    const duration = cleanTime(leg1.duration, leg2.duration, leg3.duration);

    const { timeNum } = costs(distance, duration, deliveryDetails);
    // Return Costs
    res.json({
        addressDetails,
        deliveryDetails,
        personalDetails,
        costs: costs(distance, duration, deliveryDetails),
        tripDetails: {
            distance,
            duration: timeNum < 60 ? `${(timeNum).toFixed(2)} mins`: `${(timeNum/ 60).toFixed(2)} hrs` },
    })
   }
   catch(err){
    throw new Error('Something Weng Wrong :(', err.message)
   }
}


module.exports = {getCost};