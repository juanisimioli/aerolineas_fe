import { FlightClass } from "@mui/icons-material";
import { SeatStatus } from "@/components/Utils/enums";
import { Tooltip } from "@mui/material";
import { useAerolineasContext } from "@/contexts/AerolineasContext";
import { useStyles } from "./styles";

const Seat = ({ seat, seatSelected, onChange }) => {
  const { classes } = useStyles();
  const { status, id } = seat;

  const { seatAlreadySelected } = useAerolineasContext();

  const isTaken =
    seat?.status === SeatStatus.Sold || seat?.status === SeatStatus.Resold;
  const isChecked = id === seatSelected;

  const isOnResale = status === SeatStatus.OnResale;

  const isSeatAlreadySelected =
    seat.row === seatAlreadySelected?.row &&
    seat.column === seatAlreadySelected?.column;

  return (
    <label className={classes.checkboxLabel}>
      <input
        type="checkbox"
        disabled={isTaken}
        checked={isChecked}
        onChange={() => {}}
        onClick={(e) => !seatAlreadySelected && onChange(e, id)}
        className={`${classes.checkboxInput} ${
          seatAlreadySelected && classes.noPointer
        } ${isSeatAlreadySelected && classes.seatAlreadySelected}`}
      />
      {isOnResale && (
        <Tooltip title="Resale Seat: Price may vary with the rest.">
          <FlightClass className={classes.iconResale} />
        </Tooltip>
      )}
    </label>
  );
};

export default Seat;
