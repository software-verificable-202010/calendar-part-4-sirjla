import moment from "moment";
import { RootState } from "@/types/store";
import { Appointment } from "@/types/Appointment";

const startingDayOfMonth = 1;
const dateComparisonGranularity = "day";

export const getters = {
  selecteddMonthStartingWeekNumber: (state: RootState): number => {
    return moment()
      .set({
        year: state.selectedYear,
        month: state.selectedMonth,
        date: startingDayOfMonth
      })
      .isoWeek();
  },
  getDateAppointments: (state: RootState) => (
    date: moment.Moment
  ): Appointment[] => {
    return state.appointments.filter((appointment: Appointment) =>
      appointment.date.isSame(date, dateComparisonGranularity)
    ).filter((appointment: Appointment) =>
    appointment.owner === state.currentUser || appointment.invitees.includes(state.currentUser!)
  );
  }
};
