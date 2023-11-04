import { ethers } from "ethers";
import { useEffect, useState } from "react";
import useMetamask from "./useMetamask";

const useProvider = () => {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);

  const { addressConnected } = useMetamask();

  const getProviderAndSigner = async (ethereum) => {
    const provider = new ethers.BrowserProvider(ethereum);
    const signer = await provider.getSigner();

    setProvider(provider);
    setSigner(signer);
  };

  useEffect(() => {
    const { ethereum } = window;
    if (!ethereum) return;
    getProviderAndSigner(ethereum);
  }, [addressConnected]);

  return { provider, signer };
};

export default useProvider;