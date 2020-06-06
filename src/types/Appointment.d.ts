import moment from "moment";

interface AppointmentTime {
  hour: number;
  minute: number;
}

interface Appointment {
  date: moment.Moment;
  title: string;
  description: string;
  startTime: AppointmentTime;
  endTime: AppointmentTime;
  owner: string;
}

export { Appointment };
