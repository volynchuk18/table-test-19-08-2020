<template>
  <div id="app">
    <button v-if="users.length === 0" @click="getUsers">
      Get Users
    </button>
    <h4 v-if="loading">
      Loading...
    </h4>
    <TableMain
      v-if="users.length > 0"
      :data="users"
      :fields="fields"
      :per-page="10"
    />
    <ModalWindow />
  </div>
</template>

<script>
  import {mapActions, mapGetters, mapMutations} from 'vuex';
import TableMain from "./components/TableMain";
import ModalWindow from "./components/ModalWindow";

export default {
  name: 'App',
  components: {ModalWindow, TableMain},
  data() {
    return {
      fields: ['fullname', 'uname', 'company', 'email']
    }
  },
  methods: {
    ...mapMutations({setModalShow: 'modal/setShow'}),
    ...mapActions({getUsers: 'users/getUsers'}),
    keyUpHandler(evt) {
      if ((evt.keyCode === 27 || evt.key === 'Escape')) {
        this.setModalShow(false)
      }
    }
  },
  computed: {
    ...mapGetters({users: 'users/users', loading: 'users/loading'})
  },
  created() {
    document.addEventListener('keyup', this.keyUpHandler);
  },
  beforeDestroy() {
    document.removeEventListener('keyup', this.keyUpHandler)
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

body {
  margin: 0;
}
</style>
