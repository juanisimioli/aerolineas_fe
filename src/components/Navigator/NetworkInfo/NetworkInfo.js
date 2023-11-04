import { Button } from "@mui/material";
import { useMetamaskContext } from "@/contexts/MetamaskContext";
import { shortAddress } from "@/components/Utils/airportUtils";
import { useStyles } from "./styles";
import { Link, LinkOff } from "@mui/icons-material";

const NetworkInfo = () => {
  const { classes } = useStyles();
  const {
    isMetamask,
    chainId,
    isValidChainId,
    addressConnected,
    connectWallet,
  } = useMetamaskContext();

  return (
    <div className={classes.container}>
      {isValidChainId ? (
        <Link className={classes.success} />
      ) : (
        <>
          <p className={classes.error}>Use Goerli network</p>
          <LinkOff className={classes.error} />
        </>
      )}

      {isMetamask && addressConnected ? (
        isValidChainId && <p>{shortAddress(addressConnected)}</p>
      ) : (
        <Button variant="contained" onClick={connectWallet}>
          Connect Wallet
        </Button>
      )}
    </div>
  );
};

export default NetworkInfo;
