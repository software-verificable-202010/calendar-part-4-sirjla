<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <slot name="header">
              Appointment
            </slot>
          </div>
          <div class="modal-body">
            <label>Title:</label>
            <input type="text" v-model="title" placeholder="Title" required />
            <br />
            <label>Description:</label>
            <textarea
              cols="30"
              rows="10"
              v-model="description"
              placeholder="Description"
            >
            </textarea>
            <br />
            <label>Date:</label>
            <select name="years" v-model="selectedYear">
              <option
                v-for="(year, index) in listOfYears"
                :key="index"
                :value="year"
              >
                {{ year }}
              </option>
            </select>
            <select name="months" v-model="selectedMonth">
              <option
                v-for="(month, index) in monthNames"
                :key="index"
                :value="index"
                >{{ month }}</option
              >
            </select>
            <select name="dates" v-model="selectedDate">
              <option
                v-for="(day, index) in availableDays"
                :key="index"
                :value="day"
                >{{ day }}</option
              >
            </select>
            <br />
            <label>Start Time:</label>
            <select name="startHours" v-model="startHour">
              <option
                v-for="(hour, index) in hours"
                :key="index"
                :value="hour"
                >{{ hour }}</option
              >
            </select>
            <select name="startMinutes" v-model="startMinute">
              <option
                v-for="(minute, index) in minutes"
                :key="index"
                :value="minute"
                >{{ minute }}</option
              >
            </select>
            <br />
            <label>End Time:</label>
            <select name="endHours" v-model="endHour">
              <option
                v-for="(hour, index) in endHours"
                :key="index"
                :value="hour"
                >{{ hour }}</option
              >
            </select>
            <select name="endMinutes" v-model="endMinute">
              <option
                v-for="(minute, index) in endMinutes"
                :key="index"
                :value="minute"
                >{{ minute }}</option
              >
            </select>
            <div v-for="(user, index) in posibleInvitees" :key="index">
              <input
                type="checkbox"
                :id="user"
                :value="user"
                v-model="invitees"
              />
              <label :for="user">{{ user }}</label>
            </div>
          </div>
          <div class="modal-footer">
            <slot name="footer">
              <button class="modal-default-button" @click="$emit(closeEvent)">
                Cancel
              </button>
              <button class="modal-default-button" @click="saveAppointment()">
                Save
              </button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import moment from "moment";
import { insertAppointmentMutation } from "../store/MutationNames";
import { Appointment } from "@/types/Appointment";
import {
  minuteOffset,
  emptyString,
  startingNumber,
  listOfYears,
  monthNames,
  closeEvent
} from "@/common/constants";

@Component({})
export default class AppointmentManager extends Vue {
  private listOfYears: number[] = listOfYears;
  private monthNames: string[] = monthNames;
  private closeEvent = closeEvent;

  private hours: number[] = [...Array(24).keys()];
  private minutes: number[] = [...Array(60).keys()];

  private appointment: Appointment = {
    date: moment().set({
      date: this.$store.state.currentDate.date(),
      month: this.$store.state.currentDate.month(),
      year: this.$store.state.currentDate.year()
    }),
    title: emptyString,
    description: emptyString,
    startTime: {
      hour: startingNumber,
      minute: startingNumber
    },
    endTime: {
      hour: startingNumber,
      minute: minuteOffset
    },
    owner: this.$store.state.currentUser,
    invitees: []
  };

  private get invitees(): string[] {
    return this.appointment.invitees;
  }

  private set invitees(value: string[]) {
    this.appointment.invitees = value;
  }

  private get posibleInvitees(): string[] {
    return this.$store.state.allUsers.filter(
      (user: string) => user !== this.appointment.owner
    );
  }

  get endHours(): number[] {
    return this.hours.filter(
      (hour: number) => hour >= this.appointment.startTime.hour
    );
  }

  get endMinutes(): number[] {
    if (this.appointment.startTime.hour !== this.appointment.endTime.hour) {
      return this.minutes;
    }
    return this.minutes.filter(
      (minute: number) => minute > this.appointment.startTime.minute
    );
  }

  private get availableDays(): number[] {
    return [...Array(this.appointmentMoment.daysInMonth()).keys()].map(
      (day: number) => ++day
    );
  }

  private get title(): string {
    return this.appointment.title;
  }
  private set title(value: string) {
    this.appointment.title = value;
  }

  private get description(): string {
    return this.appointment.description;
  }
  private set description(value: string) {
    this.appointment.description = value;
  }

  private get appointmentMoment(): moment.Moment {
    return this.appointment.date;
  }

  private get selectedDate(): number {
    return this.appointment.date.date();
  }
  private set selectedDate(value: number) {
    this.appointment.date.date(value);
  }

  private get selectedMonth(): number {
    return this.appointment.date.month();
  }
  private set selectedMonth(value: number) {
    this.appointment.date.month(value);
  }

  private get selectedYear(): number {
    return this.appointment.date.year();
  }
  private set selectedYear(value: number) {
    this.appointment.date.year(value);
  }

  private get startHour(): number {
    return this.appointment.startTime.hour;
  }
  private set startHour(value: number) {
    this.appointment.startTime.hour = value;
    // The end time hour cannot be lower than the start time hour
    this.appointment.endTime.hour = value;
  }

  private get startMinute(): number {
    return this.appointment.startTime.minute;
  }
  private set startMinute(value: number) {
    this.appointment.startTime.minute = value;
    // The event has to have atleast 1 minute duration
    if (this.appointment.startTime.hour === this.appointment.endTime.hour) {
      this.appointment.endTime.minute = value + minuteOffset;
    }
  }

  private get endHour(): number {
    return this.appointment.endTime.hour;
  }
  private set endHour(value: number) {
    this.appointment.endTime.hour = value;
  }

  private get endMinute(): number {
    return this.appointment.endTime.minute;
  }
  private set endMinute(value: number) {
    this.appointment.endTime.minute = value;
  }

  private saveAppointment(): void {
    if (this.appointment.title === emptyString) return;
    this.$store.commit(insertAppointmentMutation, this.appointment);
    this.$emit(this.closeEvent);
  }
}
</script>

<style lang="scss" scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 50%;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
