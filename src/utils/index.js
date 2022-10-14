import dayjs from "dayjs";

export const getFormattedDate = (dateString) => {
  return dayjs(dateString).format("DD MMM, YYYY hh:mm:ss A");
};
