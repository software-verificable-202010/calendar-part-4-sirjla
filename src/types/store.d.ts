import moment from "moment";

interface RootState {
  selectedYear: number;
  selectedMonth: number;
  selectedWeek: number;
  currentDate: moment.Moment;
  currentView: string;
}

export { RootState };
