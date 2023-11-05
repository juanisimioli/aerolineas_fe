"use client";
import { ethers, getAddress } from "ethers";
import { useEffect, useState } from "react";
import { AerolineasContractAddress } from "../../config.js";
import Aerolineas from "../../../aerolineas_be/artifacts/contracts/Aerolineas.sol/Aerolineas.json";
import { calculateSeat } from "@/components/Utils/airportUtils";
import { useToast } from "./useToast";

import useProviderAndSigner from "./useProviderAndSigner.js";
import { useMetamaskContext } from "@/contexts/useMetamaskContext/index.js";

const useAerolineas = () => {
  const { signer } = useProviderAndSigner();
  const {
    wallet: { address, chainId },
  } = useMetamaskContext();
  const { handleOpenToast } = useToast();

  const [contract, setContract] = useState(null);
  const [fees, setFees] = useState(null);
  const [flightsInfo, setFlightsInfo] = useState([]);
  const [currentFlight, setCurrentFlight] = useState(null);
  const [currentSeats, setCurrentSeats] = useState([]);

  const [reservationsInfoByAddress, setReservationsInfoByAddress] = useState();
  const [seatAlreadySelected, setSeatAlreadySelected] = useState(null);
  const [seatSelected, setSeatSelected] = useState(null);

  const [isLoadingFlights, setIsLoadingFlights] = useState(null);
  const [isLoadingSeats, setIsLoadingSeats] = useState(null);
  const [isLoadingReservations, setIsLoadingReservations] = useState(null);

  ////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////
  ///////////////////////  getters  //////////////////////////
  ////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////

  const getFlight = async (_id) => {
    try {
      return await contract.getFlight(Number(_id));
    } catch (e) {
      console.log(e);
    }
  };

  const getFees = async () => {
    try {
      const [feeCancellation, feeResale] = await contract.getFees();
      setFees({ feeCancellation, feeResale });
    } catch (e) {
      console.log(e);
    }
  };

  const getInfoForAvailableFlights = async () => {
    setIsLoadingFlights(true);
    try {
      const availableFlights = await contract.getAvailableFlights();
      const flightsInfo = await Promise.all(
        availableFlights.map((flightId) => getFlight(flightId))
      );

      setFlightsInfo(flightsInfo);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoadingFlights(false);
    }
  };

  const getReservationInfoByAddress = async () => {
    setIsLoadingReservations(true);
    const reservationsIds = await contract.getReservationIdsByAddress();

    const reservationInfoByAddress = await Promise.all(
      reservationsIds.map((reservationId) => {
        try {
          return contract.getReservationInfoById(reservationId);
        } catch (e) {
          console.log(e);
        }
      })
    );

    const reservationAndFlightInfo = await Promise.all(
      reservationInfoByAddress.map(async (reservation) => {
        let flightInfo;
        flightInfo = flightsInfo.find((fli) => fli.id === reservation.flight);

        // If flight is not available, get flight information
        if (!Boolean(flightInfo)) {
          flightInfo = await contract.getFlight(reservation.flight);
        }

        const {
          reservation: reservationId,
          timestamp,
          price,
          column,
          row,
          seatStatus,
        } = reservation;
        const { flightNumber, from, to, departure, arrival, id, seatsLeft } =
          flightInfo;

        return {
          reservationId,
          flightNumber,
          from,
          to,
          departure,
          arrival,
          id,
          timestamp,
          price,
          column,
          row,
          seatStatus,
          seatsLeft,
        };
      })
    );

    setReservationsInfoByAddress(reservationAndFlightInfo);
    setIsLoadingReservations(false);
  };

  ////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////
  ///////////////////////  handlers  /////////////////////////
  ////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////

  const onSelectFlight = async (_flightId) => {
    setIsLoadingSeats(true);

    try {
      const flightData = await contract.getFlight(Number(_flightId));

      const seatsFromFlight = await contract.getSeatsFromFlight(
        Number(_flightId)
      );
      setCurrentSeats(seatsFromFlight);
      setCurrentFlight(flightData);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoadingSeats(false);
    }
  };

  const onSelectSeat = (e, id) => {
    if (e.target.checked) {
      const seatSelectedInfo = currentSeats.find(
        (seat) => Number(seat.id) === Number(id)
      );
      setSeatSelected(seatSelectedInfo);
    } else {
      setSeatSelected(null);
    }
  };

  ////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////
  ////////////////////////  setters  /////////////////////////
  ////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////

  const reserveFlight = async (_flightId, _seatId, _price, onError) => {
    try {
      const flightReserved = await contract.reserveFlight(_flightId, _seatId, {
        value: _price,
      });
      flightReserved.wait();
    } catch (e) {
      onError(e);
    }
  };

  const cancelReservation = async (_reservationId, onError) => {
    try {
      const reservationCanceled =
        await contract.cancelReservation(_reservationId);
      reservationCanceled.wait();
    } catch (e) {
      onError(e);
    }
  };

  const freeTransferReservation = async (_reservationId, _addressReceiver) => {
    try {
      const reservationTransferred = await contract.freeTransferReservation(
        _reservationId,
        _addressReceiver
      );
      reservationTransferred.wait();
      handleOpenToast("success", "Reservation transferred");
    } catch (e) {
      console.log(e);
    }
  };

  const resaleReservation = async (_reservationId, _priceForResale) => {
    console.log(
      "Resale reservation with new price ",
      _reservationId,
      _priceForResale
    );
    try {
      const resalePublished = await contract.resaleReservation(
        _reservationId,
        _priceForResale
      );
      resalePublished.wait();
      handleOpenToast("success", "Reservation published for resale");
    } catch (e) {
      console.log(e);
    }
  };

  const cancelResaleReservation = async (_reservationId) => {
    try {
      const cancelResaleReservation =
        await contract.undoResaleReservation(_reservationId);
      cancelResaleReservation.wait();
      handleOpenToast("success", "Resale canceled");
    } catch (e) {
      console.log(e);
    }
  };

  ////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////
  /////////////////////  useEFFECTS  /////////////////////////
  ////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////
  useEffect(() => {
    if (!signer) return;
    const AerolineasContract = new ethers.Contract(
      AerolineasContractAddress,
      Aerolineas.abi,
      signer
    );
    setContract(AerolineasContract);
  }, [signer, address, chainId]);

  useEffect(() => {
    if (!contract) return;
    getInfoForAvailableFlights();
    getReservationInfoByAddress();
    getFees();
  }, [contract, address, chainId]);

  useEffect(() => {
    if (!contract) return;
    getReservationInfoByAddress();
  }, [flightsInfo]);

  useEffect(() => {
    setSeatSelected(null);
    const reservationAlreadyOnFlight = reservationsInfoByAddress?.find(
      (resInfo) => resInfo.id === currentFlight?.id
    );

    const seatAlreadySelected = reservationAlreadyOnFlight
      ? {
          row: reservationAlreadyOnFlight.row,
          column: reservationAlreadyOnFlight.column,
          name: calculateSeat(
            reservationAlreadyOnFlight.row,
            reservationAlreadyOnFlight.column
          ),
        }
      : null;

    setSeatAlreadySelected(seatAlreadySelected);
  }, [reservationsInfoByAddress, currentFlight]);

  ////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////
  ////////////////////////  EVENTS  //////////////////////////
  ////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////
  const handleReservationMadeEvent = (
    reservationId,
    flightId,
    seatId,
    buyer
  ) => {
    if (getAddress(buyer) !== getAddress(address)) return;

    getInfoForAvailableFlights();
    handleOpenToast(
      "success",
      `Flight Reserved. Flight Id: ${flightId} - Seat Id: ${seatId}`
    );
  };

  const handleReservationCancelEvent = (reservationId, addressEvent) => {
    if (getAddress(addressEvent) !== getAddress(address)) return;
    getInfoForAvailableFlights();
    handleOpenToast("success", "Reservation Cancelled");
  };

  const handleReservationTransferredEvent = (
    _reservationId,
    _oldOwner,
    _newOwner
  ) => {
    if (getAddress(_oldOwner) === getAddress(address)) {
      getInfoForAvailableFlights();
      handleOpenToast("success", "Reservation transferred");
    } else if (getAddress(_newOwner) === getAddress(address)) {
      handleOpenToast("success", "You receive a reservation");
    }
  };

  const handleReservationOnResaleEvent = (_reservationId, _resalePrice) => {
    getInfoForAvailableFlights();
  };
  const handleUndoReservationOnResaleEvent = (_reservationId) => {
    getInfoForAvailableFlights();
  };

  // when contract is ready, subscribe to blockchain events
  useEffect(() => {
    if (!contract) return;
    contract.on("ReservationMade", handleReservationMadeEvent);
    contract.on("ReservationCanceled", handleReservationCancelEvent);
    contract.on("ReservationTransferred", handleReservationTransferredEvent);
    contract.on("ReservationOnResale", handleReservationOnResaleEvent);
    contract.on("UndoReservationOnResale", handleUndoReservationOnResaleEvent);

    return () => {
      contract.off("ReservationMade", handleReservationMadeEvent);
      contract.off("ReservationCanceled", handleReservationCancelEvent);
      contract.off("ReservationTransferred", handleReservationTransferredEvent);
      contract.off("ReservationOnResale", handleReservationOnResaleEvent);
      contract.off(
        "UndoReservationOnResale",
        handleUndoReservationOnResaleEvent
      );
    };
  }, [contract]);

  return {
    flightsInfo, // rename to availableFlightsInfo
    onSelectFlight,
    currentFlight,
    currentSeats,
    reserveFlight,
    reservationsInfoByAddress,
    cancelReservation,
    freeTransferReservation,
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
};

export default useAerolineas;
