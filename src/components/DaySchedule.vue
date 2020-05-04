<template>
  <div :class="`day-column-${weekDayName(date)}`">
    <div class="date-number">{{ date.date() }}</div>
    <div class="date-hours">
      <div
        v-for="(hour, index) in Array(24).keys()"
        :key="index"
        :class="`hour-${hour}`"
      ></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import moment from "moment";

const momentJsWeekdayNameFormatter = "dddd";

@Component({})
export default class DaySchedule extends Vue {
  @Prop() private date!: moment.Moment;

  private weekDayName(date: moment.Moment): string {
    return date.format(momentJsWeekdayNameFormatter);
  }
}
</script>

<style lang="scss" scoped>
%column-base {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: 1fr 24fr;
  justify-items: center;
  align-items: center;
  row-gap: 0.5%;
  grid-template-areas: "number" "hours";
}
.day-column {
  @each $day in $days {
    &-#{$day} {
      @extend %column-base;
      grid-area: #{$day};
    }
  }
}
.date-number {
  background-color: $primary-color;
  grid-area: number;
  height: 100%;
  width: 100%;
}
.date-hours {
  grid-area: hours;
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-rows: auto;
  row-gap: 0.5%;
  grid-template-areas: "hour-0" "hour-1" "hour-2" "hour-3" "hour-4" "hour-5" "hour-6" "hour-7" "hour-8" "hour-9" "hour-10" "hour-11" "hour-12" "hour-13" "hour-14" "hour-15" "hour-16" "hour-17" "hour-18" "hour-19" "hour-20" "hour-21" "hour-22" "hour-23";
}
@for $i from 0 through 23 {
  .hour-#{$i} {
    background-color: $background-color;
    grid-area: hour-#{$i};
  }
}
</style>
