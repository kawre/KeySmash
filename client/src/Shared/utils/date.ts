import moment from "moment";

export const date = (s: string) =>
  moment(parseInt(s)).format("DD MMM YYYY[\n]HH:mm");
