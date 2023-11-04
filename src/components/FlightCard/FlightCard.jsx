import { ethers } from "ethers";

import FlightStepper, { STEP } from "./FlightStepper/FlightStepper";
import {
  airportInfo,
  calculateSeat,
  dateTimeInfo,
} from "../Utils/airportUtils";
import { useStyles } from "./styles";
import OutboundSharpIcon from "@mui/icons-material/OutboundSharp";
import { SeatStatus } from "../Utils/enums";
import PositionedMenu from "./ActionMenu/ActionMenu";

const FlightCard = ({
  flight,
  onSelectFlight,
  reservationsInfoByAddress,
  reservation,
}) => {
  const { classes } = useStyles();
  if (!flight && !reservation) return;

  const {
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
  } = flight || reservation;
  const airportFrom = airportInfo(from, true);
  const airportTo = airportInfo(to, true);
  const departureInfo = dateTimeInfo(departure, true);
  const arrivalInfo = dateTimeInfo(arrival, true);

  const isReservation = Boolean(reservation);
  const noMoreSeats = Number(seatsLeft) == 0;
  const isClickable = Number(seatsLeft) > 0 && !Boolean(reservation);

  const alreadyTakenByAddress = reservationsInfoByAddress
    ?.map((res) => res.id)
    .includes(id);

  return (
    <article
      className={`${classes.container} ${isClickable && classes.clickable}`}
      onClick={onSelectFlight}
    >
      <div className={classes.top}>
        <div className={classes.date}>
          <div>
            <OutboundSharpIcon
              sx={{
                fontSize: 15,
              }}
              className={classes.arrowDeparture}
            />
            {departureInfo.date}
          </div>
          <p>{`Flight # ${flightNumber} // SL ${seatsLeft}`}</p>
          <div>
            <OutboundSharpIcon
              sx={{
                fontSize: 15,
              }}
              className={classes.arrowArrival}
            />
            {arrivalInfo.date}
          </div>
        </div>
        <div className={classes.city}>
          <p>{airportFrom?.name}</p>
          <p>{airportTo?.name}</p>
        </div>
        <div className={classes.code}>
          <p>{airportFrom?.code}</p>
          <FlightStepper step={STEP.Departure} />
          <p>{airportTo?.code}</p>
        </div>
        <div className={classes.time}>
          <p>{departureInfo.time}</p>
          <p>{arrivalInfo.time}</p>
        </div>
        {!isReservation && alreadyTakenByAddress && "ALREADY TAKEN"}
        {noMoreSeats && "SOLD OUT!"}
      </div>

      {isReservation && (
        <div className={classes.bottom}>
          <div>
            <p>{`Seat ${calculateSeat(row, column)}`}</p>
            <p>{`Price ${ethers.formatEther(price)} ETH`}</p>
            <p>{`Reserved on ${dateTimeInfo(timestamp)}`}</p>
            <p>{seatStatus == SeatStatus.Available && "Seat is Available"}</p>
            <p>{seatStatus == SeatStatus.OnResale && "Seat is on RESALE"}</p>
            <p>{seatStatus == SeatStatus.Sold && "Seat is SOLD"}</p>
            <p>{seatStatus == SeatStatus.Resold && "Seat is resale"}</p>
          </div>
          <PositionedMenu reservation={reservation} />
        </div>
      )}
    </article>
  );
};

export default FlightCard;
