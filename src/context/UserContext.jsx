import React, { createContext, useState, useContext } from "react";

const UserContext = createContext();

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const updateCurrentMap = (mapId) => {
    setUser((prevUser) => ({
      ...prevUser,
      current_map_id: mapId, // 更新地圖 ID
    }));
  };
  return (
    <UserContext.Provider value={{ user, setUser, updateCurrentMap }}>
      {children}
    </UserContext.Provider>
  );
};
