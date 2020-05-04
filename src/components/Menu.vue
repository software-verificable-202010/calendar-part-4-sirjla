<template>
  <div class="menu">
    <h1>Calendar</h1>
    <label for="years">Select a year:</label>
    <select name="years" v-model="selectedYear">
      <option v-for="(year, index) in listOfYears" :key="index" :value="year">
        {{ year }}
      </option>
    </select>
    <br />
    <label for="months">Select a month:</label>
    <select name="months" v-model="selectedMonth">
      <option
        v-for="(month, index) in monthNames"
        :key="index"
        :value="index"
        >{{ month }}</option
      >
    </select>
    <button v-on:click="setCalendarView(calendarView)">Monthly View</button>
    <button v-on:click="setCalendarView(weekView)">Weekly View</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import moment from "moment";
import {
  selectMonthMutation,
  selectYearMutation,
  changeViewMutation
} from "../store/MutationNames";
import { calendarView, weekView } from "@/common/constants.ts";

@Component
export default class Menu extends Vue {
  // Component properties
  monthNames: string[] = moment.months();
  listOfYears: number[] = [...Array(3000).keys()].reverse();

  private calendarView: string = calendarView;
  private weekView: string = weekView;

  // Store getters and setters
  private get selectedMonth(): number {
    return this.$store.state.selectedMonth;
  }

  private set selectedMonth(value: number) {
    this.$store.commit(selectMonthMutation, value);
  }

  private get selectedYear(): number {
    return this.$store.state.selectedYear;
  }

  private set selectedYear(value: number) {
    this.$store.commit(selectYearMutation, value);
  }

  private setCalendarView(view: string) {
    this.$store.commit(changeViewMutation, view);
  }
}
</script>

<style lang="scss" scoped>
.menu {
  width: 100%;
  padding: 5%;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-content: center;
  justify-content: flex-start;
  align-items: center;

  select {
    width: 100%;
  }
}
</style>
