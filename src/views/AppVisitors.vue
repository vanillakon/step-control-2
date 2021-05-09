<template>
  <div class="visitors_header">
    <div class="header_title">
      <h6>ALL VISITORS:</h6>
      <a
        class="waves-effect waves-dark btn grey lighten-1 black-text"
        @click.prevent="addNewVisitor"
        >New visitor</a
      >
    </div>
    <hr />
    <div class="header_filters">
      <div class="filter_sorted">
        <p>Sort by:</p>
        <select class="browser-default" v-model="selected">
          <option value="id">ID</option>
          <option value="name">Name</option>
        </select>
        <a
          class="waves-effect waves-dark btn modal-trigger grey lighten-1 black-text"
          @click.prevent="sorted"
          >Sort</a
        >
      </div>
      <div class="filter_search">
        <p>Search:</p>
        <input
          type="text"
          id="inp_search"
          class="browser-default"
          v-model="search"
        />
        <a
          class="waves-effect waves-dark btn modal-trigger grey lighten-1 black-text"
          @click="searchedVisitor"
          >Search</a
        >
      </div>
    </div>
  </div>
  <teleport to="#modal">
    <the-modal
      v-if="modal"
      @close="modal = false"
      :title="titleModal"
    ></the-modal>
  </teleport>
  <div>
    <table v-if="visitors.length">
      <thead>
        <tr>
          <th>id</th>
          <th>Name</th>
          <th>Phone</th>
          <th>Edit</th>
        </tr>
      </thead>
      <tbody v-if="!search.length">
        <tr v-for="(visitor, i) in paginatedVisitors" :key="visitor.id">
          <td>{{ visitor.id }}</td>
          <td>{{ visitor.name }}</td>
          <td>{{ visitor.phone }}</td>
          <td>
            <i class="material-icons" @click="changeVisitor(visitor.id)"
              >create</i
            >
          </td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr v-for="(visitor, i) in searchedVisitor" :key="visitor.id">
          <td>{{ visitor.id }}</td>
          <td>{{ visitor.name }}</td>
          <td>{{ visitor.phone }}</td>
          <td>
            <i class="material-icons" @click="changeVisitor(visitor.id)"
              >create</i
            >
          </td>
        </tr>
      </tbody>
    </table>
    <p v-else>No visitors...</p>
  </div>
  <teleport to="#modal">
    <the-modal-visitors
      v-if="modal"
      @close="modal = false"
      :title="titleModal"
      :ind="ind"
    ></the-modal-visitors>
  </teleport>
  <app-pagination
    v-if="showPagination"
    :pages="pages"
    :pageNum="pageNum"
    pageIsUse="visitors"
    @pageClick="pageClick"
    @nextPage="this.pageNum++"
    @prevPage="this.pageNum--"
  ></app-pagination>
</template>
<script>
import TheVisitors from "../components/tables/TheVisitors";
import TheModalVisitors from "../components/TheModalVisitors";
import AppPagination from "../components/AppPagination";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      modal: false,
      titleModal: "",
      ind: null,
      pageNum: 1,
      visitorsPerPage: 8,
      selected: "id",
      search: "",
      isSearch: false,
    };
  },
  mounted() {
    this.getVisitorsFromBase();
  },
  computed: {
    visitors() {
      return this.$store.getters.getVisitors;
    },
    pages() {
      return this.$store.getters.getPagesVisitors;
    },
    paginatedVisitors() {
      let from = (this.pageNum - 1) * this.visitorsPerPage;
      let to = from + this.visitorsPerPage;
      return this.visitors.slice(from, to);
    },
    showPagination() {
      return this.paginatedVisitors.length;
    },
  },
  methods: {
    ...mapActions(["getVisitorsFromBase"]),
    addNewVisitor() {
      this.modal = true;
      this.titleModal = "Add new visitor:";
    },
    changeVisitor(num) {
      this.modal = true;
      this.titleModal = "Edit visitor:";
      this.ind = num;
    },
    pageClick(page) {
      this.pageNum = page;
    },
    sorted() {
      if (this.selected === "id") {
        this.visitors.sort((a, b) => a.id - b.id);
      } else {
        this.visitors.sort((a, b) =>
          a[this.selected].localeCompare(b[this.selected])
        );
      }
    },
    /*     searchedVisitor() {
      this.isSearch = true;
      const s = this.search.toLowerCase();
      this.visitors = this.visitors.filter((n) => {
        return Object.values(n).some((m) =>
          m
            .toString()
            .toLowerCase()
            .includes(s)
        );
      });
    }, */
  },
  components: {
    TheVisitors,
    TheModalVisitors,
    AppPagination,
  },
};
</script>
