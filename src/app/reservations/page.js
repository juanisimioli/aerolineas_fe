"use client";
import { useAerolineasContext } from "@/contexts/AerolineasContext";
import FlightCard from "@/components/FlightCard/FlightCard";
import { useStyles } from "./styles";
import { Skeleton } from "@mui/material";

const Reservations = () => {
  const { reservationsInfoByAddress, isLoadingReservations } =
    useAerolineasContext();
  const { classes } = useStyles();

  const noReservations = !Boolean(reservationsInfoByAddress?.length);

  if (isLoadingReservations)
    return (
      <div className={classes.container}>
        {Array.from({ length: 4 }, (v, i) => (
          <Skeleton key={`skeleton_${i}`} className={classes.skeleton} />
        ))}
      </div>
    );

  return (
    <div className={classes.container}>
      {noReservations ? (
        <p>No reservations yet</p>
      ) : (
        reservationsInfoByAddress.map((reservation, i) => (
          <FlightCard reservation={reservation} key={`FC_${i}`} />
        ))
      )}
    </div>
  );
};

export default Reservations;
