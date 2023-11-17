import { useStyles } from "./styles";
import { Button } from "@mui/material";
import metamaskIcon from "../../../../public/metamask-icon.svg";
import Image from "next/image";

const InstallMetamask = () => {
  const { classes } = useStyles();

  return (
    <div className={classes.container}>
      <Image width={70} src={metamaskIcon} />
      <Button
        className={classes.link}
        variant="contained"
        size="small"
        target="_blank"
        href="https://metamask.io/"
      >
        Install Metamask
      </Button>
    </div>
  );
};

export default InstallMetamask;
