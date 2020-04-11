import { expect } from "chai";
import { getters } from "@/store/getters";
import moment from "moment";
import MockDate from "mockdate";
import { RootState } from "@/types/store";

describe("Store Getters", () => {
  const originalMonth = 3;
  const originalYear = 2020;
  const mockDateTime = "2020-04-01T12:00:00.000";

  let state: RootState;

  beforeEach(() => {
    MockDate.set(mockDateTime);
    state = {
      selectedYear: originalYear,
      selectedMonth: originalMonth,
      currentDate: moment()
    };
  });

  it("Iso week is obtained correctly", () => {
    const isoWeek = getters.selecteddMonthStartingWeekNumber(state);
    expect(isoWeek).to.equal(moment().isoWeek());
  });
});
