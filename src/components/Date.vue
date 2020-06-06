<template>
  <div :class="dateClass">
    {{ dateNumber }}
    <li
      class="appointment"
      v-for="(appointment, index) in appointments"
      :key="index"
    >
      {{ appointment.title }}
    </li>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import moment from "moment";
import { Appointment } from "@/types/Appointment";
import {
  emptyString,
  startingNumber,
  dateComparisonGranularity,
  momentJsWeekdayNameFormatter
} from "@/common/constants";

const weekendClass = "date-weekend";
const currentDateClass = "date-current";
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
      `date-${this.transformIsoWeekNumberToOrder()}${this.weekDayName}`,
      this.isWeekend ? weekendClass : emptyString,
      this.isCurrentDate ? currentDateClass : emptyString
    ];
  }

  private get appointments(): Appointment[] {
    return this.$store.getters.getDateAppointments(this.date);
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
  private transformIsoWeekNumberToOrder(): string {
    let isoWeekdayNumberDifference: number;
    isoWeekdayNumberDifference = this.date.isoWeek() - this.startingWeekNumber;
    if (isoWeekdayNumberDifference < startingNumber) {
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
.appointment {
  font-size: 0.6em;
}
</style>
