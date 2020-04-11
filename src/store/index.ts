import Vue from "vue";
import Vuex, { StoreOptions } from "vuex";
import { RootState } from "@/types/store";
import { mutations } from "./mutations";
import { getters } from "./getters";
import { state } from "./state";

Vue.use(Vuex);

const store: StoreOptions<RootState> = {
  state,
  mutations,
  actions: {},
  modules: {},
  getters
};

export default new Vuex.Store<RootState>(store);
