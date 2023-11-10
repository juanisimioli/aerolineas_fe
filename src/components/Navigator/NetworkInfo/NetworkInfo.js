import { Button } from "@mui/material";
import { shortAddress } from "@/components/Utils/airportUtils";
import { useStyles } from "./styles";
import { Link, LinkOff } from "@mui/icons-material";

import { useMetamaskContext } from "@/contexts/useMetamaskContext";

const NetworkInfo = () => {
  const { classes } = useStyles();
  const {
    isMetamask,
    isAllowedChainId,
    wallet: { address },
    connectMetaMask,
  } = useMetamaskContext();

  return (
    <div className={classes.container}>
      {isAllowedChainId ? (
        <Link className={classes.success} />
      ) : (
        <>
          <p className={classes.error}>Use Sepolia network</p>
          <LinkOff className={classes.error} />
        </>
      )}

      {isMetamask && address ? (
        isAllowedChainId && <p>{shortAddress(address)}</p>
      ) : (
        <Button variant="contained" onClick={connectMetaMask}>
          Connect Wallet
        </Button>
      )}
    </div>
  );
};

export default NetworkInfo;
