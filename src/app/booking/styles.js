import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
  container: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    width: "100%",
    height: "auto",
    padding: 16,
    paddingBottom: 240,
  },
}));

export { useStyles };
