import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
  container: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    color: theme.palette.text.black,
  },

  error: {
    color: "red",
  },

  success: {
    color: "green",
  },
}));

export { useStyles };
