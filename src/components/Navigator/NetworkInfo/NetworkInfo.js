import { shortAddress } from "@/components/Utils/airportUtils";
import { useStyles } from "./styles";
import { Link, LinkOff } from "@mui/icons-material";
import { useMetamaskContext } from "@/contexts/useMetamaskContext";
import { Skeleton } from "@mui/material";

const NetworkInfo = () => {
  const { classes } = useStyles();
  const {
    isAllowedChainId,
    isConnecting,
    wallet: { address },
  } = useMetamaskContext();

  return isConnecting ? (
    <Skeleton width={250} height={40} />
  ) : (
    <div className={classes.container}>
      {isAllowedChainId ? (
        address && (
          <>
            <Link className={classes.success} />
            <p className={classes.address}>{shortAddress(address)}</p>
          </>
        )
      ) : (
        <LinkOff className={classes.error} />
      )}
    </div>
  );
};

export default NetworkInfo;
