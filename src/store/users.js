import axios from 'axios'

export default {
  namespaced: true,
  state: {
    users: [],
    loading: false,
  },
  actions: {
    getUsers: async ({commit}) => {
      try {
        commit('setLoading', true);
        const res = await axios
          .get('http://www.filltext.com/?rows=1000&id=%7Bindex%7D&fullname=%7BfirstName%7D~%7BlastName%7D&company=Bbusiness&email=%7Bemail%7D&uname=%7Busername%7D&address=%7BaddressObject%7D');
        commit('setUsers', res.data)
      } catch (e) {
        console.err(e)
      } finally {
        commit('setLoading', false)
      }
    }
  },
  mutations: {
    setUsers: (state, users) => state.users = users,
    setLoading: (state, status) => state.loading = status
  },
  getters: {
    users: state => state.users,
    loading: state => state.loading
  }
}
