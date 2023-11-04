import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
  container: {
    height: "4rem",
    backgroundColor: "white",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: "1rem 2rem",
    justifyContent: "space-between",

    position: "fixed",
    width: "100%",
    zIndex: "100",
  },

  content: {
    paddingTop: "4rem",
    backgroundColor: theme.palette.background.main,
    minHeight: "100vh",
  },
}));

export { useStyles };
