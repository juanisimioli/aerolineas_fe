"use client";
import { useRouter } from "next/navigation";
import FlightCard from "@/components/FlightCard/FlightCard";
import { useAerolineasContext } from "@/contexts/AerolineasContext";
import { useStyles } from "./styles";
import { Skeleton } from "@mui/material";

const Flights = () => {
  const { classes } = useStyles();
  const router = useRouter();
  const {
    flightsInfo,
    reservationsInfoByAddress,
    onSelectFlight,
    isLoadingFlights,
  } = useAerolineasContext();

  const handleSelectFlight = async (flightId) => {
    router.push("/booking");
    await onSelectFlight(flightId);
  };

  const noFlightsAvailable = !Boolean(flightsInfo?.length);

  if (isLoadingFlights)
    return (
      <div className={classes.container}>
        {Array.from({ length: 4 }, (v, i) => (
          <Skeleton key={`skeleton_${i}`} className={classes.skeleton} />
        ))}
      </div>
    );

  return (
    <div className={classes.container}>
      {noFlightsAvailable ? (
        <p>No flights available</p>
      ) : (
        flightsInfo.map((flight, i) => (
          <FlightCard
            flight={flight}
            onSelectFlight={() => handleSelectFlight(flight.id)}
            reservationsInfoByAddress={reservationsInfoByAddress}
            key={`${flight.id}_${i}`}
          />
        ))
      )}
    </div>
  );
};

export default Flights;
