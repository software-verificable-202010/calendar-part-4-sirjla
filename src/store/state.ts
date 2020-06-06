import moment from "moment";
import { monthView } from "@/common/constants.ts";

export const state = {
  selectedYear: moment().year(),
  selectedMonth: moment().month(),
  selectedWeek: moment().isoWeek(),
  currentDate: moment(),
  currentView: monthView,
  showAppointment: false,
  appointments: [],
  allUsers: [],
  currentUser: undefined
};
