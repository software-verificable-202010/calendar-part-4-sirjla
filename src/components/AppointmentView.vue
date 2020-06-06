<template>
  <label @click="editAppointment(appointment)" class="appointment">{{
    appointment.title
  }}</label>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { Appointment } from "@/types/Appointment";
import {
  setAppointmentToEditMutation,
  changeShowAppointmentMutation
} from "../store/MutationNames";

@Component({})
export default class AppointmentView extends Vue {
  @Prop() private appointment!: Appointment;

  private editAppointment(appointment: Appointment) {
    this.$store.commit(setAppointmentToEditMutation, appointment);
    if (appointment.owner === this.$store.state.currentUser) {
      this.$store.commit(changeShowAppointmentMutation, true);
    }
  }
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
