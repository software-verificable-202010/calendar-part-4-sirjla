<template>
  <div class="week">
    <div
      v-for="(date, index) in calendarDates"
      :key="`header-${index}`"
      class="date-number"
    >
      {{ date.date() }}
    </div>
    <div class="emptyHeader">Hour</div>
    <div v-for="(hour, index) in hours" :key="`block-${index}`">
      {{ formatHour(hour) }}
    </div>
    <template v-for="(date, dateIndex) in calendarDates">
      <ScheduleHour
        v-for="(hour, hourIndex) in hours"
        :key="`date-${dateIndex}-hour-${hourIndex}`"
        :hour="hour"
        :appointments="appointments(date)"
        :weekDayName="weekDayName(date)"
      />
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import moment from "moment";
import ScheduleHour from "@/components/ScheduleHour.vue";
import { Appointment } from "@/types/Appointment";

const momentJsWeekdayNameFormatter = "dddd";

@Component({
  components: {
    ScheduleHour
  }
})
export default class Week extends Vue {
  private hoursInDay = 24;
  private daysInWeek = 7;
  private hours = [...Array(this.hoursInDay).keys()];

  private formatHour(hour: number) {
    const paddingSymbol = "0";
    const paddingSize = 2;
    return `${hour}:00`.padStart(paddingSize, paddingSymbol);
  }

  private get getSelectedWeek(): number {
    return this.$store.state.selectedWeek;
  }

  private get calendarDates(): moment.Moment[] {
    const mondayDay = 1;
    const baseMoment: moment.Moment = moment().set({
      isoWeek: this.getSelectedWeek,
      day: mondayDay
    });
    return [...Array(this.daysInWeek).keys()]
      .map((dateNumber: number): number => +dateNumber)
      .map(
        (dateNumber: number): moment.Moment =>
          baseMoment.clone().set({
            date: baseMoment.date() + dateNumber
          })
      );
  }

  private appointments(date: moment.Moment): Appointment[] {
    return this.$store.getters.getDateAppointments(date);
  }

  private weekDayName(date: moment.Moment): string {
    return date.format(momentJsWeekdayNameFormatter);
  }
}
</script>

<style lang="scss" scoped>
.emptyHeader {
  grid-area: emptyHeader;
}
.dayTime {
  grid-area: dayTime-0;
  background-color: $tertiary-color;
}
.week {
  display: grid;
  background-color: $tertiary-color;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 2fr 2fr 2fr 2fr 2fr 2fr 2fr 2fr 2fr 2fr 2fr 2fr 2fr 2fr 2fr 2fr 2fr 2fr 2fr 2fr 2fr 2fr 2fr 2fr;
  column-gap: 0.5%;
  row-gap: 0.5%;
  justify-items: center;
  align-items: center;
  grid-template-areas:
    "emptyHeader Monday Tuesday Wednesday Thursday Friday Saturday Sunday"
    "dayTime-0 Monday-hour-0 Tuesday-hour-0 Wednesday-hour-0 Thursday-hour-0 Friday-hour-0 Saturday-hour-0 Sunday-hour-0"
    "dayTime-1 Monday-hour-1 Tuesday-hour-1 Wednesday-hour-1 Thursday-hour-1 Friday-hour-1 Saturday-hour-1 Sunday-hour-1"
    "dayTime-2 Monday-hour-2 Tuesday-hour-2 Wednesday-hour-2 Thursday-hour-2 Friday-hour-2 Saturday-hour-2 Sunday-hour-2"
    "dayTime-3 Monday-hour-3 Tuesday-hour-3 Wednesday-hour-3 Thursday-hour-3 Friday-hour-3 Saturday-hour-3 Sunday-hour-3"
    "dayTime-4 Monday-hour-4 Tuesday-hour-4 Wednesday-hour-4 Thursday-hour-4 Friday-hour-4 Saturday-hour-4 Sunday-hour-4"
    "dayTime-5 Monday-hour-5 Tuesday-hour-5 Wednesday-hour-5 Thursday-hour-5 Friday-hour-5 Saturday-hour-5 Sunday-hour-5"
    "dayTime-6 Monday-hour-6 Tuesday-hour-6 Wednesday-hour-6 Thursday-hour-6 Friday-hour-6 Saturday-hour-6 Sunday-hour-6"
    "dayTime-7 Monday-hour-7 Tuesday-hour-7 Wednesday-hour-7 Thursday-hour-7 Friday-hour-7 Saturday-hour-7 Sunday-hour-7"
    "dayTime-8 Monday-hour-8 Tuesday-hour-8 Wednesday-hour-8 Thursday-hour-8 Friday-hour-8 Saturday-hour-8 Sunday-hour-8"
    "dayTime-9 Monday-hour-9 Tuesday-hour-9 Wednesday-hour-9 Thursday-hour-9 Friday-hour-9 Saturday-hour-9 Sunday-hour-9"
    "dayTime-10 Monday-hour-10 Tuesday-hour-10 Wednesday-hour-10 Thursday-hour-10 Friday-hour-10 Saturday-hour-10 Sunday-hour-10"
    "dayTime-11 Monday-hour-11 Tuesday-hour-11 Wednesday-hour-11 Thursday-hour-11 Friday-hour-11 Saturday-hour-11 Sunday-hour-11"
    "dayTime-12 Monday-hour-12 Tuesday-hour-12 Wednesday-hour-12 Thursday-hour-12 Friday-hour-12 Saturday-hour-12 Sunday-hour-12"
    "dayTime-13 Monday-hour-13 Tuesday-hour-13 Wednesday-hour-13 Thursday-hour-13 Friday-hour-13 Saturday-hour-13 Sunday-hour-13"
    "dayTime-14 Monday-hour-14 Tuesday-hour-14 Wednesday-hour-14 Thursday-hour-14 Friday-hour-14 Saturday-hour-14 Sunday-hour-14"
    "dayTime-15 Monday-hour-15 Tuesday-hour-15 Wednesday-hour-15 Thursday-hour-15 Friday-hour-15 Saturday-hour-15 Sunday-hour-15"
    "dayTime-16 Monday-hour-16 Tuesday-hour-16 Wednesday-hour-16 Thursday-hour-16 Friday-hour-16 Saturday-hour-16 Sunday-hour-16"
    "dayTime-17 Monday-hour-17 Tuesday-hour-17 Wednesday-hour-17 Thursday-hour-17 Friday-hour-17 Saturday-hour-17 Sunday-hour-17"
    "dayTime-18 Monday-hour-18 Tuesday-hour-18 Wednesday-hour-18 Thursday-hour-18 Friday-hour-18 Saturday-hour-18 Sunday-hour-18"
    "dayTime-19 Monday-hour-19 Tuesday-hour-19 Wednesday-hour-19 Thursday-hour-19 Friday-hour-19 Saturday-hour-19 Sunday-hour-19"
    "dayTime-20 Monday-hour-20 Tuesday-hour-20 Wednesday-hour-20 Thursday-hour-20 Friday-hour-20 Saturday-hour-20 Sunday-hour-20"
    "dayTime-21 Monday-hour-21 Tuesday-hour-21 Wednesday-hour-21 Thursday-hour-21 Friday-hour-21 Saturday-hour-21 Sunday-hour-21"
    "dayTime-22 Monday-hour-22 Tuesday-hour-22 Wednesday-hour-22 Thursday-hour-22 Friday-hour-22 Saturday-hour-22 Sunday-hour-22"
    "dayTime-23 Monday-hour-23 Tuesday-hour-23 Wednesday-hour-23 Thursday-hour-23 Friday-hour-23 Saturday-hour-23 Sunday-hour-23";
}
</style>
