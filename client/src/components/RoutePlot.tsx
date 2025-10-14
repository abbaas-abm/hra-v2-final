import  { useState, useEffect, useRef } from 'react';

// Add this declaration to let TypeScript know about window.google
declare global {
  interface Window {
    google: any;
  }
}

type RouteProps= {
  setPickup: (value:any) => void;
  setDropoff: (value:any) => void;
}

// Main App component
const RoutePlot = ({setPickup, setDropoff}:RouteProps) => {
  // State to hold the Google Maps API key. The user will replace this.
  const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  // State for map and services
  const mapRef = useRef<any>(null);
  const [map, setMap] = useState<any>(null);
  const [directionsService, setDirectionsService] = useState<any>(null);
  const [directionsRenderer, setDirectionsRenderer] = useState<any>(null);
  const [isApiLoaded, setIsApiLoaded] = useState<any>(false);

  // State for input values and coordinates
  const pickupInputRef = useRef<any>(null);
  const dropoffInputRef = useRef<any>(null);
  const [pickupPlace, setPickupPlace] = useState<any>(null);
  const [dropoffPlace, setDropoffPlace] = useState<any>(null);
  console.log(pickupPlace);
  console.log(dropoffPlace);

  // State for UI messages
  const [statusMessage, setStatusMessage] = useState('Enter a pickup and drop-off location.');
  
  // Function to dynamically load the Google Maps API script
  useEffect(() => {
    if (isApiLoaded) return;
    if (!API_KEY || API_KEY === 'YOUR_API_KEY_HERE') {
      setStatusMessage('Please provide a Google Maps API key in the code.');
      return;
    }

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places,routes`;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      setIsApiLoaded(true);
      setStatusMessage('API loaded. Enter your locations!');
    };
    script.onerror = () => {
      setStatusMessage('Failed to load Google Maps API. Check your API key or network connection.');
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [isApiLoaded, API_KEY]);

  // Initializes map and services once API is loaded
  useEffect(() => {
    if (!isApiLoaded) return;
    
    // Create map
    const newMap = new window.google.maps.Map(mapRef.current, {
      center: { lat: -26.2041, lng: 28.0473 }, // Default center: Johannesburg, South Africa
      zoom: 12,
      mapId: 'DEMO_MAP_ID', // Using a default map ID
      disableDefaultUI: true, // Hiding default map controls
    });
    setMap(newMap);

    // Create services
    const directionsService = new window.google.maps.DirectionsService();
    setDirectionsService(directionsService);

    const directionsRenderer = new window.google.maps.DirectionsRenderer({
      map: newMap,
      suppressMarkers: false, // Show default start and end markers
      polylineOptions: {
        strokeColor: '#faf089', // Tailwind yellow-500
        strokeWeight: 5,
        strokeOpacity: 0.8,
      },
    });
    setDirectionsRenderer(directionsRenderer);

    const autocompleteOptions = {
      fields: ['geometry', 'name', 'formatted_address'],
      componentRestrictions: { country: 'za' }, // Restrict to South Africa
    };

    // Initialize Autocomplete for pickup and drop-off inputs
    const pickupAutocomplete = new window.google.maps.places.Autocomplete(pickupInputRef.current, autocompleteOptions);
    pickupAutocomplete.addListener('place_changed', () => {
      const place = pickupAutocomplete.getPlace();
      setPickupPlace(place);
      setPickup(place)
    });

    const dropoffAutocomplete = new window.google.maps.places.Autocomplete(dropoffInputRef.current, autocompleteOptions);
    dropoffAutocomplete.addListener('place_changed', () => {
      const place = dropoffAutocomplete.getPlace();
      setDropoffPlace(place);
      setDropoff(place)
    });
  }, [isApiLoaded]);

  // Calculates and renders the route whenever locations change
  useEffect(() => {
    if (directionsService && directionsRenderer && pickupPlace && dropoffPlace) {
      const request = {
        origin: pickupPlace.geometry.location,
        destination: dropoffPlace.geometry.location,
        travelMode: window.google.maps.TravelMode.DRIVING,
      };

      directionsService.route(request, (result:any, status:any) => {
        if (status === 'OK') {
          directionsRenderer.setDirections(result);
          setStatusMessage('Route plotted successfully!');
        } else {
          setStatusMessage('Could not find a route. Try different locations.');
          directionsRenderer.setDirections({ routes: [] }); // Clear old route
        }
      });
    } else if (map) {
      // If a location is cleared, reset the map view
      directionsRenderer?.setDirections({ routes: [] });
      setMap(map);
      setStatusMessage('Enter a pickup and drop-off location.');
    }

  }, [directionsService, directionsRenderer, pickupPlace, dropoffPlace, map]);
  return (
    <div data-aos="fade-right" className="min-h-screen bg-gray-100 flex items-center justify-center p-4 antialiased font-sans w-full">
      <div className="relative w-full max-w-4xl h-[80vh] bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        {/* Map Container */}
        <div ref={mapRef} className="absolute inset-0 z-0"></div>

        {/* Overlay for input and UI */}
        <div className="relative z-10 w-full md:w-1/3 flex flex-col justify-start p-6 bg-white bg-opacity-90 backdrop-blur-sm rounded-xl m-4 shadow-xl">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Step 1</h1>
          <p className="text-gray-600 mb-6">Select a Pick-up and Drop-off location for your parcels</p>

          <div className="space-y-4">
            {/* Pickup Input */}
            <div>
              <label htmlFor="pickup" className="block text-sm font-medium text-gray-700">Pickup Location</label>
              <input
                id="pickup"
                ref={pickupInputRef}
                type="text"
                placeholder="Enter pickup location"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring focus:ring-yellow-500 focus:ring-opacity-50 transition duration-200 p-2 outline-none"
              />
            </div>
            
            {/* Drop-off Input */}
            <div>
              <label htmlFor="dropoff" className="block text-sm font-medium text-gray-700">Drop-off Location</label>
              <input
                id="dropoff"
                ref={dropoffInputRef}
                type="text"
                
                placeholder="Enter drop-off location"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring focus:ring-yellow-500 focus:ring-opacity-50 transition duration-200 p-2  outline-none"
              />
            </div>
          </div>
          
          {/* Status Message */}
          <div className="mt-6 p-4 bg-yellow-100 rounded-lg text-yellow-800 text-sm font-medium">
            {statusMessage}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoutePlot;
