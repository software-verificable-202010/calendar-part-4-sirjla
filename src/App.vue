<template>
  <div id="app">
    <AppointmentManager v-if="showAppointment" @close="hideAppointment()" />
    <Calendar id="calendar" />
    <Menu id="menu" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Calendar from "@/components/Calendar.vue";
import Menu from "@/components/Menu.vue";
import AppointmentManager from "@/components/AppointmentManager.vue";
import { changeShowAppointmentMutation } from "@/store/MutationNames";

@Component({
  components: {
    Calendar,
    Menu,
    AppointmentManager
  }
})
export default class App extends Vue {
  private get showAppointment(): boolean {
    return this.$store.state.showAppointment;
  }

  private hideAppointment(): void {
    this.$store.commit(changeShowAppointmentMutation, false);
  }
}
</script>

<style lang="scss" scoped>
#app {
  width: 100%;
  height: 95vh;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $font-color;
  display: grid;
  grid-template-columns: 4fr 1fr;
  column-gap: 1%;
  grid-template-areas: "calendar menu";
}
#calendar {
  grid-area: calendar;
  width: 100%;
  height: 100%;
}
#menu {
  grid-area: menu;
  width: 90%;
  height: 100%;
}
</style>
