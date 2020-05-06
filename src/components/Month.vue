<template>
  <div class="month">
    <Date v-for="(date, index) in calendarDates" :key="index" :date="date" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import moment from "moment";
import Date from "./Date.vue";

@Component({
  components: {
    Date
  }
})
export default class Month extends Vue {
  // Store getters and setter
  private get selectedMonth(): number {
    return this.$store.state.selectedMonth;
  }
  private get selectedYear(): number {
    return this.$store.state.selectedYear;
  }

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
}
</script>

<style lang="scss" scoped>
.month {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 4fr 4fr 4fr 4fr 4fr 4fr;
  column-gap: 1%;
  row-gap: 1%;
  justify-items: center;
  align-items: center;
  grid-template-areas:
    "firstMonday firstTuesday firstWednesday firstThursday firstFriday firstSaturday firstSunday"
    "secondMonday secondTuesday secondWednesday secondThursday secondFriday secondSaturday secondSunday"
    "thirdMonday thirdTuesday thirdWednesday thirdThursday thirdFriday thirdSaturday thirdSunday"
    "fourthMonday fourthTuesday fourthWednesday fourthThursday fourthFriday fourthSaturday fourthSunday"
    "fifthMonday fifthTuesday fifthWednesday fifthThursday fifthFriday fifthSaturday fifthSunday"
    "sixthMonday sixthTuesday sixthWednesday sixthThursday sixthFriday sixthSaturday sixthSunday";
}
</style>
