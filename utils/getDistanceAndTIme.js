const axios = require('axios');

// Function to get distance and time using Google API
async function getDistanceAndTime(pickupAddress, dropoffAddress) {
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(pickupAddress)}&destinations=${encodeURIComponent(dropoffAddress)}&key=${process.env.GOOGLE_API_KEY}`;
    
    try {
      const response = await axios.get(url);
      const element = response.data.rows[0].elements[0];
      
      if (element.status === 'OK') {
        const distance = element.distance.text; // "5.6 km"
        const duration = element.duration.text; // "15 mins"
        return { distance, duration };
      } else {
        throw new Error('Failed to get distance and time');
      }
    } catch (error) {
      throw new Error('Error fetching data from Google API: ' + error.message);
    }
  }  

module.exports = getDistanceAndTime