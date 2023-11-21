import { useState, useEffect } from "react";
import { useAerolineasContext } from "@/contexts/useAerolineasContext";
import { calculateSeat } from "@/components/Utils/utils";
import { ethers } from "ethers";
import { Button, Chip, CircularProgress } from "@mui/material";
import { useStyles } from "./styles";
import { Flight } from "@mui/icons-material";
import { Fab, Tooltip } from "@mui/material";
import { useToast } from "@/hooks/useToast";
import { useMetamaskContext } from "@/contexts/useMetamaskContext";
import usePriceFeed from "@/hooks/usePriceFeed";

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

  const {
    wallet: { balance },
  } = useMetamaskContext();

  const { seatSelectedInUsd, isCalculatingPrice, isPriceInUsdAvailable } =
    usePriceFeed(seatSelected?.price);

  const { handleOpenToast } = useToast();

  const seat = calculateSeat(seatSelected?.row, seatSelected?.column);

  const etherPriceSelectedSeat =
    seatSelected?.price && ethers.formatUnits(seatSelected?.price, "ether");

  const noSufficientFunds = Number(etherPriceSelectedSeat) > Number(balance);

  const handleErrorReserveFlight = (error) => {
    handleOpenToast("error", error?.shortMessage);
    setIsWaitingEvent(false);
  };

  const handleReserveFlight = (e) => {
    e.stopPropagation();
    setIsWaitingEvent(true);
    reserveFlight(
      currentFlight.id,
      seatSelected.id,
      seatSelected.price,
      handleErrorReserveFlight
    );
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

  const FlightInfo = () => (
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
  );

  const OwnedSeat = () => (
    <p>{`You own seat ${seatAlreadySelected.name} on this flight`}</p>
  );

  return (
    <div className={classes.container}>
      <FlightInfo />
      {Boolean(seatAlreadySelected) && <OwnedSeat />}

      {seatSelected && !Boolean(seatAlreadySelected) && (
        <div className={classes.seatSelectedInfo}>
          <p className={classes.totalAmount}>
            {`${ethers.formatEther(seatSelected?.price)} ETH`}
          </p>
          {isPriceInUsdAvailable && (
            <p className={classes.totalAmountUsd}>
              {isCalculatingPrice ? (
                <CircularProgress size={14} className={classes.loaderUsd} />
              ) : (
                seatSelectedInUsd
              )}{" "}
              USD
            </p>
          )}
          <Chip className={classes.chipSeat} label={seat} />
          {isWaitingEvent ? (
            <CircularProgress />
          ) : noSufficientFunds ? (
            <Chip className={classes.chipNoFunds} label="No Funds" />
          ) : (
            <Button
              disabled={noSufficientFunds}
              variant="contained"
              onClick={handleReserveFlight}
            >
              Reserve
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default SeatSelection;
