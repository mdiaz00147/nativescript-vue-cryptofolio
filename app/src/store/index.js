import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentUser: {},
    authToken: ""
  },
  mutations: {
    setCurrentUser(state, user) {
      state.currentUser = user
    },

    setAuthToken(state, token) {
      state.authToken = token
    }
  },
  getters: {
    currentUser: state => state.currentUser,
    authToken: state => state.authToken
  }
});
