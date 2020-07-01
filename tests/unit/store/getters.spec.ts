import { getters } from "@/store/getters";
import MockDate from "mockdate";
import { RootState } from "@/types/store";
import { monthView } from "@/common/constants.ts";
import moment from "moment";

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
      selectedWeek: moment().isoWeek(),
      currentDate: moment(),
      currentView: monthView,
      showAppointment: false,
      appointments: [],
      allUsers: [],
      currentUser: undefined,
      appointmentToEdit: undefined
    };
  });

  it("Iso week is obtained correctly", () => {
    const isoWeek = getters.selecteddMonthStartingWeekNumber(state);
    expect(isoWeek).toEqual(moment().isoWeek());
  });

  it("Empty Appointments are obtained correctly", () => {
    const appointments = getters.getDateAppointments(state)(moment());
    expect(appointments).toHaveLength(0);
  });

  it("Appointments are obtained correctly", () => {
    const user = 'user';
    const user2 = 'user2';
    const originalAppointments = [
      {
        date: moment(),
        title: 'appointment 1',
        description: '',
        startTime: { hour: 10, minute: 30 },
        endTime: { hour: 11, minute: 30 },
        owner: user,
        invitees: []
      },
      {
        date: moment(),
        title: 'appointment 2',
        description: '',
        startTime: { hour: 10, minute: 30 },
        endTime: { hour: 11, minute: 30 },
        owner: user2,
        invitees: []
      }
    ]
    
    state.currentUser = user;
    state.appointments = originalAppointments;
    
    const appointments = getters.getDateAppointments(state)(moment());
    expect(appointments).toHaveLength(1);
  });
});
