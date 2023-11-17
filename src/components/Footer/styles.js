import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    position: "fixed",
    bottom: 0,
    width: "100%",
    height: 38,
    backgroundColor: theme.palette.background.darkBlue,
    padding: "0px 32px",
    gap: 20,
    zIndex: 100,
    color: theme.palette.main.grey,
  },

  icon: {
    width: 20,
  },
}));

export { useStyles };
