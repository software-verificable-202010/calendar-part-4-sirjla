<template>
  <div id="app">
    <Calendar id="calendar" />
    <Menu id="menu" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Calendar from "./components/Calendar.vue";
import Menu from "./components/Menu.vue";

@Component({
  components: {
    Calendar,
    Menu
  }
})
export default class App extends Vue {}
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
