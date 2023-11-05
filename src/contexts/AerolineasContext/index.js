"use client";
import { createContext, useContext } from "react";

import PropTypes from "prop-types";

import useAerolineas from "@/hooks/useAerolineas";

const AerolineasContext = createContext(null);
AerolineasContext.displayName = "AerolineasContext";

export const AerolineasContextProvider = ({ children }) => {
  const {
    availableFlights,
    flightsInfo,
    onSelectFlight,
    currentFlight,
    currentSeats,
    reservationsInfoByAddress,
    reserveFlight,
    freeTransferReservation,
    cancelReservation,
    resaleReservation,
    cancelResaleReservation,
    contract,
    seatSelected,
    onSelectSeat,
    isLoadingFlights,
    isLoadingReservations,
    isLoadingSeats,
    seatAlreadySelected,
    fees,
  } = useAerolineas();

  const value = {
    availableFlights,
    flightsInfo,
    onSelectFlight,
    currentFlight,
    currentSeats,
    reservationsInfoByAddress,
    reserveFlight,
    freeTransferReservation,
    cancelReservation,
    resaleReservation,
    cancelResaleReservation,
    contract,
    seatSelected,
    onSelectSeat,
    isLoadingFlights,
    isLoadingReservations,
    isLoadingSeats,
    seatAlreadySelected,
    fees,
  };

  return (
    <AerolineasContext.Provider value={value}>
      {children}
    </AerolineasContext.Provider>
  );
};

export const useAerolineasContext = () => {
  const context = useContext(AerolineasContext);

  if (!context)
    throw new Error(
      `useAerolineasContext must be used within AerolineasContextProvider`
    );

  return context;
};

AerolineasContextProvider.propTypes = {
  children: PropTypes.object.isRequired,
};
