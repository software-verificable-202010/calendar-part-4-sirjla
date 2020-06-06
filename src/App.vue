<template>
  <div id="app">
    <AppointmentManager v-if="showAppointment" @close="hideAppointment()" />
    <Calendar v-if="loggedIn" id="calendar" />
    <Menu v-if="loggedIn" id="menu" />
    <LogIn v-if="!loggedIn" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Calendar from "@/components/Calendar.vue";
import Menu from "@/components/Menu.vue";
import AppointmentManager from "@/components/AppointmentManager.vue";
import {
  changeShowAppointmentMutation,
  loadAppoinmentsMutation,
  loadUsersMutation
} from "@/store/MutationNames";
import storage from "electron-json-storage";
import { Appointment } from "@/types/Appointment";
import moment from "moment";
import { appointmentDB, userDB } from "@/common/constants";
import LogIn from "@/components/LogIn.vue";

@Component({
  components: {
    Calendar,
    Menu,
    AppointmentManager,
    LogIn
  }
})
export default class App extends Vue {
  private loadAppointments(): void {
    storage.get(appointmentDB, (error, data) => {
      if (error) throw error;
      if (data !== {}) {
        this.$store.commit(
          loadAppoinmentsMutation,
          JSON.parse(JSON.stringify(data))
            .filter(
              (appointment: Appointment) => appointment.owner != undefined
            )
            .map((appointment: Appointment) => {
              appointment.date = moment(appointment.date);
              return appointment;
            })
        );
      }
    });
  }

  private loadUsers(): void {
    storage.get(userDB, (error, data) => {
      if (error) throw error;
      if (data !== {}) {
        this.$store.commit(loadUsersMutation, JSON.parse(JSON.stringify(data)));
      }
    });
  }

  mounted() {
    this.loadAppointments();
    this.loadUsers();
  }

  private get loggedIn(): boolean {
    return this.$store.state.currentUser != undefined;
  }

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
