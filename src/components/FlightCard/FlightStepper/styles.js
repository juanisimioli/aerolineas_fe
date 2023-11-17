import { makeStyles } from "tss-react/mui";
import STEP from "./FlightStepper";

const useStyles = makeStyles()((theme, { step }) => ({
  box: {
    flexGrow: 1,
    marginTop: 12,
    padding: "0 25px",
  },

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
    order: step,
  },

  airplane: {
    transform: "rotate(90deg)",
    fontSize: 32,
    color: theme.palette.main.violet,
  },

  linearProgress: {
    height: 2,
    borderRadius: 5,

    "&.MuiLinearProgress-colorPrimary": {
      backgroundColor: theme.palette.main.grey,
      margin: "0 9px",
    },

    "& .MuiLinearProgress-bar": {
      borderRadius: 5,
      backgroundColor: theme.palette.main.violet,
    },
  },

  roundedOne: {
    left: -20,
    fontSize: 10,
    color:
      step >= STEP.OnFlight
        ? theme.palette.main.violet
        : theme.palette.main.grey,
  },

  roundedTwo: {
    fontSize: 10,
    color:
      step === STEP.Arrived
        ? theme.palette.main.violet
        : theme.palette.main.grey,
  },
}));

export { useStyles };
