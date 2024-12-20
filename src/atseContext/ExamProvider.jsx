// MobileNumberContext.js
import React, { createContext, useState } from "react";

export const ExamContext = createContext();

export const ExamProvider = ({ children }) => {
  const [mobileNumber, setMobileNumber] = useState("");
  const [userData, setUserData] = useState("");
  // const [, setUserData] = useState("");

  return (
    <ExamContext.Provider
      value={{ mobileNumber, setMobileNumber, userData, setUserData }}
    >
      {children}
    </ExamContext.Provider>
  );
};
