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
    color: "#ff7270",
    fontWeight: 700,
    textAlign: "center",
  },

  success: {
    color: "#44ce7e",
  },
}));

export { useStyles };
