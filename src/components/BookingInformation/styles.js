import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
  container: {
    position: "fixed",
    width: "100%",
  },

  accordion: {
    width: "100%",
    position: "fixed",
    bottom: 32,
    backgroundColor: theme.palette.background.grey,
    transform: "rotate(180deg)",
    boxShadow: "0 0 4px 2px rgba(0, 0, 0, 0.2)",

    "& .Mui-expanded": {
      margin: 0,
    },

    "& .MuiAccordionSummary-content": {
      margin: 0,
    },

    "& .MuiAccordionSummary-root": {
      flexDirection: "row-reverse",
      minHeight: 64,
    },

    "& .MuiAccordionSummary-expandIconWrapper": {
      color: theme.palette.map.available,
    },
  },

  content: {
    display: "flex",
    justifyContent: "center",
    transform: "rotate(180deg)",
  },
}));

export { useStyles };
