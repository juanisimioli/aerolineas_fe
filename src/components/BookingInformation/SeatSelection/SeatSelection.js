import { useState, useEffect } from "react";
import { useAerolineasContext } from "@/contexts/AerolineasContext";
import { calculateSeat } from "@/components/Utils/airportUtils";
import { ethers } from "ethers";
import { Button, Chip, CircularProgress } from "@mui/material";
import { useStyles } from "./styles";
import { Flight } from "@mui/icons-material";
import { Fab, Tooltip } from "@mui/material";

const SeatSelection = () => {
  const { classes } = useStyles();
  const [isWaitingEvent, setIsWaitingEvent] = useState(false);
  const {
    currentFlight,
    reserveFlight,
    seatSelected,
    seatAlreadySelected,
    contract,
  } = useAerolineasContext();

  const seat = calculateSeat(seatSelected?.row, seatSelected?.column);

  const handleReserveFlight = (e) => {
    e.stopPropagation();
    setIsWaitingEvent(true);
    reserveFlight(currentFlight.id, seatSelected.id, seatSelected.price);
  };

  const handleReservationMadeEvent = () => {
    setIsWaitingEvent(false);
  };

  useEffect(() => {
    if (!contract) return;
    contract.on("ReservationMade", handleReservationMadeEvent);

    return () => {
      contract.off("ReservationMade", handleReservationMadeEvent);
    };
  }, [contract]);

  return (
    <div className={classes.container}>
      <div>
        <Tooltip title="Flight Info" placement="top">
          <Fab
            className={classes.airplaneFab}
            color="primary"
            aria-label="Flight Info"
          >
            <Flight />
          </Fab>
        </Tooltip>
      </div>
      {Boolean(seatAlreadySelected) && (
        <div>{`You own seat ${seatAlreadySelected.name} on this flight`}</div>
      )}
      {seatSelected && !Boolean(seatAlreadySelected) && (
        <div className={classes.seatSelectedInfo}>
          {`Total ${ethers.formatEther(seatSelected?.price)} ETH `}
          <Chip className={classes.chipSeat} label={seat} />
          {isWaitingEvent ? (
            <CircularProgress />
          ) : (
            <Button variant="contained" onClick={handleReserveFlight}>
              Reserve
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default SeatSelection;
