const dateToString = (date: Date): string => (
    `${date.getFullYear()}-${
      (`00${date.getMonth() + 1}`).slice(-2)}-${
      (`00${date.getDate()}`).slice(-2)} ${
      (`00${date.getHours()}`).slice(-2)}:${
      (`00${date.getMinutes()}`).slice(-2)}:${
      (`00${date.getSeconds()}`).slice(-2)}`
);

export default dateToString;
