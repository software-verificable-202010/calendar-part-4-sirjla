import moment from "moment";
import { Appointment } from "@/types/Appointment";

interface RootState {
  selectedYear: number;
  selectedMonth: number;
  selectedWeek: number;
  currentDate: moment.Moment;
  currentView: string;
  showAppointment: boolean;
  appointments: Appointment[];
}

export { RootState };
