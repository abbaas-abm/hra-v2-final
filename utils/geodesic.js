const axios = require("axios");

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_API_KEY;

const universities = [
  { name: "University of Cape Town", lat: -33.9570, lng: 18.4607 },
  { name: "Stellenbosch University", lat: -33.9321, lng: 18.8602 },
  { name: "University of the Western Cape", lat: -33.9333, lng: 18.6333 },
  { name: "Cape Peninsula University of Technology", lat: -33.9253, lng: 18.4239 },
  { name: "University of the Witwatersrand", lat: -26.1910, lng: 28.0309 },
  { name: "University of Johannesburg", lat: -26.1820, lng: 28.0240 },
  { name: "University of Pretoria", lat: -25.7545, lng: 28.2314 },
  { name: "Tshwane University of Technology", lat: -25.7313, lng: 28.1830 },
  { name: "University of South Africa (UNISA)", lat: -25.7677, lng: 28.1990 },
  { name: "North-West University", lat: -26.6894, lng: 27.0932 },
  { name: "Vaal University of Technology", lat: -26.7115, lng: 27.8490 },
  { name: "University of Limpopo", lat: -23.8844, lng: 29.7373 },
  { name: "University of Venda", lat: -22.9754, lng: 30.4449 },
  { name: "University of the Free State", lat: -29.1074, lng: 26.1890 },
  { name: "Central University of Technology", lat: -29.1200, lng: 26.2110 },
  { name: "Rhodes University", lat: -33.3155, lng: 26.5200 },
  { name: "Nelson Mandela University", lat: -33.9714, lng: 25.6030 },
  { name: "Walter Sisulu University", lat: -31.6013, lng: 28.7844 },
  { name: "University of Fort Hare", lat: -32.7850, lng: 26.8344 },
  { name: "University of KwaZulu-Natal", lat: -29.8672, lng: 30.9809 },
  { name: "Durban University of Technology", lat: -29.8544, lng: 30.9580 },
  { name: "Mangosuthu University of Technology", lat: -29.9706, lng: 30.9922 },
  { name: "University of Zululand", lat: -28.8530, lng: 31.8472 },
  { name: "Sol Plaatje University", lat: -28.7383, lng: 24.7633 },
  { name: "Sefako Makgatho Health Sciences University", lat: -25.6220, lng: 28.0231 },
  { name: "University of Mpumalanga", lat: -25.4661, lng: 30.9855 },
];

/**
 * Haversine distance formula (Calculates the great-circle distance between two points on a sphere)
 * @param {number} lat1 Latitude of point 1 (in degrees)
 * @param {number} lng1 Longitude of point 1 (in degrees)
 * @param {number} lat2 Latitude of point 2 (in degrees)
 * @param {number} lng2 Longitude of point 2 (in degrees)
 * @returns {number} Distance in kilometers
 */
function getDistance(lat1, lng1, lat2, lng2) {
  const R = 6371; // Radius of Earth in kilometers
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLng = (lng2 - lng1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * (Math.PI / 180)) *
    Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLng / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * Finds the nearest public university from a given location and returns its name.
 * * @param {string} address - The starting address, e.g., "1029, Lenasia South, Ext 1".
 * @returns {Promise<string>} - The name of the nearest university, e.g., "University of the Witwatersrand".
 */
async function getNearestPublicUniversity(address) {
  if (!GOOGLE_MAPS_API_KEY) {
    return "Error: GOOGLE_MAPS_API_KEY is not set in environment variables.";
  }

  try {
    // 1️⃣ Geocode input address to get starting coordinates (lat/lng)
    const geoResponse = await axios.get(
      "https://maps.googleapis.com/maps/api/geocode/json",
      {
        params: { address, key: GOOGLE_MAPS_API_KEY },
      }
    );

    if (geoResponse.data.status !== 'OK' || !geoResponse.data.results.length) {
      throw new Error(`Geocoding failed. Status: ${geoResponse.data.status}`);
    }

    const { lat, lng } = geoResponse.data.results[0].geometry.location;

    // 2️⃣ Find nearest university using the Haversine formula
    let nearest = universities[0];
    let minDistance = getDistance(lat, lng, nearest.lat, nearest.lng);

    for (const uni of universities.slice(1)) {
      const dist = getDistance(lat, lng, uni.lat, uni.lng);
      if (dist < minDistance) {
        nearest = uni;
        minDistance = dist;
      }
    }

    // 3️⃣ Reverse-geocode the nearest university's coordinates to get its full address string
    // This step is to fulfill the requirement of returning the 'address of that university as a string'.
    // NOTE: The example output (e.g., "University Of Witwatersrant") suggests the NAME is sufficient, 
    // but the full requirement asks for the "address of that university as a string". We will combine both.
    const reverseGeo = await axios.get(
      "https://maps.googleapis.com/maps/api/geocode/json",
      {
        params: {
          latlng: `${nearest.lat},${nearest.lng}`,
          key: GOOGLE_MAPS_API_KEY,
        },
      }
    );

    let finalAddress = nearest.name;
    if (reverseGeo.data.results.length > 0) {
        // Use the formatted_address, which is a full, human-readable address string
        const formattedAddress = reverseGeo.data.results[0].formatted_address;
        
        // Return the name followed by the formatted address
        finalAddress = `${nearest.name}, ${formattedAddress}`;
    }

    // 4️⃣ Return the university name and its full address string
    // e.g., "University of the Witwatersrand, 1 Jan Smuts Ave, Johannesburg, 2000, South Africa"
    return finalAddress; 

  } catch (error) {
    // In a real application, you'd log the full error
    console.error(`Error finding nearest university for "${address}":`, error.message);
    return `Unable to process location: ${address}.`;
  }
}

// --- Example Usage and Testing ---

// (async () => {
//     // NOTE: For this to work, you must run it with your GOOGLE_MAPS_API_KEY set.
//     // e.g. GOOGLE_MAPS_API_KEY='YOUR_KEY' node yourfile.js

//     const testLocation1 = "1029, Lenasia South, Ext 1, South Africa";
//     const result1 = await getNearestPublicUniversity(testLocation1);
//     console.log(`\nInput: ${testLocation1}`);
//     console.log(`Output: ${result1}`); 
//     // Expected Output (Approximate): University of the Witwatersrand, ...

//     const testLocation2 = "xyz 123, Tzaneen, Limpopo, South Africa"; 
//     const result2 = await getNearestPublicUniversity(testLocation2);
//     console.log(`\nInput: ${testLocation2}`);
//     console.log(`Output: ${result2}`); 
//     // Expected Output (Approximate): University of Limpopo, ...
// })();

module.exports = getNearestPublicUniversity;