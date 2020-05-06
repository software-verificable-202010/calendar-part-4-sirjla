import { RootState } from "@/types/store";
import { Appointment } from "@/types/Appointment";
import storage from "electron-json-storage";
import { appointmentDB } from "@/common/constants";

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
  },
  changeShowAppointment(state: RootState, newStatus: boolean) {
    state.showAppointment = newStatus;
  },
  insertAppointment(state: RootState, appointment: Appointment) {
    state.appointments.push(appointment);

    storage.set(appointmentDB, state.appointments, function(error) {
      if (error) throw error;
    });
  },
  loadAppoinments(state: RootState, appointments: Appointment[]) {
    state.appointments = appointments;
  }
};
