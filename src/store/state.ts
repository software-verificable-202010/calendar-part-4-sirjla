import moment from "moment";
import { calendarView } from "@/common/constants.ts";

export const state = {
  selectedYear: moment().year(),
  selectedMonth: moment().month(),
  currentDate: moment(),
  currentView: calendarView
};
