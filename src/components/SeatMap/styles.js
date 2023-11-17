import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
  planeSection: {
    backgroundColor: theme.palette.map.background,
    padding: 20,
    width: 350,
    borderRadius: 20,
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    rowGap: 30,
    columnGap: 50,
  },
  rowsMap: {
    display: "flex",
    flexDirection: "column",
    gap: 5,
    borderRadius: 10,
    overflow: "hidden",
  },
  columnsMap: {
    display: "flex",
    flexDirection: "row",
    gap: 5,
    justifyContent: "space-around",
  },
  skeleton: {
    width: 350,
    height: 750,
    borderRadius: 20,
    position: "fixed",
    top: -40,
  },
  soldOut: {
    marginBottom: 6,
    display: "flex",
    color: theme.palette.status.red,
    gap: 4,
  },
}));

export { useStyles };
