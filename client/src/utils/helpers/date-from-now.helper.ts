const dateFromNow = (date: Date): number => {
  return Math.floor((new Date().valueOf() - new Date(date).valueOf()) / (1000 * 60 * 60 * 24));
};

export default dateFromNow;
