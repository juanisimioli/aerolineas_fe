import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
  infoContent: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
  },

  error: {
    color: "#ff7270",
    fontWeight: 700,
    textAlign: "center",
  },

  content: {
    paddingTop: "4rem",
    backgroundColor: theme.palette.background.main,
    minHeight: "100vh",
  },
}));

export { useStyles };
