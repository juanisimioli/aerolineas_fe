import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
  container: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    color: theme.palette.text.black,
  },

  address: {
    color: "white",
  },

  error: {
    color: theme.palette.network.offline,
    fontWeight: 700,
    textAlign: "center",
  },

  success: {
    color: theme.palette.network.connected,
  },
}));

export { useStyles };
