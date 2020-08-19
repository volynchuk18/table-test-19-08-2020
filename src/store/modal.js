export default {
  namespaced: true,
  state: {
    show: false,
    data: []
  },
  mutations: {
    setShow: (state, show) => state.show = show,
    setData: (state, data) => state.data = data
  },
  getters: {
    show: state => state.show,
    data: state => state.data
  }
}
