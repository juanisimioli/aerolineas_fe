import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    bottom: 0,
    backgroundColor: theme.palette.background.grey,
    padding: "0 8px 0 8px",
    transform: "rotate(180deg)",
    width: "100%",
  },

  seatSelectedInfo: {
    display: "flex",
    alignItems: "center",
    justifyContent: "end",
    gap: 12,
    width: "100%",
    paddingLeft: 12,
  },

  airplaneFab: {
    backgroundColor: theme.palette.background.purple,

    "&.MuiButtonBase-root": {
      minHeight: 20,
      width: 28,
      height: 28,
    },

    "& .MuiSvgIcon-root": {
      color: "white",
      fontSize: 15,
      transform: "rotate(45deg)",
    },
  },

  chipSeat: {
    color: "black",
    fontSize: 17,
    fontWeight: 800,
    minWidth: 60,
    backgroundColor: theme.palette.map.checked,
  },

  totalAmount: {
    display: "flex",
    flexWrap: "wrap",
    minWidth: 60,
    fontWeight: 700,
  },

  totalAmountUsd: {
    color: "green",
    fontWeight: 700,
  },

  loaderUsd: {
    color: "green",
  },

  chipNoFunds: {
    backgroundColor: theme.palette.status.darkRed,
    color: theme.palette.background.white,
  },
}));

export { useStyles };
