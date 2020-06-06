<template>
  <div class="login">
    <input type="text" v-model="username" placeholder="Username" />
    <button v-on:click="logIn()">Log In</button>
    <button v-on:click="createUser()">Create</button>
    <p>{{ message }}</p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import {
  insertUserMutation,
  setCurrentUserMutation
} from "../store/MutationNames";

@Component({})
export default class LogIn extends Vue {
  private username = "";
  private message = "";

  private get allUsers(): string[] {
    return this.$store.state.allUsers;
  }

  private createUser() {
    if (!this.$store.state.allUsers.includes(this.username)) {
      this.$store.commit(insertUserMutation, this.username);
    }
  }

  private logIn() {
    if (this.$store.state.allUsers.includes(this.username)) {
      this.$store.commit(setCurrentUserMutation, this.username);
    } else {
      this.message = "Create a user first.";
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  grid-area: calendar / calendar / menu / menu;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-content: center;
  justify-content: center;
}
</style>
