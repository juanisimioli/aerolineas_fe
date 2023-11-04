import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
  checkboxLabel: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    cursor: "pointer",
    width: "100%",
    height: 40,
  },

  checkboxInput: {
    appearance: "none" /* Remove default checkbox styles */,
    outline: "none" /* Remove the checkbox outline */,
    width: "100%",
    height: "100%",
    cursor: "pointer",
    backgroundColor: theme.palette.map.available,
    borderRadius: 1,

    "&:checked": {
      backgroundColor: theme.palette.map.checked,
    },

    "&:disabled": {
      cursor: "default",
      backgroundColor: theme.palette.map.taken,
    },
  },

  seatAlreadySelected: {
    width: "100%",
    backgroundColor: `${theme.palette.map.alreadyTaken} !important`,
  },

  noPointer: {
    cursor: "default",
  },

  iconResale: {
    position: "absolute",
    color: theme.palette.map.iconResale,
  },
}));

export { useStyles };
