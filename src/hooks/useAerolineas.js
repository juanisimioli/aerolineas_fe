"use client";

import { ethers, getAddress } from "ethers";
import { useEffect, useState } from "react";
import useProvider from "./useProvider";
import { AerolineasContractAddress } from "../../config.js";
import Aerolineas from "../../../aerolineas_be/artifacts/contracts/Aerolineas.sol/Aerolineas.json";
import useMetamask from "./useMetamask";
import { calculateSeat } from "@/components/Utils/airportUtils";
import { useToast } from "./useToast";

const useAerolineas = () => {
  const { signer, provider } = useProvider();
  const { addressConnected, chainId } = useMetamask();
  const [contract, setContract] = useState(null);
  // const [contractProvider, setContractProvider] = useState(null);
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

  const { handleOpenToast } = useToast();

  ////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////
  ///////// TODO: remove this from here and contract /////////
  ////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////

  const emitEvents = async () => {
    const event = await contract.emitEvents();
    event.wait();
  };

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
    // await setTimeout(async () => {
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
    // }, 2000);
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

  const reserveFlight = async (_flightId, _seatId, _price) => {
    try {
      const flightReserved = await contract.reserveFlight(_flightId, _seatId, {
        value: _price,
      });
      flightReserved.wait();
    } catch (e) {
      const error = contract.interface.parseError(e.data);
      handleOpenToast("error", error.name);
    } finally {
      // console.log("getting reservations again");
      // await getReservationIdsByAddress();
    }
  };

  const cancelReservation = async (_reservationId) => {
    console.log("CANCELLING RESERVATION", _reservationId);
    try {
      const reservationCanceled =
        await contract.cancelReservation(_reservationId);
      reservationCanceled.wait();
      handleOpenToast("success", "Reservation Canceled");
    } catch (e) {
      console.log(e);
    }
  };

  const freeTransferReservation = async (_reservationId, _addressReceiver) => {
    console.log(
      "Transferring Reservation to ",
      _reservationId,
      _addressReceiver
    );
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
  }, [signer, addressConnected, chainId]);

  // useEffect(() => {
  //   if (!provider || contractProvider) return;
  //   const AerolineasContract = new ethers.Contract(
  //     AerolineasContractAddress,
  //     Aerolineas.abi,
  //     provider
  //   );
  //   setContractProvider(AerolineasContract);
  // }, [provider]);

  useEffect(() => {
    if (!contract) return;
    getInfoForAvailableFlights();
    getReservationInfoByAddress();
    getFees();
  }, [contract, addressConnected, chainId]);

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
    if (getAddress(buyer) !== getAddress(addressConnected)) return;

    getInfoForAvailableFlights();
    handleOpenToast(
      "success",
      `Flight Reserved. Flight Id: ${flightId} - Seat Id: ${seatId}`
    );
  };

  const handleReservationCancelEvent = (reservationId) => {
    getInfoForAvailableFlights();
  };

  const handleReservationTransferredEvent = (
    _reservationId,
    _oldOwner,
    _newOwner
  ) => {
    getInfoForAvailableFlights();
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
    emitEvents,
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
