import Vue from 'vue'
import Vuex from 'vuex'
import users from './users'
import modal from './modal'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    users,
    modal
  },
})
