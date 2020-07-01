import { createLocalVue, shallowMount } from "@vue/test-utils";
import Vuex, { Store } from "vuex";
import Date from "@/components/Date.vue";
import MockDate from "mockdate";
import moment, { weekdays } from "moment";
import { mutations } from "@/store/mutations";
import { getters } from "@/store/getters";
import { RootState } from "@/types/store";
import { monthView } from "@/common/constants.ts";
import {
  momentJsWeekdayNameFormatter
} from "@/common/constants";

const mockDateTime = "2020-04-01T12:00:00.000";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("Date.vue", () => {
  let store: Store<RootState>;
  let state: RootState;

  beforeEach(() => {
    MockDate.set(mockDateTime);
    state = {
      selectedYear: moment().year(),
      selectedMonth: moment().month(),
      selectedWeek: moment().isoWeek(),
      currentDate: moment(),
      currentView: monthView,
      showAppointment: false,
      appointments: [],
      allUsers: [],
      currentUser: undefined,
      appointmentToEdit: undefined
    };
    store = new Vuex.Store<RootState>({
      state,
      getters,
      mutations
    });
  });

  afterEach(() => {
    MockDate.reset();
  });

  describe("Properly receives props", () => {
    it("Date is properly obtained", () => {
      const dateComparisonGranularity = "date";
      const wrapper = shallowMount(Date, {
        store,
        localVue,
        propsData: {
          date: moment()
        }
      });
      expect(
        wrapper.props().date.isSame(moment(), dateComparisonGranularity)
      ).toBe(true);
    });

    it("Date number is properly deducted", () => {
      const wrapper: any = shallowMount(Date, {
        store,
        localVue,
        propsData: {
          date: moment()
        }
      });
      expect(wrapper.vm.dateNumber).toEqual(moment().date());
    });

    it("Iso week number is properly deducted", () => {
      const wrapper: any = shallowMount(Date, {
        store,
        localVue,
        propsData: {
          date: moment()
        }
      });
      expect(wrapper.vm.isoWeekDay).toEqual(moment().isoWeekday());
    });

    it("Weekday name is obtained properly", () => {
      const wrapper: any = shallowMount(Date, {
        store,
        localVue,
        propsData: {
          date: moment()
        }
      });
      expect(wrapper.vm.weekDayName).toEqual(moment().format(momentJsWeekdayNameFormatter));
    });

    it("Generates order correctly", () => {
      const weekdayOrders = ["first", "second", "third", "fourth", "fifth", "sixth"];
      const wrapper: any = shallowMount(Date, {
        store,
        localVue,
        propsData: {
          date: moment()
        }
      });

      const isoWeekdayNumberDifference = 0;

      expect(wrapper.vm.transformIsoWeekNumberToOrder()).toEqual(weekdayOrders[isoWeekdayNumberDifference]);
    });
  });
});
