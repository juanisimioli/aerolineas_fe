import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
  container: {
    boxShadow: "0px 3px 5px 0px rgba(0, 0, 0, 0.1)",
    maxHeight: 40,

    "&.MuiTabs-root": {
      minHeight: 40,
    },

    "& .MuiButtonBase-root": {
      minHeight: 40,
      flex: 1,
      textTransform: "none",
      maxWidth: "100%",
    },

    "& .MuiSvgIcon-root": {
      fontSize: 18,
      marginRight: 5,
    },

    "& .Mui-selected": {
      backgroundColor: "white",
    },
  },
}));

export { useStyles };
