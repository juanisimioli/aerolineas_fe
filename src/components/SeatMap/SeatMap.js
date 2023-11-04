"use client";
import { useStyles } from "./styles";
import { useAerolineasContext } from "@/contexts/AerolineasContext";
import Seat from "./Seat/Seat";
import { organizeSeats } from "./utils";
import { plane1 } from "@/mock/planes.mock";
import { Skeleton } from "@mui/material";

const { contiguousRows } = plane1;

const SeatMap = () => {
  const { classes } = useStyles();
  const { currentSeats, seatSelected, onSelectSeat, isLoadingSeats } =
    useAerolineasContext();

  const organizedSeats = organizeSeats(currentSeats, contiguousRows);

  if (isLoadingSeats) return <Skeleton className={classes.skeleton} />;

  return (
    <div className={classes.plane}>
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
    </div>
  );
};

export default SeatMap;
