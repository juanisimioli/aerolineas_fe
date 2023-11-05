"use client";
import { useState, useEffect } from "react";
import {
  Button,
  Typography,
  CircularProgress,
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "@mui/material";
import { Info, ExpandMore } from "@mui/icons-material";
import { useAerolineasContext } from "@/contexts/AerolineasContext";
import { calculateSeat } from "@/components/Utils/airportUtils";
import CustomModal from "@/components/CustomModal/CustomModal";
import { useStyles } from "./styles";
import { useToast } from "@/hooks/useToast";
import { useMetamaskContext } from "@/contexts/useMetamaskContext";

const CancelReservationModal = ({ modal, props }) => {
  const { classes } = useStyles();
  const { reservation } = props;
  const { reservationId, flightNumber, row, column } = reservation;
  const seatInfo = calculateSeat(row, column);

  const { wallet } = useMetamaskContext();

  const { cancelReservation, contract, fees } = useAerolineasContext();
  const { feeCancellation } = fees;

  const [expanded, setExpanded] = useState(false);
  const [isWaitingEvent, setIsWaitingEvent] = useState(false);
  const [isTransactionSuccess, setIsTransactionSuccess] = useState(false);

  const { handleOpenToast } = useToast();

  const handleChangeAccordion = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleErrorCancelReservation = (error) => {
    setIsWaitingEvent(false);
    handleOpenToast("error", error?.shortMessage);
  };

  const handleCancelReservation = async () => {
    setIsWaitingEvent(true);
    await cancelReservation(reservationId, handleErrorCancelReservation);
  };

  const handleReservationCancelEvent = (reservationIdEvent, addressEvent) => {
    if (
      getAddress(addressEvent) === getAddress(wallet.address) ||
      reservationIdEvent === reservationId
    ) {
      setIsWaitingEvent(false);
      setIsTransactionSuccess(true);
    }
  };

  const handleDoNothing = () => {
    modal.close();
  };

  useEffect(() => {
    if (!modal.isModalOpen) {
      setIsTransactionSuccess(false);
    }
  }, [modal]);

  useEffect(() => {
    if (!contract) return;
    contract.on("ReservationCanceled", handleReservationCancelEvent);

    return () => {
      contract.off("ReservationCanceled", handleReservationCancelEvent);
    };
  }, [contract]);

  const ModalContent = (
    <div className={classes.contentContainer}>
      <div className={classes.flightInfo}>
        <Typography className={classes.mainInfo}>
          {`Flight ${flightNumber}`}
        </Typography>
        <Typography
          className={classes.mainInfo}
        >{`Seat ${seatInfo}`}</Typography>
        <Typography
          className={classes.mainInfo}
        >{`Fee: ${feeCancellation}%`}</Typography>
      </div>

      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChangeAccordion("panel1")}
        className={classes.accordionMoreInfo}
      >
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <div className={classes.moreInfo}>
            <Info />
            <Typography className={classes.moreInfo}>More Info</Typography>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <Typography className={classes.legals}>
            {`You are about to cancel your reservation. Seat ${seatInfo} for flight ${flightNumber} will become available again for anyone to purchase. `}
            <br />
            {` A fee of ${feeCancellation}% will be deducted from your refund, and the remaining amount of money will be returned to your wallet.`}
            <br />
            {`Please be aware that in addition to the cancellation fee, a Gas fee associated with this transaction will be detailed when you confirm it in MetaMask`}
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );

  const ModalAction = (
    <div className={classes.actionContainer}>
      {isWaitingEvent ? (
        <CircularProgress />
      ) : isTransactionSuccess ? (
        <>
          <Typography className={classes.success}>
            Transaction Success
          </Typography>
          <Button onClick={handleDoNothing} variant="outlined">
            Close
          </Button>
        </>
      ) : (
        <>
          <Button onClick={handleDoNothing} variant="outlined">
            Do nothing
          </Button>

          <Button onClick={handleCancelReservation} variant="contained">
            Cancel Reservation
          </Button>
        </>
      )}
    </div>
  );

  return (
    <CustomModal {...modal} modalProps={{ fullWidth: true }}>
      <CustomModal.Content>{ModalContent}</CustomModal.Content>
      <CustomModal.Actions>{ModalAction}</CustomModal.Actions>
    </CustomModal>
  );
};

export default CancelReservationModal;
