"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import SeatMap from "@/components/SeatMap/SeatMap";
import BookingInformation from "@/components/BookingInformation/BookingInformation";
import { useAerolineasContext } from "@/contexts/useAerolineasContext";
import { useStyles } from "./styles";

const Booking = () => {
  const { classes } = useStyles();
  const router = useRouter();
  const { currentSeats, currentFlight, isLoadingSeats } =
    useAerolineasContext();

  useEffect(() => {
    if (!isLoadingSeats && (!currentSeats?.length || !Boolean(currentFlight))) {
      router.push("/");
    }
  }, []);

  return (
    <div className={classes.container}>
      {Boolean(currentFlight) && (
        <>
          <SeatMap />
          <BookingInformation />
        </>
      )}
    </div>
  );
};

export default Booking;
