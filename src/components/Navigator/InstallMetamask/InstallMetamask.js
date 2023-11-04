import { useStyles } from "./styles";
import { Button } from "@mui/material";

const InstallMetamask = () => {
  const { classes } = useStyles();

  return (
    <Button
      className={classes.link}
      variant="contained"
      size="small"
      target="_blank"
      href="https://metamask.io/"
    >
      Install Metamask
    </Button>
  );
};

export default InstallMetamask;
