import moment from "moment";

const monthView = "Calendar";
const weekView = "View";
const minuteOffset = 1;
const emptyString = "";
const startingNumber = 0;
const maxYears = 3000;
const listOfYears: number[] = [...Array(maxYears).keys()].reverse();
const monthNames: string[] = moment.months();
const closeEvent = "close";
const dateComparisonGranularity = "day";
const momentJsWeekdayNameFormatter = "dddd";
const appointmentDB = "appointments";

export {
  monthView,
  weekView,
  minuteOffset,
  emptyString,
  startingNumber,
  listOfYears,
  monthNames,
  closeEvent,
  dateComparisonGranularity,
  momentJsWeekdayNameFormatter,
  appointmentDB
};
