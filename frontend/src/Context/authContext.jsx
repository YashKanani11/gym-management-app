import { createContext, useState } from "react";

export const authContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setuser] = useState();
  return (
    <authContext.Provider value={{ user, setuser }}>
      {children}
    </authContext.Provider>
  );
};

export default AuthProvider;
