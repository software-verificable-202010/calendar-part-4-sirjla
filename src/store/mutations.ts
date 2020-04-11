import { RootState } from "@/types/store";

const monthNumberUpperLimit = 12;

export const mutations = {
  selectMonth(state: RootState, month: number) {
    state.selectedMonth = month % monthNumberUpperLimit;
  },
  selectYear(state: RootState, year: number) {
    state.selectedYear = year;
  }
};
