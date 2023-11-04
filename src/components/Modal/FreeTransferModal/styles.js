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
    minHeight: "3.5rem",
    backgroundColor: theme.palette.background.main,
    borderRadius: 8,
    marginBottom: "1rem",
    flexWrap: "wrap",
  },
  mainInfo: {
    margin: "1rem",
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
    gap: "0.6rem",
    alignItems: "center",
    color: theme.palette.text.grey,
  },
  resaleInput: {
    width: 160,
    marginBottom: "1rem",
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
    color: "green",
  },

  actionContainer: {
    display: "flex",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    gap: "1.2rem",
    marginBottom: "1rem",
  },

  inputAddress: {
    width: "100%",
    marginBottom: "1rem",
  },
}));

export { useStyles };
