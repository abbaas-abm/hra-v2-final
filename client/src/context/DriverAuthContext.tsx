import { useContext, createContext, useState, useEffect, type ReactNode } from "react";

// Define a more specific type for your context's value

interface DriverInfo {
  name: string,
  email: string,
  _id: string
}

interface AuthContextType {
  token: string | null;
  login: (newToken: string, driverInfo:DriverInfo) => void;
  logout: () => void;
  driver: DriverInfo | null;
}

// Initialize the context with a default value
export const DriverAuthContext = createContext<AuthContextType | null>(null);

export const DriverProvider = ({ children }: { children: ReactNode }) => {
  // Use state to manage the token
  const [token, setToken] = useState<string | null>(null);
  const [driver, setDriver] = useState<DriverInfo | null>(null)
  // Use useEffect to load the token from local storage on initial render
  useEffect(() => {
    const storedToken = localStorage.getItem('driver_token');
    const storedDriver = localStorage.getItem('driver_info');
    if (storedToken && storedDriver) {
      setToken(storedToken);
      setDriver(JSON.parse(storedDriver));
    }
  }, []); // The empty dependency array ensures this runs only once

  // Function to set the token and save it to local storage
  const login = (newToken: string, driverInfo:DriverInfo) => {
    setToken(newToken);
    setDriver(driverInfo);
    localStorage.setItem('driver_token', newToken);
    localStorage.setItem('driver_info', JSON.stringify(driverInfo))
  };

  // Function to remove the token and clear it from local storage
  const logout = () => {
    setToken(null);
    localStorage.removeItem('driver_token');
    setDriver(null);
    localStorage.removeItem('driver_info')
  };

  // The value object to be passed down through the context
  const value = { 
    token, 
    driver,
    login, 
    logout,
 };

  return (
    <DriverAuthContext.Provider value={value}>
      {children}
    </DriverAuthContext.Provider>
  );
};

export default DriverProvider;

export const useDriverAuth = () => {
  const context = useContext(DriverAuthContext);
  if (!context) {
    throw new Error("useDriverAuth must be used within a DriverProvider");
  }
  return context;
};