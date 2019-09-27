import Vue from "vue";
import Vuex from "vuex";
import state from './state.js';
import * as getters from './getters.js';
import mutations from './mutations.js';
Vue.use(Vuex);
let store = new Vuex.Store({
  state:state,
  getters:getters,
  mutations:mutations
})
export default store;