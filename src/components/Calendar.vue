<template>
  <div class="calendar">
    <div class="calendar-header">
      <div
        v-for="(weekdayColumn, index) in weekdayHeaderData"
        :key="index"
        :class="weekdayColumn.headerClassName"
      >
        {{ weekdayColumn.displayName }}
      </div>
    </div>
    <Date v-for="(date, index) in calendarDates" :key="index" :date="date" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import moment from "moment";
import { HeaderData } from "@/types/Calendar";
import Date from "./Date.vue";

@Component({
  components: {
    Date
  }
})
export default class Calendar extends Vue {
  // Store getters and setter
  private get selectedMonth(): number {
    return this.$store.state.selectedMonth;
  }
  private get selectedYear(): number {
    return this.$store.state.selectedYear;
  }

  // Computed methods
  private get calendarDates(): moment.Moment[] {
    const baseMoment: moment.Moment = moment().set({
      year: this.selectedYear,
      month: this.selectedMonth
    });
    return [...Array(baseMoment.daysInMonth()).keys()]
      .map((dateNumber: number): number => ++dateNumber)
      .map(
        (dateNumber: number): moment.Moment =>
          baseMoment.clone().set({
            date: dateNumber
          })
      );
  }

  private get weekdayHeaderData(): HeaderData[] {
    return moment.weekdays().map(
      (weekdayName: string): HeaderData => ({
        displayName: weekdayName,
        headerClassName: `header${weekdayName}`
      })
    );
  }
}
</script>

<style lang="scss" scoped>
.calendar {
  display: grid;
  margin: 1%;
  width: 98%;
  height: 97%;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 4fr 4fr 4fr 4fr 4fr 4fr;
  column-gap: 1%;
  row-gap: 1%;
  justify-items: center;
  align-items: center;
  border-color: $tertiary-color;
  border-width: 1%;
  border-style: solid;
  grid-template-areas:
    "header header header header header header header"
    "firstMonday firstTuesday firstWednesday firstThursday firstFriday firstSaturday firstSunday"
    "secondMonday secondTuesday secondWednesday secondThursday secondFriday secondSaturday secondSunday"
    "thirdMonday thirdTuesday thirdWednesday thirdThursday thirdFriday thirdSaturday thirdSunday"
    "fourthMonday fourthTuesday fourthWednesday fourthThursday fourthFriday fourthSaturday fourthSunday"
    "fifthMonday fifthTuesday fifthWednesday fifthThursday fifthFriday fifthSaturday fifthSunday"
    "sixthMonday sixthTuesday sixthWednesday sixthThursday sixthFriday sixthSaturday sixthSunday";
}
.calendar-header {
  grid-area: header;
  display: grid;
  column-gap: 1%;
  grid-template-rows: 1fr;
  width: 100%;
  height: 100%;
  justify-items: center;
  background-color: $tertiary-color;
  align-items: center;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-areas: "headerMonday headerTuesday headerWednesday headerThursday headerFriday headerSaturday headerSunday";
}

@each $weekday in $days {
  .header#{$weekday} {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    grid-area: header#{$weekday};
  }
}
</style>
