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
      {isMetamask && address ? (
        isAllowedChainId ? (
          <Link className={classes.success} />
        ) : (
          <>
            <LinkOff className={classes.error} />
            <p className={classes.error}>Use Sepolia</p>
          </>
        )
      ) : null}

      {isMetamask && address ? (
        isAllowedChainId && (
          <p className={classes.address}>{shortAddress(address)}</p>
        )
      ) : (
        <Button className={classes.connectButton} onClick={connectMetaMask}>
          Connect Wallet
        </Button>
      )}
    </div>
  );
};

export default NetworkInfo;
