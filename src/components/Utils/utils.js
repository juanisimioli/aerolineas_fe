import airports from "../Utils/airports.json";
import { SeatColumn } from "./enums";

const iataToUint24 = (iataCode) => {
  if (iataCode.length !== 3) {
    throw new Error("IATA code must be 3 characters long");
  }

  // Use ASCII values to convert the characters to a 24-bit integer
  const codeValue =
    (iataCode.charCodeAt(0) << 16) |
    (iataCode.charCodeAt(1) << 8) |
    iataCode.charCodeAt(2);

  return codeValue;
};

const uint24ToIata = (uintValue) => {
  if (uintValue < 0 || uintValue > 0xffffff) {
    throw new Error("Invalid uint24 value");
  }

  // Extract individual characters from the 24-bit integer
  const char1 = String.fromCharCode((uintValue >> 16) & 0xff);
  const char2 = String.fromCharCode((uintValue >> 8) & 0xff);
  const char3 = String.fromCharCode(uintValue & 0xff);

  const iataCode = char1 + char2 + char3;

  return iataCode;
};

const airportInfo = (airport, isUint) => {
  const iata = isUint ? uint24ToIata(Number(airport)) : airport;

  if (typeof iata !== "string" || iata.length !== 3)
    throw new Error("Invalid Airport");

  return airports.find((airport) => airport.code === iata);
};

const time2CharLong = (time) => {
  return String(time).padStart(2, "0");
};

const month = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const epochToJsDate = (ts) => {
  return new Date(Number(ts) * 1000);
};

const dateTimeInfo = (epoch, splitDateAndTime) => {
  const d = epochToJsDate(parseInt(epoch));
  const date = `${d.getDate()} ${month[d.getMonth()]} ${d.getFullYear()}`;
  const time = `${time2CharLong(d.getHours())}:${time2CharLong(
    d.getMinutes()
  )}`;

  if (splitDateAndTime) {
    return {
      date,
      time,
    };
  } else {
    return `${date} - ${time}`;
  }
};

const calculateSeat = (row, column) => {
  return `${Number(row)}${SeatColumn[Number(column)]}`;
};

const shortAddress = (address) => {
  if (!address || typeof address !== "string") return;
  return `${address.slice(0, 6)}...${address.slice(address.length - 4)}`;
};

const sortByFlightNumber = (flights) => {
  flights.sort(function (a, b) {
    const flightNumberA = Number(a.flightNumber);
    const flightNumberB = Number(b.flightNumber);

    if (flightNumberA < flightNumberB) {
      return -1;
    } else if (flightNumberA > flightNumberB) {
      return 1;
    } else {
      return 0;
    }
  });

  return flights;
};

export {
  iataToUint24,
  uint24ToIata,
  airportInfo,
  dateTimeInfo,
  calculateSeat,
  shortAddress,
  epochToJsDate,
  sortByFlightNumber,
};
