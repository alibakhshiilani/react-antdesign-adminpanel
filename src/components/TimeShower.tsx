// import { getTimeObject } from "../constant/helper";

export function getTimeObject(sec: any) {
  let difference = sec;

  const days = Math.floor(difference / 60 / 60 / 24);
  difference -= days * 60 * 60 * 24;

  const hours = Math.floor(difference / 60 / 60);
  difference -= hours * 60 * 60;

  const minutes = Math.floor(difference / 60);
  difference -= minutes * 60;

  const seconds = Math.ceil(difference);

  return { days, hours, minutes, seconds };
}

const TimeShower = (time: any) => {
  if (!time || time === 0) {
    return `00:00`;
  }

  const { days, hours, minutes, seconds } = getTimeObject(time);

  function getParsedNum(num: any, type = "other") {
    if (!num || num === 0 || num === "0") {
      if (type === "minutes") {
        return "00:";
      }
      if (type === "seconds") {
        return "00";
      }
    }

    if (!num || num === 0) {
      return "";
    }

    if (num >= 10) {
      if (type === "days") {
        return `${num}،`;
      }
      if (type === "seconds") {
        return `${num}`;
      }

      return `${num}:`;
    }
    if (type === "days") {
      return `${num} روز :`;
    }
    if (type === "seconds") {
      return `0${num}`;
    }
    return `0${num}:`;
  }

  return `${getParsedNum(days, "days")} ${getParsedNum(hours)}${getParsedNum(
    minutes,
    "minutes"
  )}${getParsedNum(seconds, "seconds")}`;
};

export default TimeShower;
