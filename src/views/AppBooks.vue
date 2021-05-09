<template>
  <div class="cards_header">
    <div class="header_title">
      <h6>ALL BOOKS:</h6>
      <a
        class="waves-effect waves-dark btn grey lighten-1 black-text"
        @click.prevent="openFormByNewBook"
        >New book</a
      >
    </div>
    <hr />
    <div class="header_filters" v-if="books.length">
      <div class="filter_sorted">
        <p>Sort by:</p>
        <select class="browser-default" v-model="selected">
          <option value="id">Id</option>
          <option value="title">Title</option>
          <option value="author">Author</option>
          <option value="quantity">Quantity</option>
        </select>
        <a
          class="waves-effect waves-dark btn grey lighten-1 black-text"
          @click.prevent="sorted"
          >Sort</a
        >
      </div>
      <div class="filter_search">
        <p>Search:</p>
        <input
          type="text"
          id="inp_search"
          class="browser-default inp_without_m"
          v-model="search"
        />
      </div>
    </div>
  </div>
  <div>
    <table v-if="books.length">
      <thead>
        <tr>
          <th>id</th>
          <th>Title</th>
          <th>Author</th>
          <th>Year</th>
          <th>Publisher</th>
          <th>Pages</th>
          <th>Quantity</th>
          <th>More</th>
        </tr>
      </thead>
      <tbody v-if="!search.length">
        <tr v-for="(book, ind) in paginatedBooks" :key="book.id">
          <td>{{ book.id }}</td>
          <td>{{ book.title }}</td>
          <td>{{ book.author }}</td>
          <td>{{ book.year }}</td>
          <td class="td_with_slice">
            <div class="publisher_text">{{ book.publisher }}</div>
          </td>
          <td>{{ book.pages }}</td>
          <td>{{ book.quantity }}</td>
          <td>
            <router-link
              :to="'/book/' + book.id"
              tag="button"
              class="btn btn-small waves-effect waves-dark grey lighten-1 black-text"
              >Open</router-link
            >
          </td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr v-for="(book, ind) in searchedBook" :key="book.id">
          <td>{{ book.id }}</td>
          <td>{{ book.title }}</td>
          <td>{{ book.author }}</td>
          <td>{{ book.year }}</td>
          <td class="td_with_slice">
            <div class="publisher_text">{{ book.publisher }}</div>
          </td>
          <td>{{ book.pages }}</td>
          <td>{{ book.quantity }}</td>
          <td>
            <router-link
              :to="'/book/' + book.id"
              tag="button"
              class="btn btn-small waves-effect waves-dark grey lighten-1 black-text"
              >Open</router-link
            >
          </td>
        </tr>
      </tbody>
    </table>
    <p v-else>No books...</p>
  </div>
  <app-pagination
    v-if="showPagination"
    :pages="pages"
    :pageNum="pageNum"
    @pageClick="pageClick"
    @nextPage="this.pageNum++"
    @prevPage="this.pageNum--"
  ></app-pagination>
  <teleport to="#modal">
    <the-modal-books
      v-if="modal"
      @close="modal = false"
      title="Add new book"
      :ind="ind"
    ></the-modal-books>
  </teleport>
</template>
<script>
import TheBooks from "../components/tables/TheBooks";
import AppPagination from "../components/AppPagination";
import TheModalBooks from "../components/TheModalBooks";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      booksPerPage: 8,
      pageNum: 1,
      selected: "id",
      search: "",
      modal: false,
    };
  },
  mounted() {
    this.getBookFromBase();
  },
  computed: {
    books() {
      return this.$store.getters.getBooks;
    },
    pages() {
      if (this.search.length) {
        return Math.ceil(this.searchedBook.length / this.booksPerPage);
      } else {
        return this.$store.getters.getPagesBooks;
      }
    },
    paginatedBooks() {
      let from = (this.pageNum - 1) * this.booksPerPage;
      let to = from + this.booksPerPage;
      if (this.search.length) {
        return this.searchedBook.slice(from, to);
      } else {
        return this.books.slice(from, to);
      }
    },
    searchedBook() {
      const s = this.search.toLowerCase();
      return this.books.filter((n) => {
        return Object.values(n).some((m) =>
          m
            .toString()
            .toLowerCase()
            .includes(s)
        );
      });
    },
    showPagination() {
      return this.paginatedBooks.length || this.searchedBook.length;
    },
  },
  methods: {
    ...mapActions(["getBookFromBase"]),
    pageClick(page) {
      this.pageNum = page;
    },
    show() {
      console.log(this.$store.getters.getBooksAfterRemove);
    },
    sorted() {
      if (this.selected === "quantity") {
        this.books.sort((a, b) => b.quantity - a.quantity);
      } else if (this.selected === "id") {
        this.books.sort((a, b) => a.id - b.id);
      } else {
        this.books.sort((a, b) =>
          a[this.selected].localeCompare(b[this.selected])
        );
      }
    },
    openFormByNewBook() {
      this.modal = !this.modal;
    },
  },
  components: {
    TheBooks,
    AppPagination,
    TheModalBooks,
  },
};
</script>
