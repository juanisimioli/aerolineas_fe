"use client";
import { useRouter } from "next/navigation";
import FlightCard from "@/components/FlightCard/FlightCard";
import { useAerolineasContext } from "@/contexts/AerolineasContext";
import { useToast } from "@/hooks/useToast";
import { useStyles } from "./styles";
import { Skeleton } from "@mui/material";
import useWeb3Provider from "@/hooks/useWeb3Provider";

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

  const { state, connectWallet, disconnect } = useWeb3Provider();

  console.log({ state });

  const { handleOpenToast } = useToast();

  const noFlightsAvailable = !Boolean(flightsInfo?.length);

  const handleTestClick = () => {
    console.log(handleOpenToast);
    handleOpenToast("success", "Flight Reserved");
  };

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
      <button onClick={connectWallet}>connect</button>
      <button onClick={disconnect}>disconnect</button>
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
      {/* TODO: remove this button */}
      <button onClick={handleTestClick}>click</button>
    </div>
  );
};

export default Flights;
