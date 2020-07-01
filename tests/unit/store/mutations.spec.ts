import { mutations } from "@/store/mutations";
import { RootState } from "@/types/store";
import moment from "moment";
import { monthView } from "@/common/constants.ts";

const { selectMonth, selectYear, changeView, changeShowAppointment, setCurrentUser, unsetCurrentUser, setAppointmentToEdit } = mutations;

describe("Store Mutations", () => {
  const originalMonth = 3;
  const originalYear = 2020;

  let state: RootState;

  beforeEach(() => {
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

  it("Month is updated correctly", () => {
    const targetMonth = 5;
    selectMonth(state, targetMonth);
    expect(state.selectedMonth).toEqual(targetMonth);
  });

  it("Month over 11 wont increases year", () => {
    const targetMonth = 12;
    const sameYear = 2020;
    selectMonth(state, targetMonth);
    expect(state.selectedYear).toEqual(sameYear);
  });

  it("Month over 11 increases starts again", () => {
    const targetMonth = 12;
    const newMonth = 0;
    selectMonth(state, targetMonth);
    expect(state.selectedMonth).toEqual(newMonth);
  });

  it("Year is updated correctly", () => {
    const targetYear = 5;
    selectYear(state, targetYear);
    expect(state.selectedYear).toEqual(targetYear);
  });

  it("View is updated correctly", () => {
    const viewName = 'week';
    expect(state.currentView).not.toEqual(viewName);
    changeView(state, viewName);
    expect(state.currentView).toEqual(viewName);
  });

  it("Modal display is off by default", () => {
    expect(state.showAppointment).toEqual(false);
  });

  it("Modal display is swiched by default", () => {
    expect(state.showAppointment).toEqual(false);
    changeShowAppointment(state, true);
    expect(state.showAppointment).toEqual(true);
  });

  it("User is correctly set", () => {
    const user = 'user';
    expect(state.currentUser).not.toEqual(user);
    setCurrentUser(state, user);
    expect(state.currentUser).toEqual(user);
  });

  it("User is correctly unset", () => {
    const user = 'user';
    setCurrentUser(state, user);
    expect(state.currentUser).toEqual(user);
    unsetCurrentUser(state);
    expect(state.currentUser).toBeUndefined();
  });

  it("Does not set appointment of other user to edit", () => {
    const user = 'user';
    const appointment = {
      date: moment(),
      title: 'appointment 2',
      description: '',
      startTime: { hour: 10, minute: 30 },
      endTime: { hour: 11, minute: 30 },
      owner: user,
      invitees: []
    }
    expect(state.currentUser).not.toEqual(user);
    setAppointmentToEdit(state, appointment);

    expect(state.appointmentToEdit).not.toEqual(appointment);
  });

  it("Set appointment of user to edit", () => {
    const user = 'user';
    const appointment = {
      date: moment(),
      title: 'appointment 2',
      description: '',
      startTime: { hour: 10, minute: 30 },
      endTime: { hour: 11, minute: 30 },
      owner: user,
      invitees: []
    }
    setCurrentUser(state, user);
    expect(state.currentUser).toEqual(user);
    setAppointmentToEdit(state, appointment);
    expect(state.appointmentToEdit).toEqual(appointment);
  });

});
