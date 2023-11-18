import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
  container: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    width: "100%",
    padding: "40px 10px",
    gap: 16,
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
