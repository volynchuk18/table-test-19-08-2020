<template>
  <div v-if="data.length > 0" class="table-main-wrap">
    <div class="table-main-input-wrapper">
      <input v-model="searchData" placeholder="Search...">
      <button @click="searchHandler">
        Search
      </button>
    </div>
    <table
      class="table-main"
      :style="`grid-template-columns: repeat(${fields.length}, minmax(min-content, auto));`"
    >
      <col width="3">
      <col width="2">
      <col width="2">
      <col width="3">
      <thead>
      <td
        @click="sortHandler(key)"
        :key="key"
        v-for="key in fields"
      >
        {{ key }}
      </td>
      </thead>
      <tbody>
      <tr :key="item.id" v-for="item in paginatedData">
        <td
          @click="showData(item)"
          class="table-main-cell"
          :key="key + item.id"
          v-for="key in fields"
        >
          {{ item[key] }}
        </td>
      </tr>
      </tbody>
    </table>
    <div class="table-main-pagination">
      <button @click="goTo(currentPage - 1)" class="table-main-pagination__prev">
        Prev
        {{ pagesNumber }}
      </button>
      <span @click="goTo(1)" class="table-main-pagination__first-page">
        1
      </span>
      <span class="table-main-pagination__current-page">
        .. {{ currentPage }} ..
      </span>
      <span @click="goTo(pagesNumber)" class="table-main-pagination__last-page">
        {{ pagesNumber }}
      </span>
      <button @click="goTo(currentPage + 1)" class="table-main-pagination__next">
        Next
      </button>
    </div>
  </div>

</template>

<script>
import { mapMutations } from 'vuex';

export default {
  name: "TableMain",
  props: {
    data: Array,
    fields: Array,
    perPage: Number
  },
  data() {
    return {
      filteredData: null,
      currentPage: 1,
      searchData: null
    }
  },
  created() {
    this.filteredData = this.data
  },
  computed: {
    pagesNumber() {
      return Math.ceil(this.filteredData.length / this.perPage)
    },
    paginatedData(){
      const start = (this.currentPage - 1) * this.perPage;
      const end = start + this.perPage;
      return this.filteredData.slice(start, end);
    }
  },
  methods: {
    ...mapMutations({setModalShow: 'modal/setShow', setModalData: 'modal/setData'}),
    goTo(page) {
      if (page > 0 && page < this.pagesNumber + 1)
      this.currentPage = page
    },
    searchHandler() {
      if (!this.searchData) {
        this.filteredData = this.data;
        return
      }
      this.currentPage = 1;
      this.filteredData = this.data.filter(user => {
        let isMatched = false;
        Object.entries(user).forEach(data => {
          if (this.fields.indexOf(data[0]) !== -1) {
            isMatched = (data[1] + '').indexOf(this.searchData.trim()) !== -1 || isMatched
          }
        });
        return isMatched
      })
    },
    sortHandler(key) {
      this.filteredData.sort((a, b) => a[key] < b[key] ? -1 : 1)
    },
    showData(item) {
      this.setModalShow(true);
      this.setModalData({name: item.fullname, ...item.address})
    }
  }
}
</script>

<style lang="scss" scoped>
  .table-main {
    width: 100%;
    border-collapse: collapse;
    table-layout: fixed;
    &-wrap {
      margin: 0 auto;
      width: 600px;
    }
    &-input-wrapper {
      display: flex;
      justify-content: flex-end;
      margin-bottom: 5px;
      & > input {
        margin-right: 5px;
      }
    }
    tr:hover {
      cursor: pointer;
      background: #d0d0d0;
    }
    td {
      max-width: 25%;
      padding: 5px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      border: 1px solid black;
    }
    &-pagination {
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 20px 0 20px 0;
      & > span {
        font-size: 1.2em;
        margin: 0 5px 0 5px;
      }
      &__current-page {
        width: 4em;
      }
      &__first-page, &__last-page {
        cursor: pointer;
        &:hover {
          text-decoration: underline;
        }
      }
      &__prev, &__next {
        border: 1px solid blue;
        padding: 10px;
        cursor: pointer;
        &:hover {
          color: white;
          background: #00c8ff;
          border-color: #00c8ff;
        }
      }
    }
  }
</style>
