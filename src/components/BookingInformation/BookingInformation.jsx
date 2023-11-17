import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import SeatSelection from "./SeatSelection/SeatSelection";
import FlightCard from "../FlightCard/FlightCard";
import { useAerolineasContext } from "@/contexts/useAerolineasContext";
import { useStyles } from "./styles";

const BookingInformation = () => {
  const { classes } = useStyles();
  const { currentFlight } = useAerolineasContext();

  return (
    <section className={classes.container}>
      <Accordion square classes={{ root: classes.accordion }}>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="booking-information"
          id="booking-header"
        >
          <SeatSelection />
        </AccordionSummary>
        <AccordionDetails>
          <div className={classes.content}>
            <FlightCard flight={currentFlight} />
          </div>
        </AccordionDetails>
      </Accordion>
    </section>
  );
};

export default BookingInformation;
