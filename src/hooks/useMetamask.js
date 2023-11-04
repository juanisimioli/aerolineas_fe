"use client";
import { useEffect, useState } from "react";

const networkIds = {
  local: 1337,
  goerli: 5,
};

const useMetamask = () => {
  const [isMetamask, setIsMetamask] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [addressConnected, setAddressConnected] = useState("");
  const [chainId, setChainId] = useState(null);
  const [isLoadingMetamask, setIsLoadingMetamask] = useState(true);
  const isValidChainId = Object.values(networkIds).includes(chainId);

  const checkConnection = async () => {
    const { ethereum } = window;

    if (ethereum) {
      setIsMetamask(true);
      const accounts = await ethereum.request({ method: "eth_accounts" });
      const chainId = await ethereum.request({ method: "eth_chainId" });
      setChainId(parseInt(chainId));
      if (accounts.length > 0) {
        setIsConnected(true);
        setAddressConnected(accounts[0]);
      } else {
        setIsConnected(false);
        setAddressConnected(null);
      }
    } else {
      setIsMetamask(false);
    }
    setIsLoadingMetamask(false);
  };

  useEffect(() => {
    checkConnection();
  }, []);

  const getAccount = async () => {
    setIsLoadingMetamask(true);
    const accounts = await ethereum.request({ method: "eth_accounts" });
    setAddressConnected(accounts[0]);
    setIsLoadingMetamask(false);
  };

  const connectWallet = async () => {
    setIsLoadingMetamask(true);
    try {
      if (!ethereum || !isValidChainId) return;

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      setUserLoggedIn(true);
      setCurrentAccount(accounts[0]);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoadingMetamask(false);
    }
  };

  useEffect(() => {
    if (!isMetamask) return;

    ethereum.on("accountsChanged", getAccount);
    ethereum.on("chainChanged", (_chainId) => window.location.reload());

    return () => {
      ethereum.removeListener("accountsChanged", getAccount);
      ethereum.removeListener("chainChanged", (_chainId) =>
        window.location.reload()
      );
    };
  }, [isMetamask]);

  return {
    isMetamask,
    isConnected,
    addressConnected,
    chainId,
    isValidChainId,
    connectWallet,
    isLoadingMetamask,
  };
};

export default useMetamask;
