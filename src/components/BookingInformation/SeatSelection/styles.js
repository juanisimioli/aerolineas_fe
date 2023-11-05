import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    bottom: 0,
    backgroundColor: "#efeff2",
    padding: "0 1.5rem 0 0.5rem",
    transform: "rotate(180deg)",
    width: "100%",
  },

  seatSelectedInfo: {
    display: "flex",
    alignItems: "center",
    justifyContent: "end",
    gap: "1.2rem",
    width: "100%",
  },

  airplaneFab: {
    backgroundColor: "#2f3143",

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
    backgroundColor: "#ffd43c",
  },
  chipNoFunds: {
    backgroundColor: "#D0342C",
    color: "white",
  },
}));

export { useStyles };
