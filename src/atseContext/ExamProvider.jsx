// MobileNumberContext.js
import React, { createContext, useState } from "react";

export const ExamContext = createContext();

export const ExamProvider = ({ children }) => {
  const [mobileNumber, setMobileNumber] = useState("");
  const [examNameData, setExamNameData] = useState("");
  console.log("mobileNumberContext", mobileNumber);
  console.log("examNameDataContext", examNameData);

  return (
    <ExamContext.Provider
      value={{ mobileNumber, setMobileNumber, examNameData, setExamNameData }}
    >
      {children}
    </ExamContext.Provider>
  );
};
