import { keyframes } from "tss-react";
import { makeStyles } from "tss-react/mui";

const loaderSpin = keyframes`
    to {
      transform: rotate(360deg);
    }
`;

const loaderPath = keyframes`
    0% {
        stroke-dasharray: 0, 580, 0, 0, 0, 0, 0, 0, 0;
    }
    50% {
        stroke-dasharray: 0, 450, 10, 30, 10, 30, 10, 30, 10;
    }
    100% {
        stroke-dasharray: 0, 580, 0, 0, 0, 0, 0, 0, 0;
    }
`;

const useStyles = makeStyles()((theme) => ({
  container: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100vh",
    backgroundColor: "#1d1f2099",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
    userSelect: "none",
  },

  svgCallLoader: {
    width: 230,
    height: 230,
    transformOrigin: "115px 115px",
    animation: `${loaderSpin} 1.4s linear infinite`,
  },

  loaderPlane: {
    fill: theme.palette.main.orange,
  },

  loaderPath: {
    stroke: "white",
    animation: `${loaderPath} 1.4s ease-in-out infinite`,
  },
}));

export { useStyles };
