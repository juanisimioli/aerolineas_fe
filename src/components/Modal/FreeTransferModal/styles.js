import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
  contentContainer: {
    maxWidth: 520,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  flightInfo: {
    display: "flex",
    justifyContent: "center",
    minHeight: 56,
    backgroundColor: theme.palette.background.main,
    borderRadius: 8,
    marginBottom: 16,
    flexWrap: "wrap",
  },

  mainInfo: {
    margin: 16,
    textAlign: "center",
    color: theme.palette.text.black,
    fontWeight: 500,
    fontSize: 20,
  },

  accordionMoreInfo: {
    margin: 0,
    boxShadow: "none",
    ":before": {
      backgroundColor: "#ffffff",
    },
    backgroundColor: theme.palette.background.main,
    borderRadius: 8,
  },

  moreInfo: {
    display: "flex",
    gap: 10,
    alignItems: "center",
    color: theme.palette.text.grey,
  },

  resaleInput: {
    width: 160,
    marginBottom: 16,
  },

  legals: {
    color: theme.palette.text.grey,
    fontWeight: 500,
    fontSize: 17,
    lineHeight: 1.5,
    [theme.breakpoints.down("md")]: {
      fontSize: 15,
    },
  },

  success: {
    color: theme.palette.status.green,
  },

  actionContainer: {
    display: "flex",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    gap: 19,
    marginBottom: 16,
  },

  inputAddress: {
    width: "100%",
    marginBottom: 16,
  },
}));

export { useStyles };
