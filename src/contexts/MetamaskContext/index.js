"use client";
import { createContext, useContext } from "react";

import PropTypes from "prop-types";

import useMetamask from "@/hooks/useMetamask";

const MetamaskContext = createContext(null);
MetamaskContext.displayName = "MetamaskContext";

export const MetamaskContextProvider = ({ children }) => {
  const {
    isMetamask,
    isConnected,
    addressConnected,
    chainId,
    isValidChainId,
    connectWallet,
    isLoadingMetamask,
    signer,
  } = useMetamask();

  const value = {
    isMetamask,
    isConnected,
    addressConnected,
    chainId,
    isValidChainId,
    connectWallet,
    isLoadingMetamask,
    signer,
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

MetamaskContextProvider.propTypes = {
  children: PropTypes.object.isRequired,
};
