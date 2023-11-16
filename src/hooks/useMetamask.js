"use client";
import { useEffect, useState, useCallback } from "react";
import detectEthereumProvider from "@metamask/detect-provider";
import { ethers } from "ethers";

import { allowedNetworkIds } from "../../config";

const disconnectedState = {
  address: "",
  balance: "",
  chainId: "",
};

const checkIsAllowedChainId = (chainId) => {
  return Object.values(allowedNetworkIds).includes(chainId);
};

const formatBalance = (balance) => ethers.formatUnits(balance, "ether");

const useMetamask = () => {
  const [hasProvider, setHasProvider] = useState(null);
  const [isConnecting, setIsConnecting] = useState(true);
  const [isAllowedChainId, setIsAllowedChainId] = useState(false);
  const [wallet, setWallet] = useState(disconnectedState);

  const [errorMessage, setErrorMessage] = useState("");
  const clearError = () => setErrorMessage("");

  // useCallback ensures that you don't uselessly recreate the _updateWallet function on every render
  const _updateWallet = useCallback(async (providedAccounts) => {
    setIsConnecting(true);

    const accounts =
      providedAccounts ||
      (await window.ethereum.request({ method: "eth_accounts" }));

    if (accounts.length === 0) {
      // If there are no accounts, then the user is disconnected
      setWallet(disconnectedState);
      setIsConnecting(false);
      return;
    }

    const balance = formatBalance(
      await window.ethereum.request({
        method: "eth_getBalance",
        params: [accounts[0], "latest"],
      })
    );

    const chainIdHex = await window.ethereum.request({
      method: "eth_chainId",
    });

    const chainId = parseInt(chainIdHex);

    setIsAllowedChainId(checkIsAllowedChainId(chainId));
    setWallet({ address: accounts[0], balance, chainId });
    setIsConnecting(false);
  }, []);

  const updateWalletAndAccounts = useCallback(
    () => _updateWallet(),
    [_updateWallet]
  );

  const updateWallet = useCallback(
    (accounts) => _updateWallet(accounts),
    [_updateWallet]
  );

  /**
   * This logic checks if MetaMask is installed. If it is, some event handlers are set up
   * to update the wallet state when MetaMask changes. The function returned by useEffect
   * is used as a "cleanup": it removes the event handlers whenever the MetaMaskProvider
   * is unmounted.
   */
  useEffect(() => {
    const getProvider = async () => {
      const provider = await detectEthereumProvider({ silent: true });
      setHasProvider(Boolean(provider));

      if (provider) {
        updateWalletAndAccounts();
        window.ethereum.on("accountsChanged", updateWallet);
        window.ethereum.on("chainChanged", updateWalletAndAccounts);
      }
    };

    getProvider();

    return () => {
      window.ethereum?.removeListener("accountsChanged", updateWallet);
      window.ethereum?.removeListener("chainChanged", updateWalletAndAccounts);
    };
  }, [updateWallet, updateWalletAndAccounts]);

  useEffect(() => {
    if (!hasProvider) setIsConnecting(false);
  }, [hasProvider]);

  const connectMetaMask = async () => {
    setIsConnecting(true);

    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      clearError();
      updateWallet(accounts);
    } catch (err) {
      setErrorMessage(err.message);
    }
    setIsConnecting(false);
  };

  return {
    clearError,
    connectMetaMask,
    error: !!errorMessage,
    errorMessage,
    isAllowedChainId,
    isConnecting,
    isMetamask: true,
    wallet,
  };
};

export default useMetamask;
