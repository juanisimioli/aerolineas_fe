"use client";
import { useStyles } from "./styles";
import { LinkedIn, GitHub } from "@mui/icons-material";
import Link from "next/link";

const Footer = () => {
  const { classes } = useStyles();
  return (
    <footer className={classes.container}>
      <p>made by juanisimioli</p>
      <Link href="https://www.linkedin.com/in/juanisimioli/" target="_blank">
        <LinkedIn className={classes.icon} />
      </Link>
      <Link
        href="https://github.com/juanisimioli/aerolineas_be"
        target="_blank"
      >
        <GitHub className={classes.icon} />
      </Link>
    </footer>
  );
};

export default Footer;
