import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import SeatSelection from "./SeatSelection/SeatSelection";

import { useStyles } from "./styles";
import FlightCard from "../FlightCard/FlightCard";
import { useAerolineasContext } from "@/contexts/AerolineasContext";

const BookingInformation = () => {
  const { classes } = useStyles();

  const { currentFlight } = useAerolineasContext();

  return (
    <footer className={classes.container}>
      <Accordion square classes={{ root: classes.accordion }}>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <SeatSelection />
        </AccordionSummary>
        <AccordionDetails>
          <div
            style={{
              transform: "rotate(180deg)",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <FlightCard flight={currentFlight} />
          </div>
        </AccordionDetails>
      </Accordion>
    </footer>
  );
};

export default BookingInformation;
