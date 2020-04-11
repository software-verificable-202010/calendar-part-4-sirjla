import { expect } from "chai";
import { shallowMount } from "@vue/test-utils";
import Calendar from "@/components/Calendar.vue";
import MockDate from "mockdate";

const mockDateTime = "2020-04-01T12:00:00.000";
const targetDate = "2020-04-01";
const targetDay = 1;
const targetMonth = 3; // Months start at 0
const targetYear = 2020;

describe("Calendar.vue", () => {
  beforeEach(() => {
    MockDate.set(mockDateTime);
  });

  afterEach(() => {
    MockDate.reset();
  });

  /*describe("Properly obtains current date information", () => {
    it("Date is properly obtained", () => {
      const wrapper = shallowMount(Calendar);
      expect(wrapper.vm.$data.currentDate).to.equal(targetDate);
    });

    it("Current day is properly obtained", () => {
      const wrapper = shallowMount(Calendar);
      expect(wrapper.vm.$data.currentDay).to.equal(targetDay);
    });

    it("Current month is properly obtained", () => {
      const wrapper = shallowMount(Calendar);
      expect(wrapper.vm.$data.currentMonth).to.equal(targetMonth);
    });

    it("Current year is properly obtained", () => {
      const wrapper = shallowMount(Calendar);
      expect(wrapper.vm.$data.currentYear).to.equal(targetYear);
    });
  });*/
});
