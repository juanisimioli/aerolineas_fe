import { useState, useEffect } from "react";
import { ethers } from "ethers";
import {
  Button,
  TextField,
  Typography,
  InputAdornment,
  CircularProgress,
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "@mui/material";
import { Info, ExpandMore } from "@mui/icons-material";
import { useAerolineasContext } from "@/contexts/AerolineasContext";
import { calculateSeat } from "@/components/Utils/airportUtils";
import CustomModal from "@/components/CustomModal/CustomModal";
import { useToast } from "@/hooks/useToast";
import { useStyles } from "./styles";

const ResaleModal = ({ modal, props }) => {
  const { reservation } = props;
  const { reservationId, flightNumber, row, column, price } = reservation;
  const seatInfo = calculateSeat(row, column);

  const { classes } = useStyles();
  const { handleOpenToast } = useToast();
  const { resaleReservation, contract, fees } = useAerolineasContext();
  const { feeResale } = fees;

  const [isAccordionExpanded, setIsAccordionExpanded] = useState(false);
  const [isWaitingSuccessEvent, setIsWaitingSuccessEvent] = useState(false);
  const [isTransactionSuccess, setIsTransactionSuccess] = useState(false);
  const [isValidValue, setIsValidValue] = useState(true);
  const [valueResale, setValueResale] = useState(
    ethers.formatUnits(price, "ether").toString()
  );

  const handleChangeAccordion = (panel) => (event, isExpanded) => {
    setIsAccordionExpanded(isExpanded ? panel : false);
  };

  const handleErrorResaleReservation = (error) => {
    setIsWaitingSuccessEvent(false);
    handleOpenToast(
      "error",
      error?.shortMessage || "Error processing transaction"
    );
  };

  const handleValueResale = (e) => {
    const { value } = e.target;

    setIsValidValue(value > 0);

    // Allow only numbers with up to four decimal places
    const parsedValue = parseFloat(value);
    if (!isNaN(parsedValue)) {
      const roundedValue = parseFloat(parsedValue.toFixed(4));
      setValueResale(isNaN(roundedValue) ? "" : roundedValue.toString());
    }
  };

  const handleResaleReservation = async () => {
    setIsWaitingSuccessEvent(true);
    const priceInWei = ethers.parseEther(valueResale);
    await resaleReservation(
      reservationId,
      priceInWei,
      handleErrorResaleReservation
    );
  };

  const handleReservationOnResaleEvent = (
    reservationIdEvent,
    _resalePrice,
    _addressEvent
  ) => {
    if (
      getAddress(_addressEvent) === getAddress(wallet.address) ||
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
      setValueResale(ethers.formatUnits(price, "ether").toString());
    }
  }, [modal]);

  useEffect(() => {
    if (!contract) return;
    contract.on("ReservationOnResale", handleReservationOnResaleEvent);

    return () => {
      contract.off("ReservationOnResale", handleReservationOnResaleEvent);
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
        >{`Fee: ${feeResale}%`}</Typography>
      </div>

      <TextField
        label="Resale Price"
        value={valueResale}
        error={!isValidValue}
        disabled={isWaitingSuccessEvent || isTransactionSuccess}
        type="number"
        fullWidth
        inputProps={{
          step: "0.1000", // Allows incrementing/decrementing in steps of 0.0001 (4 decimal places)
        }}
        onChange={handleValueResale}
        className={classes.resaleInput}
        InputProps={{
          endAdornment: <InputAdornment position="end">ETH</InputAdornment>,
        }}
        variant="outlined"
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
            {`You are about to publish seat from flight, making it available for purchase by another user.`}
            <br />
            {`If the reservation is successfully resold, a commission fee of ${feeResale}% will be deducted, and the remaining balance will be returned to your wallet.`}
            <br />
            {`You can unpublish the reservation at any time, provided it has not been resold. Please note that once the reservation is published for resale, it cannot be canceled in the future.`}
            <br />
            {`This action of publishing for resale requires payment of the Gas fee associated with this transaction, which will be detailed when you confirm it in MetaMask. If you choose to unpublish the resale in the future, a gas fee will also be required.`}
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
            disabled={!isValidValue}
            onClick={handleResaleReservation}
            variant="contained"
          >
            Publish for Resale
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

export default ResaleModal;
