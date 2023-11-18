"use client";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import useMetamask from "./useMetamask";

const useProviderAndSigner = () => {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);

  const {
    wallet: { address, chainId },
  } = useMetamask();

  const getProviderAndSigner = async (ethereum) => {
    try {
      const provider = new ethers.BrowserProvider(ethereum);
      const signer = address ? await provider.getSigner() : null;

      setProvider(provider);
      setSigner(signer);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const { ethereum } = window;
    if (!ethereum) return;
    getProviderAndSigner(ethereum);
  }, [address, chainId]);

  return { provider, signer };
};

export default useProviderAndSigner;
