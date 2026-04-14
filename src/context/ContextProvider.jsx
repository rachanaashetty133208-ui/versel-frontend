import { Children } from "react";
import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const authContext = createContext(); // cerate context

const ContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const login = (user) => {
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  useEffect(() => {
    const verify = async () => {
      try {
        const res = await axios.get("http://localhost:9000/api/auth/verify", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, //  this is for middleware
          },
        });
        if (res.data.success) {
          setUser(res.data.user);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error(error.response?.data || error.message); // Log the real backend/browser error to help debug future request failures
      }
    };
    verify();
  }, []);

  return (
    <authContext.Provider value={{ user, login, logout }}>
      {children}
    </authContext.Provider>
  );
};
export const useAuth = () => useContext(authContext);
export default ContextProvider;
