"use client";
import { useAerolineasContext } from "@/contexts/AerolineasContext";

import SeatMap from "@/components/SeatMap/SeatMap";
import BookingInformation from "@/components/BookingInformation/BookingInformation";
import { useRouter } from "next/navigation";

import { useStyles } from "./styles";
import { useEffect } from "react";
import { Skeleton } from "@mui/material";

const Booking = () => {
  const { classes } = useStyles();
  const router = useRouter();
  const { currentSeats } = useAerolineasContext();

  // useEffect(() => {
  //   if (!currentSeats?.length) router.push("/flights");
  // }, []);

  return (
    <div className={classes.container}>
      <SeatMap />
      <BookingInformation />
    </div>
  );
};

export default Booking;
