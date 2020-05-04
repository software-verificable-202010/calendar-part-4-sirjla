import { RootState } from "@/types/store";

const monthNumberUpperLimit = 12;

export const mutations = {
  selectMonth(state: RootState, month: number) {
    state.selectedMonth = month % monthNumberUpperLimit;
  },
  selectYear(state: RootState, year: number) {
    state.selectedYear = year;
  },
  changeView(state: RootState, view: string) {
    state.currentView = view;
  },
  changeWeek(state: RootState, weekdifferential: number) {
    state.selectedWeek += weekdifferential;
  }
};
