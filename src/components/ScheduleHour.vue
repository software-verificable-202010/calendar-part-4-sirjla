<template>
  <div :class="hourClass">
    <div class="interval interval-first">
      <AppointmentView
        v-for="(appointment, index) in getAppointmentsByInterval(0)"
        :key="index"
        :appointment="appointment"
        :intervalSize="showIntervalMinutes"
        :interval="0"
      />
    </div>
    <div class="interval interval-second">
      <AppointmentView
        v-for="(appointment, index) in getAppointmentsByInterval(1)"
        :key="index"
        :appointment="appointment"
        :intervalSize="showIntervalMinutes"
        :interval="1"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { Appointment } from "@/types/Appointment";
import AppointmentView from "@/components/AppointmentView.vue";
//import moment from "moment";

const hourClass = "hour";

@Component({
  components: {
    AppointmentView
  }
})
export default class ScheduleHour extends Vue {
  @Prop() private hour!: number;
  @Prop() private appointments!: Appointment[];
  @Prop() private weekDayName!: string;

  private showIntervalMinutes = 30;

  private get hourAppointments(): Appointment[] {
    return this.appointments.filter(
      appointment =>
        this.hour >= appointment.startTime.hour &&
        this.hour <= appointment.endTime.hour
    );
  }

  private getAppointmentsByInterval(interval: number) {
    return this.appointments.filter(appointment => {
      if (appointment.startTime.hour == this.hour) {
        if (interval == 0) {
          if (appointment.startTime.minute <= 30) return true;
        }
        if (interval == 1) {
          return true;
        }
      }
      if (appointment.endTime.hour == this.hour) {
        if (interval == 0) {
          return true;
        }
        if (interval == 1) {
          if (appointment.endTime.minute > 30) return true;
        }
      }
      if (
        this.hour > appointment.startTime.hour &&
        this.hour < appointment.endTime.hour
      )
        return true;
      return false;
    });
  }

  private get hourClass(): string[] {
    return [hourClass, `${this.weekDayName}-hour-${this.hour}`];
  }
}
</script>

<style lang="scss" scoped>
.hour {
  background-color: $background-color;
  display: grid;
  grid-template-rows: 1fr 1fr;
  row-gap: 1%;
  column-gap: 1%;
  width: 100%;
  height: 100%;
  grid-template-areas: "first-half" "second-half";
}
@each $day in $days {
  @for $i from 0 through 23 {
    .#{$day}-hour-#{$i} {
      grid-area: #{$day}-hour-#{$i};
    }
  }
}

.interval {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-around;
  padding: 1%;
  &-first {
    grid-area: first-half;
  }
  &-second {
    grid-area: second-half;
  }
}
</style>
