<template>
  <div v-if="show" @click.self="closeHandler" class="modal-wrapper">
    <div class="modal">
      <div @click="closeHandler" class="modal--icon-close">
        &times;
      </div>
      <ul class="modal-list">
        <li :key="key" v-for="(value, key) in data">
          {{ `${key}: ${value}`}}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: "ModalWindow",
  computed: {
    ...mapGetters({show: 'modal/show', data: 'modal/data'})
  },
  methods: {
    ...mapMutations({setShow: 'modal/setShow'}),
    closeHandler() {
      this.setShow(false)
    }
  }
}
</script>

<style scoped lang="scss">
  .modal-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.2);
  }

  .modal {
    width: 300px;
    height: 300px;
    background: white;
    &-list {
      margin: 0 10px 10px 10px;
      padding-inline-start: 1em;
    }
    &--icon-close {
      margin-left: auto;
      font-size: 30px;
      width: 1em;
      cursor: pointer;
    }
    li {
      text-align: left;
    }
  }
</style>
