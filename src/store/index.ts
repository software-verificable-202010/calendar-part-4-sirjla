import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import { RootState } from '../types/store';
import moment from "moment";
import {
  selectMonthAction,
  selectYearAction
} from "./ActionNames";

Vue.use(Vuex);

const startingDayOfMonth = 1;

const store: StoreOptions<RootState> = {
  state: {
    selectedYear: moment().year(),
    selectedMonth: moment().month(),
    currentDate: moment()
  },
  mutations: {
    selectMonth(state, month: number) {
      state.selectedMonth = month;
    },
    selectYear(state, year: number) {
      state.selectedYear = year;
    }
  },
  actions: {
    selectMonth(context, month: number) {
      context.commit(selectMonthAction, month);
    },
    selectYear(context, year: number) {
      context.commit(selectYearAction, year);
    }
  },
  modules: {},
  getters: {
    selecteddMonthStartingWeekNumber: (state): number => {
      return moment().set({
        year: state.selectedYear,
        month: state.selectedMonth,
        date: startingDayOfMonth
      }).isoWeek();
    }
  }
};

export default new Vuex.Store<RootState>(store);