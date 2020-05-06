<template>
  <div :class="calendarClass">
    <div class="calendar-header">
      <div
        v-for="(weekdayColumn, index) in weekdayHeaderData"
        :key="index"
        :class="weekdayColumn.headerClassName"
      >
        {{ weekdayColumn.displayName }}
      </div>
    </div>
    <Month v-if="showView(monthView)" class="calendar-display" />
    <Week v-if="showView(weekView)" class="calendar-display" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import moment from "moment";
import { HeaderData } from "@/types/Calendar";
import Month from "@/components/Month.vue";
import Week from "@/components/Week.vue";
import { monthView, weekView, emptyString } from "@/common/constants.ts";

@Component({
  components: {
    Month,
    Week
  }
})
export default class Calendar extends Vue {
  private monthView: string = monthView;
  private weekView: string = weekView;
  private baseClass = "calendar";
  private weekClass = "calendar-week";

  private get calendarClass(): string[] {
    return [
      this.baseClass,
      this.$store.state.currentView === this.weekView
        ? this.weekClass
        : emptyString
    ];
  }

  private showView(view: string): boolean {
    return this.$store.state.currentView === view;
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
  grid-template-rows: 1fr 24fr;
  column-gap: 1%;
  justify-items: center;
  align-items: center;
  border-color: $tertiary-color;
  border-width: 1%;
  border-style: solid;
  grid-template-areas:
    "header header header header header header header"
    "data data data data data data data";
  &-week {
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
    grid-template-areas:
      ". header header header header header header header"
      "data data data data data data data data";
  }
}
.calendar-display {
  grid-area: data;
  width: 100%;
  height: 100%;
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
