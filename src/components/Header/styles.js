import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    position: "fixed",
    width: "100%",
    height: 64,
    backgroundColor: theme.palette.background.blue,
    padding: "16px 32px",
    gap: 24,
    zIndex: 100,
  },
}));

export { useStyles };
