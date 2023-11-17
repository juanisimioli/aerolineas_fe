import { useState } from "react";
import useModal from "@/hooks/useModal";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { SeatStatus } from "@/components/Utils/enums";
import FreeTransferModal from "@/components/Modal/FreeTransferModal";
import ResaleModal from "@/components/Modal/ResaleModal";
import CancelResaleModal from "@/components/Modal/CancelResaleModal";
import CancelReservationModal from "@/components/Modal/CancelReservation";

export default function PositionedMenu({ reservation }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { seatStatus } = reservation;

  const freeTransferModal = useModal();
  const resaleModal = useModal();
  const cancelResaleModal = useModal();
  const cancelReservationModal = useModal();

  const onCancelReservation = () => {
    cancelReservationModal.open();
    handleClose();
  };

  const onFreeTransferReservation = () => {
    freeTransferModal.open();
    handleClose();
  };

  const onResaleReservation = () => {
    resaleModal.open();
    handleClose();
  };

  const onCancelResale = () => {
    cancelResaleModal.open();
    handleClose();
  };

  const isOnResale = seatStatus === SeatStatus.OnResale;
  const isResold = seatStatus === SeatStatus.Resold;

  return (
    <div>
      <Button
        id="actions-button"
        aria-controls={open ? "actions-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        Actions
      </Button>
      <Menu
        id="actions-menu"
        aria-labelledby="actions-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        disableScrollLock
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        {isOnResale ? (
          <MenuItem onClick={onCancelResale}>Cancel Resale</MenuItem>
        ) : (
          [
            !isResold && (
              <MenuItem
                key={"menu_item_cancelReservation"}
                onClick={onCancelReservation}
              >
                Cancel Reservation
              </MenuItem>
            ),
            <MenuItem
              key={"menu_item_freeTransferReservation"}
              onClick={onFreeTransferReservation}
            >
              Free Transfer Reservation
            </MenuItem>,
            <MenuItem
              key={"menu_item_publishForResale"}
              onClick={onResaleReservation}
            >
              Publish for Resale
            </MenuItem>,
          ]
        )}
      </Menu>
      <FreeTransferModal
        modal={freeTransferModal}
        props={{
          reservation,
        }}
      />
      <ResaleModal
        modal={resaleModal}
        props={{
          reservation,
        }}
      />
      <CancelResaleModal modal={cancelResaleModal} props={{ reservation }} />
      <CancelReservationModal
        modal={cancelReservationModal}
        props={{ reservation }}
      />
    </div>
  );
}
