<template>
  <div :class="hourClass">
    <div class="interval interval-first">
      <AppointmentView
        v-for="(appointment, index) in getAppointmentsByInterval(firstInterval)"
        :key="index"
        :appointment="appointment"
      />
    </div>
    <div class="interval interval-second">
      <AppointmentView
        v-for="(appointment, index) in getAppointmentsByInterval(
          secondInterval
        )"
        :key="index"
        :appointment="appointment"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { Appointment } from "@/types/Appointment";
import AppointmentView from "@/components/AppointmentView.vue";

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
  private firstInterval = 0;
  private secondInterval = 1;

  private getAppointmentsByInterval(interval: number) {
    return this.appointments.filter((appointment: Appointment) => {
      if (appointment.startTime.hour == this.hour) {
        if (interval == this.firstInterval) {
          if (appointment.startTime.minute <= this.showIntervalMinutes) {
            return true;
          }
        }
        if (
          interval == this.secondInterval &&
          appointment.endTime.hour != this.hour
        ) {
          return true;
        }
      }
      if (appointment.endTime.hour == this.hour) {
        if (interval == this.firstInterval) {
          return true;
        }
        if (interval == this.secondInterval) {
          if (appointment.endTime.minute > this.showIntervalMinutes) {
            return true;
          }
        }
      }
      if (
        this.hour > appointment.startTime.hour &&
        this.hour < appointment.endTime.hour
      ) {
        return true;
      }
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
