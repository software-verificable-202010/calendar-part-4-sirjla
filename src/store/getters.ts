import moment from "moment";
import { RootState } from "@/types/store";

const startingDayOfMonth = 1;

export const getters = {
  selecteddMonthStartingWeekNumber: (state: RootState): number => {
    return moment()
      .set({
        year: state.selectedYear,
        month: state.selectedMonth,
        date: startingDayOfMonth
      })
      .isoWeek();
  }
};
