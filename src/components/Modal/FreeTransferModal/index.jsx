import { useState, useEffect } from "react";
import { isAddress } from "ethers";
import {
  Button,
  TextField,
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

const FreeTransferModal = ({ modal, props }) => {
  const { reservation } = props;
  const { reservationId, flightNumber, row, column } = reservation;
  const seatInfo = calculateSeat(row, column);

  const { classes } = useStyles();
  const { handleOpenToast } = useToast();
  const { freeTransferReservation, contract } = useAerolineasContext();

  const [isAccordionExpanded, setIsAccordionExpanded] = useState(false);
  const [isWaitingSuccessEvent, setIsWaitingSuccessEvent] = useState(false);
  const [isTransactionSuccess, setIsTransactionSuccess] = useState(false);
  const [isValidAddress, setIsValidAddress] = useState(null);
  const [isInputTouched, setIsInputTouched] = useState(false);
  const [valueAddress, setValueAddress] = useState("");

  const handleChangeAccordion = (panel) => (event, isExpanded) => {
    setIsAccordionExpanded(isExpanded ? panel : false);
  };

  const handleErrorFreeTransferReservation = (error) => {
    setIsWaitingSuccessEvent(false);
    handleOpenToast(
      "error",
      error?.info?.error?.data?.data?.message || "Error processing transaction"
    );
  };

  const handleValueAddress = ({ target }) => {
    const { value } = target;
    !isInputTouched && setIsInputTouched(true);
    setValueAddress(value);
    setIsValidAddress(isAddress(value));
  };

  const handleFreeTransfer = async () => {
    setIsWaitingSuccessEvent(true);
    await freeTransferReservation(
      reservationId,
      valueAddress,
      handleErrorFreeTransferReservation
    );
  };

  const handleReservationTransferredEvent = (
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
      setValueAddress("");
      setIsInputTouched(false);
    }
  }, [modal]);

  useEffect(() => {
    if (!contract) return;
    contract.on("ReservationTransferred", handleReservationTransferredEvent);

    return () => {
      contract.off("ReservationTransferred", handleReservationTransferredEvent);
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

      <TextField
        label="Destination Address"
        value={valueAddress}
        error={!isValidAddress && isInputTouched}
        onChange={handleValueAddress}
        className={classes.inputAddress}
      />

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
            {`You are about to transfer the reservation of your seat and flight to the address you enter in the Destination Address field.`}
            <br />
            {`This new address will be the one who owns, can use the ticket and enjoy the flight.`}
            <br />
            {` This action cannot be reversed.`}
            <br />
            {`There is no commission fee associated with the transfer, you will only need to pay the Gas fee associated with this transaction, which will be detailed when you confirm it in MetaMask.`}
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

          <Button
            disabled={!isValidAddress}
            onClick={handleFreeTransfer}
            variant="contained"
          >
            Free Transfer
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

export default FreeTransferModal;
