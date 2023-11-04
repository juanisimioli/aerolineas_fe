import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    minWidth: 350,
    maxWidth: 600,

    borderRadius: 8,

    color: "#a6adbb",
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
    borderTop: "1px solid #e5e6eb",
  },

  date: {
    display: "flex",
    justifyContent: "space-between",
    color: "#a6adbb",
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
    color: "#2a2a2a",
    fontSize: 14,
  },

  code: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    color: "#2a2a2a",
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
    color: "#606c84",
    fontSize: 18,
  },
}));

export { useStyles };
