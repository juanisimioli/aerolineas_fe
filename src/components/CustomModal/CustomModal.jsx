import { createContext, useContext } from "react";

import CloseIcon from "@mui/icons-material/Close";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
} from "@mui/material";

import { useStyles } from "./styles";

/* CONTEXT */
const CustomModalContext = createContext();

/* HOOK */
const useCustomModalContext = () => {
  const context = useContext(CustomModalContext);
  if (!context) {
    throw new Error(
      `CustomModal compound components cannot be rendered outside the CustomModal component`
    );
  }
  return context;
};

/* SIDE COMPONENTS */
const Title = ({ children, onClose }) => {
  const { close, modalProps = {} } = useCustomModalContext();
  const { withoutDivider = false } = modalProps ?? {};
  const { classes } = useStyles();

  const handleClose = () => {
    close();
    if (onClose) onClose();
  };

  const CloseButton = (
    <IconButton
      aria-label="close"
      className={classes.closeButton}
      onClick={handleClose}
    >
      <CloseIcon />
    </IconButton>
  );

  return (
    <>
      <DialogTitle className={classes.title}>
        {children}
        {close && CloseButton}
        {!withoutDivider && (
          <Divider
            className={classes.divider}
            color="secondary"
            component="hr"
            variant="fullWidth"
          />
        )}
      </DialogTitle>
    </>
  );
};
const Content = ({ children }) => <DialogContent>{children}</DialogContent>;
const Actions = ({ children }) => <DialogActions>{children}</DialogActions>;

/* MAIN COMPONENT */
const CustomModal = (props) => {
  const { isModalOpen, className, close, children, modalProps } = props;
  const { isWaitingEvent } = modalProps;
  const { classes } = useStyles();

  return (
    <CustomModalContext.Provider value={props}>
      <Dialog
        className={`${classes.mainModalContainer} ${className}`}
        disableScrollLock
        hideBackdrop
        onClose={isWaitingEvent ? null : close}
        open={isModalOpen}
        scroll="paper"
        {...modalProps}
      >
        {children}
      </Dialog>
    </CustomModalContext.Provider>
  );
};

CustomModal.Title = Title;
CustomModal.Content = Content;
CustomModal.Actions = Actions;

export default CustomModal;
