import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
  mainModalContainer: {
    backgroundColor: `${theme.palette.primary.main}33`,
    "& .MuiDialog-paper": {
      borderRadius: 12,
      paddingTop: 8,
      padding: "12px 10px 4px 10px",
      // boxShadow: `0 3px 20px ${theme.palette.shadows.main}`,
      width: "auto",
      maxWidth: "none",
      [theme.breakpoints.down("md")]: {
        width: "100%",
        maxWidth: "550px",
      },
    },
    "& .MuiDialogContentText-root": {
      color: "inherit",
    },
  },
  title: {
    paddingBottom: 0,
  },
  divider: {
    backgroundColor: theme.palette.secondary.main,
  },
  closeButton: {
    position: "absolute",
    right: 30,
    top: 16,
    color: theme.palette.grey[500],
  },
}));

export { useStyles };
