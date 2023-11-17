import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
  infoContent: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
  },

  error: {
    color: theme.palette.network.offline,
    fontWeight: 700,
    textAlign: "center",
  },

  content: {
    paddingTop: 64,
    backgroundColor: theme.palette.background.main,
    minHeight: "100vh",
    paddingBottom: 32,
  },
}));

export { useStyles };
