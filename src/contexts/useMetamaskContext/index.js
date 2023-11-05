"use client";
import { createContext, useContext } from "react";

import useMetamask from "@/hooks/useMetamask";

const MetamaskContext = createContext(null);
MetamaskContext.displayName = "MetamaskContext";

export const MetamaskContextProvider = ({ children }) => {
  const {
    wallet,
    isMetamask,
    error,
    errorMessage,
    isConnecting,
    connectMetaMask,
    isAllowedChainId,
    clearError,
  } = useMetamask();

  const value = {
    wallet,
    isMetamask,
    error,
    errorMessage,
    isConnecting,
    connectMetaMask,
    isAllowedChainId,
    clearError,
  };

  return (
    <MetamaskContext.Provider value={value}>
      {children}
    </MetamaskContext.Provider>
  );
};

export const useMetamaskContext = () => {
  const context = useContext(MetamaskContext);

  if (!context)
    throw new Error(
      `useMetamaskContext must be used within MetamaskContextProvider`
    );

  return context;
};
