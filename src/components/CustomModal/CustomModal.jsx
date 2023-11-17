import { createContext } from "react";
import { Dialog, DialogActions, DialogContent } from "@mui/material";
import { useStyles } from "./styles";

const CustomModalContext = createContext();

const Content = ({ children }) => <DialogContent>{children}</DialogContent>;
const Actions = ({ children }) => <DialogActions>{children}</DialogActions>;

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

CustomModal.Content = Content;
CustomModal.Actions = Actions;

export default CustomModal;
