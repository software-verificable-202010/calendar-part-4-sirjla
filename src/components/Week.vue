<template>
  <div class="week">
    <DaySchedule
      v-for="(date, index) in calendarDates"
      :key="index"
      :date="date"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import moment from "moment";
import DaySchedule from "@/components/DaySchedule.vue";

@Component({
  components: {
    DaySchedule
  }
})
export default class Week extends Vue {
  private get getSelectedWeek(): number {
    return this.$store.state.selectedWeek;
  }

  private get calendarDates(): moment.Moment[] {
    const baseMoment: moment.Moment = moment().set({
      isoWeek: this.getSelectedWeek
    });
    return [...Array(7).keys()].map(
      (dateNumber: number): moment.Moment =>
        baseMoment.clone().set({
          date: baseMoment.date() + dateNumber
        })
    );
  }
}
</script>

<style lang="scss" scoped>
.week {
  display: grid;
  background-color: $tertiary-color;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  column-gap: 0.5%;
  justify-items: center;
  align-items: center;
  grid-template-areas: "Monday Tuesday Wednesday Thursday Friday Saturday Sunday";
}
</style>
