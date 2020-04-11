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
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import moment from "moment";
import { selectMonthAction, selectYearAction } from "../store/ActionNames";

@Component
export default class Menu extends Vue {
  // Component properties
  monthNames: string[] = moment.months();
  listOfYears: number[] = [...Array(3000).keys()].reverse();

  // Store getters and setters
  private get selectedMonth(): number {
    return this.$store.state.selectedMonth;
  }
  private set selectedMonth(value: number) {
    this.$store.dispatch(selectMonthAction, value);
  }

  private get selectedYear(): number {
    return this.$store.state.selectedYear;
  }
  private set selectedYear(value: number) {
    this.$store.dispatch(selectYearAction, value);
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
