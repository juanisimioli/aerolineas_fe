"use client";
import { Button } from "@mui/material";
import NavTabs from "./NavTabs/NavTabs";
import InstallMetamask from "./InstallMetamask/InstallMetamask";
import { useMetamaskContext } from "@/contexts/useMetamaskContext";
import { useStyles } from "./styles";

const Content = ({ children }) => {
  const { classes } = useStyles();
  const {
    isMetamask,
    isConnecting,
    isAllowedChainId,
    wallet: { address },
    connectMetaMask,
  } = useMetamaskContext();

  const isValidUsedOnMetamask =
    isMetamask && isAllowedChainId && Boolean(address);

  return (
    <>
      {isValidUsedOnMetamask ? (
        <div className={classes.content}>
          <NavTabs />
          {children}
        </div>
      ) : (
        <div className={classes.infoContent}>
          {!isConnecting ? (
            isMetamask ? (
              address ? (
                !isAllowedChainId && (
                  <p className={classes.error}>Connect to Sepolia Testnet</p>
                )
              ) : (
                <Button onClick={connectMetaMask} variant="contained">
                  Connect Wallet
                </Button>
              )
            ) : (
              <InstallMetamask />
            )
          ) : null}
        </div>
      )}
    </>
  );
};

export default Content;
