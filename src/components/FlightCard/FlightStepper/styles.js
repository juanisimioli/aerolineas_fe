import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
  icons: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: -17,
  },

  iconPlaneContainer: {
    width: 10,
    display: "flex",
    justifyContent: "center",
  },
}));

export { useStyles };
