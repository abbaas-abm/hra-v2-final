import { useContext, createContext, useState, useEffect, type ReactNode } from "react";

// Define a more specific type for your context's value

interface AdminInfo {
  name: string,
  email: string,
  _id: string
}

interface AuthContextType {
  token: string | null;
  login: (newToken: string, driverInfo:AdminInfo) => void;
  logout: () => void;
  admin: AdminInfo | null;
}

// Initialize the context with a default value
export const AdminAuthContext = createContext<AuthContextType | null>(null);

export const AdminProvider = ({ children }: { children: ReactNode }) => {
  // Use state to manage the token
  const [token, setToken] = useState<string | null>(null);
  const [admin, setAdmin] = useState<AdminInfo | null>(null)
  // Use useEffect to load the token from local storage on initial render
  useEffect(() => {
    const storedToken = localStorage.getItem('admin_token');
    const storedDriver = localStorage.getItem('admin_info');
    if (storedToken && storedDriver) {
      setToken(storedToken);
      setAdmin(JSON.parse(storedDriver));
    }
  }, []); // The empty dependency array ensures this runs only once

  // Function to set the token and save it to local storage
  const login = (newToken: string, adminInfo:AdminInfo) => {
    setToken(newToken);
    setAdmin(adminInfo);
    localStorage.setItem('admin_token', newToken);
    localStorage.setItem('admin_info', JSON.stringify(adminInfo))
  };

  // Function to remove the token and clear it from local storage
  const logout = () => {
    setToken(null);
    localStorage.removeItem('admin_token');
    setAdmin(null);
    localStorage.removeItem('admin_info')
  };

  // The value object to be passed down through the context
  const value = { 
    token, 
    admin,
    login, 
    logout,
 };

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export default AdminProvider;

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error("useAdminAuth must be used within a Admin Provider");
  }
  return context;
};