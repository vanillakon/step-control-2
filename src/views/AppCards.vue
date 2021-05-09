<template>
  <div class="cards_header">
    <div class="header_title">
      <h6>ALL CARDS:</h6>
      <a
        class="waves-effect waves-dark btn grey lighten-1 black-text"
        @click.prevent="showModal"
        >New card</a
      >
    </div>
    <hr />
    <div class="header_filters" v-if="cards.length">
      <div class="filter_sorted">
        <p>Sort by:</p>
        <select class="browser-default" v-model="selected">
          <option value="return">Return date</option>
        </select>
        <a
          class="waves-effect waves-dark btn grey lighten-1 black-text"
          @click.prevent="sorted"
          >Sort</a
        >
      </div>
      <div class="filter_search">
        <p>Search:</p>
        <input type="text" id="inp_search" class="browser-default" />
        <a class="waves-effect waves-dark btn grey lighten-1 black-text"
          >Search</a
        >
      </div>
    </div>
  </div>
  <div>
    <table v-if="cards.length">
      <thead>
        <tr>
          <th>id</th>
          <th>Visitor</th>
          <th>Book</th>
          <th>Borrow Date</th>
          <th>Return Date</th>
        </tr>
      </thead>
      <tbody v-if="!search.length">
        <tr v-for="(card, i) in paginatedCards" :key="card.id">
          <td>{{ card.id }}</td>
          <td>{{ card.visitor }}</td>
          <td>{{ card.book }}</td>
          <td>{{ card.borrow }}</td>
          <td v-if="!card.return">
            <i class="material-icons" @click="returnBook(card.idByBase)"
              >reply</i
            >
          </td>
          <td v-else>{{ card.return }}</td>
        </tr>
      </tbody>
      <!--       <tbody v-else>
        <tr v-for="(card, i) in searchedCards" :key="card.id">
          <td>{{ card.id }}</td>
          <td>{{ card.visitor }}</td>
          <td>{{ card.book }}</td>
          <td>{{ card.borrow }}</td>
          <td>
            <i class="material-icons" @click="changeCard(card.id)">reply</i>
          </td>
        </tr>
      </tbody> -->
    </table>
    <p v-else>No cards...</p>
  </div>
  <teleport to="#modal">
    <the-modal-cards
      v-if="modal"
      @close="modal = false"
      :title="titleModal"
      :ind="ind"
    ></the-modal-cards>
  </teleport>
  <app-pagination
    :pages="pages"
    :pageNum="pageNum"
    pageIsUse="visitors"
    @pageClick="pageClick"
    @nextPage="this.pageNum++"
    @prevPage="this.pageNum--"
  ></app-pagination>
</template>
<script>
import AppPagination from "../components/AppPagination";
import TheModalCards from "../components/TheModalCards";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      modal: false,
      selected: "return",
      ind: null,
      pageNum: 1,
      cardsPerPage: 8,
      search: "",
    };
  },
  mounted() {
    this.getVisitorsFromBase();
    this.getBookFromBase();
    this.getCardsFromBase();
    /*     this.datepicker = M.Datepicker.init(this.$refs.datepicker, {
      format: "dd.mm.yyyy",
    }); */
  },
  computed: {
    cards() {
      return this.$store.getters.getCards;
    },
    pages() {
      return this.$store.getters.getPagesCards;
    },
    paginatedCards() {
      let from = (this.pageNum - 1) * this.cardsPerPage;
      let to = from + this.cardsPerPage;
      return this.cards.slice(from, to);
    },
    showPagination() {
      return this.paginatedCards.length;
    },
  },
  methods: {
    ...mapActions([
      "getVisitorsFromBase",
      "getBookFromBase",
      "getCardsFromBase",
    ]),
    returnBook(id) {
      this.$store.dispatch("returnBook", id);
      this.$store.commit("setReturnBookDate", id);
      this.getCardsFromBase;
      console.log(this.cards);
    },
    sorted() {},
    showModal() {
      this.modal = true;
    },
  },
  components: {
    AppPagination,
    TheModalCards,
  },
};
</script>
