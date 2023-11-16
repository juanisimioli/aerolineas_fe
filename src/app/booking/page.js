"use client";
import { useAerolineasContext } from "@/contexts/AerolineasContext";

import SeatMap from "@/components/SeatMap/SeatMap";
import BookingInformation from "@/components/BookingInformation/BookingInformation";
import { useRouter } from "next/navigation";

import { useStyles } from "./styles";
import { useEffect } from "react";

const Booking = () => {
  const { classes } = useStyles();
  const router = useRouter();
  const { currentSeats, currentFlight } = useAerolineasContext();

  useEffect(() => {
    if (!currentSeats?.length || !Boolean(currentFlight)) {
      console.log("PUSH");
      router.push("/flights");
    }
  }, []);

  return (
    <div className={classes.container}>
      <SeatMap />
      <BookingInformation />
    </div>
  );
};

export default Booking;
