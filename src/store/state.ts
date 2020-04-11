import moment from "moment";

export const state = {
  selectedYear: moment().year(),
  selectedMonth: moment().month(),
  currentDate: moment()
};
