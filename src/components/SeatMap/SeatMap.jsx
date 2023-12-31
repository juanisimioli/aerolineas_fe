"use client";
import { Skeleton } from "@mui/material";
import { AirplanemodeInactive } from "@mui/icons-material";
import Seat from "./Seat/Seat";
import { organizeSeats } from "./utils";
import { plane1 } from "@/config/planes.config";
import { useStyles } from "./styles";
import { useAerolineasContext } from "@/contexts/useAerolineasContext";

const { contiguousRows } = plane1;

const SeatMap = () => {
  const { classes } = useStyles();
  const {
    currentSeats,
    seatSelected,
    onSelectSeat,
    isLoadingSeats,
    currentFlight,
    reservationsInfoByAddress,
  } = useAerolineasContext();

  const organizedSeats = organizeSeats(currentSeats, contiguousRows);

  const noMoreSeats = Number(currentFlight?.seatsLeft) == 0;

  const alreadyTakenByAddress = reservationsInfoByAddress
    ?.map((res) => res.id)
    .includes(currentFlight.id);

  if (isLoadingSeats) return <Skeleton className={classes.skeleton} />;
  if (!Boolean(currentFlight)) return null;

  return (
    <>
      {!alreadyTakenByAddress && noMoreSeats && (
        <span className={classes.soldOut}>
          <AirplanemodeInactive />
          Sold Out
        </span>
      )}
      <div className={classes.planeSection}>
        {organizedSeats.map((rows, i) => (
          <div key={`mapSeatRow_${i}`} className={classes.rowsMap}>
            {rows.map((columns, i) => (
              <div key={`mapSeatColumn_${i}`} className={classes.columnsMap}>
                {columns?.map((seat) => (
                  <Seat
                    seat={seat}
                    key={seat.id}
                    seatSelected={seatSelected?.id}
                    onChange={onSelectSeat}
                  />
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

export default SeatMap;
