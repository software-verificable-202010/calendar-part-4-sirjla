import { expect } from "chai";
import { mutations } from "@/store/mutations";
import { RootState } from "@/types/store";
import moment from "moment";

const { selectMonth, selectYear } = mutations;

describe("Store Mutations", () => {
  const originalMonth = 3;
  const originalYear = 2020;

  let state: RootState;

  beforeEach(() => {
    state = {
      selectedYear: originalYear,
      selectedMonth: originalMonth,
      currentDate: moment()
    };
  });

  it("Month is updated correctly", () => {
    const targetMonth = 5;
    selectMonth(state, targetMonth);
    expect(state.selectedMonth).to.equal(targetMonth);
  });

  it("Month over 11 wont increases year", () => {
    const targetMonth = 12;
    const sameYear = 2020;
    selectMonth(state, targetMonth);
    expect(state.selectedYear).to.equal(sameYear);
  });

  it("Month over 11 increases starts again", () => {
    const targetMonth = 12;
    const newMonth = 0;
    selectMonth(state, targetMonth);
    expect(state.selectedMonth).to.equal(newMonth);
  });

  it("Year is updated correctly", () => {
    const targetYear = 5;
    selectYear(state, targetYear);
    expect(state.selectedYear).to.equal(targetYear);
  });
});
