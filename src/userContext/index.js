import React, { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const UserInfoProvider = ({ children }) => {
  const [userEmail, setUserEmail] = useState(null);
  const [ownerID, setOwnerID] = useState(null);
  const [licenseID, setLicenseID] = useState(null);
  const [userPass, setUserPass] = useState(null);
  const [tenantID, setTenantID] = useState(null);

  const contextValues = { userEmail, setUserEmail, ownerID, setOwnerID, licenseID, setLicenseID, userPass, setUserPass, tenantID, setTenantID };

  return <UserContext.Provider value={contextValues}>{children}</UserContext.Provider>;
};

export function useUserInfo() {
  return useContext(UserContext);
}
