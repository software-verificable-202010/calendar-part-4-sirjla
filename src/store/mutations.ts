import { RootState } from "@/types/store";
import { Appointment } from "@/types/Appointment";
import storage from "electron-json-storage";
import { appointmentDB, userDB } from "@/common/constants";

const monthNumberUpperLimit = 12;
// Warning is disabled on the next line due to not being
// able to control the object type
// eslint-disable-next-line
function updateDB(db: string, object: any) {
  storage.set(db, object, function(error) {
    if (error) throw error;
  });
}

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
  },
  changeShowAppointment(state: RootState, newStatus: boolean) {
    state.showAppointment = newStatus;
  },
  insertAppointment(state: RootState, appointment: Appointment) {
    state.appointments.push(appointment);
    updateDB(appointmentDB, state.appointments);
  },
  updateAppointmentDB(state: RootState) {
    updateDB(appointmentDB, state.appointments);
  },
  loadAppoinments(state: RootState, appointments: Appointment[]) {
    state.appointments = appointments;
  },
  insertUser(state: RootState, user: string) {
    state.allUsers.push(user);
    updateDB(userDB, state.allUsers);
  },
  loadUsers(state: RootState, users: string[]) {
    state.allUsers = users;
  },
  setCurrentUser(state: RootState, user: string) {
    state.currentUser = user;
  },
  unsetCurrentUser(state: RootState) {
    state.currentUser = undefined;
  },
  setAppointmentToEdit(state: RootState, appointment: Appointment) {
    if (state.currentUser === appointment.owner) {
      state.appointmentToEdit = appointment;
    }
  },
  unsetAppointmentToEdit(state: RootState) {
    state.appointmentToEdit = undefined;
  },
  deleteAppointment(state: RootState, appointment: Appointment) {
    state.appointments = state.appointments.filter(
      (app: Appointment) => app !== appointment
    );
    updateDB(appointmentDB, state.appointments);
  }
};
