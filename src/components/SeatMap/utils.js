const splitSeatsByRow = (seats) => {
  const groupedSeats = seats.reduce((acc, seat) => {
    const { row } = seat;

    if (!acc[row]) {
      acc[row] = [];
    }

    acc[row].push(seat);
    return acc;
  }, {});

  return Object.values(groupedSeats);
};

const splitArraysInHalf = (arrays) => {
  return arrays.reduce((result, array) => {
    const middleIndex = Math.floor(array.length / 2);
    result.push(array.slice(0, middleIndex), array.slice(middleIndex));
    return result;
  }, []);
};

const regroupArray = (arr) => {
  const result = [];
  let currentIndex = 0;

  arr.forEach((number) => {
    const subarray = [];

    for (let i = 0; i < number * 2; i++) {
      subarray.push(currentIndex);
      currentIndex++;
    }

    const evenSubarray = subarray.filter((_, index) => index % 2 === 0);
    const oddSubarray = subarray.filter((_, index) => index % 2 !== 0);

    result.push(evenSubarray, oddSubarray);
  });

  return result;
};

const organizeSeats = (currentSeats, contiguousRows) => {
  const seatsDividedInRows = splitArraysInHalf(splitSeatsByRow(currentSeats));

  const organizedSeats = regroupArray(contiguousRows).map((arr) =>
    arr.map((seat) => seatsDividedInRows[seat])
  );

  return organizedSeats;
};

export { splitSeatsByRow, splitArraysInHalf, regroupArray, organizeSeats };
