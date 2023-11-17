"use client";
import AerolineasLogo from "../AerolineasLogo/AerolineasLogo";
import NetworkInfo from "../Content/NetworkInfo/NetworkInfo";
import { useStyles } from "./styles";

const Header = () => {
  const { classes } = useStyles();
  return (
    <header className={classes.container}>
      <AerolineasLogo />
      <NetworkInfo />
    </header>
  );
};

export default Header;
