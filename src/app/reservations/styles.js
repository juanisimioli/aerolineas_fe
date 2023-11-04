import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "40px 10px 10px 10px",
    gap: 16,
    width: "100%",
    height: "auto",
  },
  skeleton: {
    transform: "none",
    maxWidth: 600,
    width: "100%",
    padding: "0 20px",
    height: 156,
    overflow: "hidden",
  },
}));

export { useStyles };
