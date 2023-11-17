import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    minWidth: 350,
    maxWidth: 600,
    borderRadius: 8,
    color: theme.palette.text.light,
    overflow: "hidden",
    boxShadow: "0 2px 4px 0 #63668030",
    backgroundColor: "white",
  },

  clickable: {
    cursor: "pointer",
    "&:hover": {
      boxShadow: "0 2px 6px 0 #595b7360",
    },
  },

  top: {
    padding: "8px 14px",
    display: "flex",
    flexDirection: "column",
  },

  bottom: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "8px 14px",
    borderTop: `1px solid ${theme.palette.background.greyLight}`,
    gap: 8,
  },

  date: {
    display: "flex",
    justifyContent: "space-between",
    color: theme.palette.text.light,
    fontWeight: 400,
    fontSize: 13,
    marginTop: 8,
    marginBottom: 8,
  },

  arrowDeparture: {
    marginBottom: -1,
    marginRight: 3,
  },

  arrowArrival: {
    transform: "rotate(90deg)",
    marginBottom: -1,
    marginRight: 3,
  },

  city: {
    display: "flex",
    justifyContent: "space-between",
    color: theme.palette.text.black,
    fontSize: 14,
  },

  code: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    color: theme.palette.text.black,
    fontWeight: 500,
    fontSize: 34,
    marginBottom: 6,

    "> div:nth-of-type(1)": {
      width: 80,
    },
    "> div:nth-of-type(3)": {
      width: 80,
      textAlign: "end",
    },
  },

  time: {
    display: "flex",
    justifyContent: "space-between",
    color: theme.palette.text.grey,
    fontSize: 18,
    "> p:nth-of-type(2)": {
      fontSize: 16,
    },
  },

  flightAlreadyTaken: {
    marginTop: 6,
    display: "flex",
    color: theme.palette.status.green,
    gap: 4,
  },

  soldOut: {
    marginTop: 6,
    display: "flex",
    color: theme.palette.status.red,
    gap: 4,
  },
}));

export { useStyles };
