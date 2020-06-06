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
    <button v-on:click="setView(monthView)">Monthly View</button>
    <button v-on:click="setView(weekView)">Weekly View</button>
    <button v-on:click="changeWeek(-1)">Prev Week</button>
    <button v-on:click="changeWeek(1)">Next Week</button>
    <button v-on:click="showAppointment()">Create Appointment</button>
    <button v-on:click="logOut()">Log Out</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import {
  selectMonthMutation,
  selectYearMutation,
  changeViewMutation,
  changeWeekMutation,
  changeShowAppointmentMutation,
  unsetCurrentUserMutation
} from "../store/MutationNames";
import {
  monthView,
  weekView,
  listOfYears,
  monthNames
} from "@/common/constants.ts";

@Component
export default class Menu extends Vue {
  // Component properties
  private monthNames: string[] = monthNames;
  private listOfYears: number[] = listOfYears;

  private monthView: string = monthView;
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

  private setView(view: string) {
    this.$store.commit(changeViewMutation, view);
  }

  private changeWeek(differential: number) {
    this.$store.commit(changeWeekMutation, differential);
  }

  private showAppointment(): void {
    this.$store.commit(changeShowAppointmentMutation, true);
  }

  private logOut(): void {
    this.$store.commit(unsetCurrentUserMutation);
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
