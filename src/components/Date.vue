<template>
  <div :class="dateClass">
    <svg viewBox="0 0 50 50" class="date-number">
      <text :x="dateTextHorizontalAlignment" y="30">{{ dateNumber }}</text>
    </svg>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import moment from "moment";

const emptyClass = "";
const weekendClass = "date-weekend";
const baseAlignment = 15.5;
const singleDigitAlignmentOffset = 5;
const singleDigitMaxNumber = 9;
const dateComparisonGranularity = "day";
const currentDateClass = "date-current";
const momentJsWeekdayNameFormatter = "dddd";
const weekdayOrders = ["first", "second", "third", "fourth", "fifth", "sixth"];

@Component
export default class Date extends Vue {
  // Component inherited properties
  @Prop() private date!: moment.Moment;

  // Component computed properties
  private get dateNumber(): number {
    return this.date.date();
  }
  private get isoWeekDay(): number {
    return this.date.isoWeekday();
  }
  private get dateClass(): string[] {
    return [
      `date-${this.isoWeekNumberToOrder()}${this.weekDayName}`,
      this.isWeekend ? weekendClass : emptyClass,
      this.isCurrentDate ? currentDateClass : emptyClass
    ];
  }
  private get dateTextHorizontalAlignment(): number {
    if (this.dateNumber <= singleDigitMaxNumber) {
      return baseAlignment + singleDigitAlignmentOffset;
    }
    return baseAlignment;
  }

  private get startingWeekNumber(): number {
    return this.$store.getters.selecteddMonthStartingWeekNumber;
  }
  private get isWeekend(): boolean {
    const isoWeekendDays: number[] = [6, 7];
    return isoWeekendDays.includes(this.date.isoWeekday());
  }
  private get weekDayName(): string {
    return this.date.format(momentJsWeekdayNameFormatter);
  }
  private isoWeekNumberToOrder(): string {
    let isoWeekdayNumberDifference: number;
    // Fix this magic number
    isoWeekdayNumberDifference = this.date.isoWeek() - this.startingWeekNumber;
    if (isoWeekdayNumberDifference < 0) {
      isoWeekdayNumberDifference =
        isoWeekdayNumberDifference + this.date.isoWeeksInYear();
    }
    if (weekdayOrders.length > isoWeekdayNumberDifference) {
      return weekdayOrders[isoWeekdayNumberDifference];
    }
    throw `Iso week number difference: (${isoWeekdayNumberDifference}) is not valid`;
  }
  private get isCurrentDate(): boolean {
    return this.date.isSame(
      this.$store.state.currentDate,
      dateComparisonGranularity
    );
  }
}
</script>

<style lang="scss" scoped>
%date-base {
  background-color: $primary-color;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  justify-items: center;
}
.date {
  @each $day in $days {
    @each $priority in $calendar-priorities {
      &-#{$priority}#{$day} {
        @extend %date-base;
        grid-area: #{$priority}#{$day};
      }
    }
  }
  &-weekend {
    background-color: $secondary-color;
  }
  &-number {
    width: 100%;
  }
  &-current {
    border-color: $tertiary-color;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    border-width: 1%;
    border-style: solid;
    fill: $highlight-color;
  }
}
</style>
