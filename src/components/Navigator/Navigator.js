"use client";
import InstallMetamask from "@/components/Navigator/InstallMetamask/InstallMetamask";
import NetworkInfo from "./NetworkInfo/NetworkInfo";
import { useMetamaskContext } from "@/contexts/MetamaskContext";
import NavTabs from "./NavTabs/NavTabs";
import AerolineasLogo from "../AerolineasLogo/AerolineasLogo";
import { useStyles } from "./styles";
import { Skeleton } from "@mui/material";

const Navigator = ({ children }) => {
  const { isMetamask, isLoadingMetamask, isValidChainId } =
    useMetamaskContext();
  const { classes } = useStyles();

  return (
    <>
      <header className={classes.container}>
        <AerolineasLogo />
        {isLoadingMetamask ? (
          <Skeleton width={250} height={40} />
        ) : isMetamask ? (
          <NetworkInfo />
        ) : (
          <InstallMetamask />
        )}
      </header>

      {isMetamask && isValidChainId && (
        <div className={classes.content}>
          <NavTabs />
          {children}
        </div>
      )}
    </>
  );
};

export default Navigator;
