<template>
  <div class="back">
    <div
      class="goToBooks tooltipped"
      data-position="right"
      data-tooltip="Go to page of books"
      ref="tooltip"
    >
      <i class="small material-icons" @click="goToBooks">arrow_back</i>
    </div>
  </div>
  <div class="book">
    <form @submit.prevent="submitHandler">
      <div class="row">
        <div class="input-field col s6">
          <input :placeholder="book.title" type="text" disabled />
        </div>
        <div class="input-field col s6">
          <input id="title" type="text" class="validate" v-model="newTitle" />
          <label for="title">Title</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s6">
          <input :placeholder="book.author" type="text" disabled />
        </div>
        <div class="input-field col s6">
          <input id="author" type="text" class="validate" v-model="newAuthor" />
          <label for="author">Author</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s6">
          <input :placeholder="book.year" type="text" disabled />
        </div>
        <div class="input-field col s6">
          <input id="year" type="text" class="validate" v-model="newYear" />
          <label for="year">Year</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s6">
          <input :placeholder="book.publisher" type="text" disabled />
        </div>
        <div class="input-field col s6">
          <input
            id="publisher"
            type="text"
            class="validate"
            v-model="newPublisher"
          />
          <label for="publisher">Publisher</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s6">
          <input :placeholder="book.pages" type="text" disabled />
        </div>
        <div class="input-field col s6">
          <input id="pages" type="text" class="validate" v-model="newPages" />
          <label for="pages">Pages</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s6">
          <input :placeholder="book.quantity" type="text" disabled />
        </div>
        <div class="input-field col s6">
          <input
            id="quantity"
            type="text"
            class="validate"
            v-model="newQuantity"
          />
          <label for="quantity">Quantity</label>
        </div>
      </div>
      <button
        class="btn btn-small waves-effect waves-dark grey lighten-1 black-text"
        type="submit"
      >
        Update
      </button>
      <button
        class="btn btn-small waves-effect waves-dark grey lighten-1 black-text"
        type="button"
        @click="removeThisBooks"
      >
        Delete
      </button>
    </form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      newTitle: "",
      newAuthor: "",
      newYear: null,
      newPublisher: "",
      newPages: null,
      newQuantity: null,
      tooltip: null,
    };
  },
  methods: {
    goToBooks() {
      this.$router.push("/books");
      this.tooltip.destroy();
      console.log(this.book);
    },
    removeThisBooks() {
      this.$router.push("/books");
      this.$store.dispatch("removeBook", this.book.idByBase);
      this.$store.commit("removeBookNow", this.book.id);
    },
  },
  computed: {
    book() {
      return this.$store.getters.bookById(+this.$route.params.id);
    },
  },
  mounted() {
    this.tooltip = M.Tooltip.init(this.$refs.tooltip);
  },
};
</script>
