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
  allUsers: string[];
  currentUser: string | undefined;
  appointmentToEdit: Appointment | undefined;
}

export { RootState };
