<template>
  <label class="appointment">{{ appointment.title }}</label>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { Appointment } from "@/types/Appointment";

@Component({})
export default class AppointmentView extends Vue {
  @Prop() private appointment!: Appointment;
}
</script>

<style lang="scss" scoped>
.appointment {
  background-color: $highlight-color;
  flex-grow: 1;
  margin-left: 1%;
  margin-right: 1%;
}
</style>
