import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import { AirplanemodeActive, Brightness1Rounded } from "@mui/icons-material";
import { useStyles } from "./styles";

export const STEP = {
  Departure: -1,
  OnFlight: 0,
  Arrived: 1,
};

function getValueStepper(step) {
  switch (step) {
    case STEP.Departure:
      return 0;
    case STEP.OnFlight:
      return 50;
    case STEP.Arrived:
      return 100;
    default:
      return 0;
  }
}

const FlightStepper = ({ step }) => {
  const { classes } = useStyles({ step });
  const valueStepper = getValueStepper(step);

  return (
    <Box className={classes.box}>
      <LinearProgress
        className={classes.linearProgress}
        variant="determinate"
        value={valueStepper}
      />
      <div className={classes.icons}>
        <Brightness1Rounded className={classes.roundedOne} />
        <div className={classes.iconPlaneContainer}>
          <AirplanemodeActive className={classes.airplane} />
        </div>
        <Brightness1Rounded className={classes.roundedTwo} />
      </div>
    </Box>
  );
};
export default FlightStepper;
