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
import { useAerolineasContext } from "@/contexts/useAerolineasContext";
import { calculateSeat } from "@/components/Utils/utils";
import CustomModal from "@/components/CustomModal/CustomModal";
import { useToast } from "@/hooks/useToast";
import { useStyles } from "./styles";

const CancelResaleModal = ({ modal, props }) => {
  const { reservation } = props;
  const { reservationId, flightNumber, row, column } = reservation;
  const seatInfo = calculateSeat(row, column);

  const { classes } = useStyles();
  const { handleOpenToast } = useToast();
  const { cancelResaleReservation, contract } = useAerolineasContext();

  const [isAccordionExpanded, setIsAccordionExpanded] = useState(false);
  const [isWaitingSuccessEvent, setIsWaitingSuccessEvent] = useState(false);
  const [isTransactionSuccess, setIsTransactionSuccess] = useState(false);

  const handleChangeAccordion = (panel) => (event, isExpanded) => {
    setIsAccordionExpanded(isExpanded ? panel : false);
  };

  const handleErrorCancelResaleReservation = (error) => {
    setIsWaitingSuccessEvent(false);
    handleOpenToast(
      "error",
      error?.info?.error?.data?.data?.message || "Error processing transaction"
    );
  };

  const handleCancelResaleReservation = async () => {
    setIsWaitingSuccessEvent(true);
    await cancelResaleReservation(
      reservationId,
      handleErrorCancelResaleReservation
    );
  };

  const handleUndoReservationOnResaleEvent = (
    reservationIdEvent,
    addressEvent
  ) => {
    if (
      getAddress(addressEvent) === getAddress(wallet.address) ||
      reservationIdEvent === reservationId
    ) {
      setIsWaitingSuccessEvent(false);
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
    contract.on("UndoReservationOnResale", handleUndoReservationOnResaleEvent);

    return () => {
      contract.off(
        "UndoReservationOnResale",
        handleUndoReservationOnResaleEvent
      );
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
      </div>

      <Accordion
        expanded={isAccordionExpanded === "panel1"}
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
            {`You are about to cancel the resale. The reservation will continue to be yours and will not be available for purchase by another user.`}
            <br />
            {`After canceling the resale, you won't be able to cancel the reservation, as was informed when you published it for resale.`}
            <br />
            {`There is no commission fee associated with this cancellation, you will only need to pay the Gas fee associated with this transaction, which will be detailed when you confirm it in MetaMask.`}
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );

  const ModalAction = (
    <div className={classes.actionContainer}>
      {isWaitingSuccessEvent ? (
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
          <Button onClick={handleCancelResaleReservation} variant="contained">
            Cancel Resale
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

export default CancelResaleModal;
