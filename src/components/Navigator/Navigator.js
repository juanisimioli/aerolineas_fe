"use client";
import InstallMetamask from "@/components/Navigator/InstallMetamask/InstallMetamask";
import NetworkInfo from "./NetworkInfo/NetworkInfo";
import NavTabs from "./NavTabs/NavTabs";
import AerolineasLogo from "../AerolineasLogo/AerolineasLogo";
import { useStyles } from "./styles";
import { Skeleton } from "@mui/material";
import { useMetamaskContext } from "@/contexts/useMetamaskContext";

const Navigator = ({ children }) => {
  const { classes } = useStyles();
  const { isMetamask, isConnecting, isAllowedChainId, wallet } =
    useMetamaskContext();

  const isValidUsedOnMetamask =
    isMetamask && isAllowedChainId && Boolean(wallet?.address);

  return (
    <>
      {/* TODO: can be a <Header /> component */}
      <header className={classes.container}>
        <AerolineasLogo />
        {isConnecting ? (
          <Skeleton width={250} height={40} />
        ) : isMetamask ? (
          <NetworkInfo />
        ) : (
          <InstallMetamask />
        )}
      </header>

      {isValidUsedOnMetamask && (
        <div className={classes.content}>
          <NavTabs />
          {children}
        </div>
      )}
    </>
  );
};

export default Navigator;
