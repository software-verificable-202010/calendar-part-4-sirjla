import { expect } from "chai";
import { createLocalVue, shallowMount } from "@vue/test-utils";
import Vuex, { Store } from "vuex";
import Date from "@/components/Date.vue";
import MockDate from "mockdate";
import moment from "moment";
import { mutations } from "@/store/mutations";
import { getters } from "@/store/getters";
import { RootState } from "@/types/store";
import { calendarView } from "@/common/constants.ts";

const mockDateTime = "2020-04-01T12:00:00.000";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("Calendar.vue", () => {
  let store: Store<RootState>;
  let state: RootState;

  beforeEach(() => {
    MockDate.set(mockDateTime);
    state = {
      selectedYear: moment().year(),
      selectedMonth: moment().month(),
      currentDate: moment(),
      currentView: calendarView
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
      expect(wrapper.vm.$props.date.isSame(moment(), dateComparisonGranularity))
        .to.true;
    });

    it("Date number is properly deducted", () => {
      const wrapper = shallowMount(Date, {
        store,
        localVue,
        propsData: {
          date: moment()
        }
      });
      expect(wrapper.vm.$data.dateNumber).to.equal(moment().date());
    });

    it("Iso week number is properly deducted", () => {
      const wrapper = shallowMount(Date, {
        store,
        localVue,
        propsData: {
          date: moment()
        }
      });
      expect(wrapper.vm.$data.isoWeekDay).to.equal(moment().isoWeekday());
    });
  });
});
