import { useEffect, useState } from "react";
import { ethers } from "ethers";
import useProviderAndSigner from "./useProviderAndSigner";
import { aggregatorV3InterfaceABI } from "../../contract/aggregatorV3InterfaceABI";
import { moveDecimal } from "@/components/Utils/utils";

// https://docs.chain.link/data-feeds/price-feeds/addresses?network=ethereum&page=1
const ethUsdSepolia = "0x694AA1769357215DE4FAC081bf1f309aDC325306";

const usePriceFeed = (priceSeatSelected) => {
  const [isCalculatingPrice, setIsCalculatingPrice] = useState(null);
  const [seatSelectedInUsd, setSeatSelectedInUsd] = useState();

  const { signer } = useProviderAndSigner();

  const priceFeed = new ethers.Contract(
    ethUsdSepolia,
    aggregatorV3InterfaceABI,
    signer
  );

  const getLatestRoundData = async () => {
    setIsCalculatingPrice(true);
    try {
      const roundData = await priceFeed.latestRoundData();
      return roundData.answer;
    } catch (e) {
      console.log(e);
    } finally {
      setIsCalculatingPrice(false);
    }
  };

  const calculatePriceInUsd = async () => {
    const roundData = await getLatestRoundData();

    const priceUsd =
      ethers.formatEther(priceSeatSelected) *
      moveDecimal(parseInt(roundData), 8);

    const priceUsd2decimal = parseFloat(priceUsd.toFixed(2)).toFixed(2);
    setSeatSelectedInUsd(priceUsd2decimal.toString());
  };

  useEffect(() => {
    if (priceSeatSelected) {
      calculatePriceInUsd();
    }
  }, [priceSeatSelected]);

  return { seatSelectedInUsd, isCalculatingPrice };
};

export default usePriceFeed;
