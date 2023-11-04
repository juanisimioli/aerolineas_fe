import Box from "@mui/material/Box";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { styled } from "@mui/material/styles";
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

const BorderLinearProgress = styled(LinearProgress)(() => ({
  height: 2,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: "#E3E3E3",
    margin: "0 9px",
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: "#989FAF",
  },
}));

const FlightStepper = ({ step }) => {
  const { classes } = useStyles();
  const valueStepper = getValueStepper(step);

  return (
    <Box
      sx={{
        flexGrow: 1,
        marginTop: "12px",
        padding: "0 25px",
      }}
    >
      <BorderLinearProgress variant="determinate" value={valueStepper} />
      <div className={classes.icons}>
        <Brightness1Rounded
          style={{
            left: -20,
            fontSize: 10,
            color: step >= STEP.OnFlight ? "#989FAF" : "#E3E3E3",
          }}
        />
        <div
          className={classes.iconPlaneContainer}
          style={{
            order: step,
          }}
        >
          <AirplanemodeActive
            style={{
              transform: "rotate(90deg)",
              fontSize: 32,
              color: "#989FAF",
            }}
          />
        </div>
        <Brightness1Rounded
          style={{
            fontSize: 10,
            color: step === STEP.Arrived ? "#989FAF" : "#E3E3E3",
          }}
        />
      </div>
    </Box>
  );
};
export default FlightStepper;
