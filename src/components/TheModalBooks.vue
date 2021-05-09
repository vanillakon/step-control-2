<template>
  <div class="modal-backdrop" @click="$emit('close')"></div>
  <div class="modalDiv modalBooks">
    <div class="iconContainer">
      <i class="small material-icons" @click="$emit('close')">close</i>
    </div>
    <h5>Add new book</h5>
    <form class="col s12">
      <div class="col s12">
        <div class="row">
          <div class="input-field col s12">
            <input
              id="title"
              type="text"
              class="validate"
              v-model="title"
              required
            />
            <label for="title">Title:</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input
              type="text"
              class="validate"
              v-model="author"
              id="author"
              required
            />
            <label for="author">Author:</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input
              type="text"
              class="validate"
              v-model="year"
              id="year"
              required
            />
            <label for="author">Year:</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input
              type="text"
              class="validate"
              v-model="publisher"
              id="publisher"
              required
            />
            <label for="publisher">Publisher:</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input
              type="text"
              class="validate"
              v-model="pages"
              id="pages"
              required
            />
            <label for="pages">Pages:</label>
          </div>
        </div>

        <div class="row">
          <div class="input-field col s12">
            <input
              type="text"
              class="validate"
              v-model="quantity"
              id="quantity"
              required
            />
            <label for="quantity">Quantity:</label>
          </div>
        </div>
      </div>
      <a
        class="waves-effect waves-dark btn grey lighten-1 black-text"
        @click.prevent="addNewBook"
        >Add</a
      >
    </form>
  </div>
</template>
<script>
export default {
  emits: ["close"],
  data() {
    return {
      title: "",
      author: "",
      year: null,
      publisher: "",
      pages: null,
      quantity: null,
    };
  },
  methods: {
    addNewBook() {
      console.log(
        this.validatorTitle,
        this.validatorAuthor,
        this.validatorYear,
        this.validatorPublisher,
        this.validatorPages,
        this.validatorQuantity
      );
      let validId;
      if (!this.$store.getters.getBooks.length) {
        validId = this.$store.getters.getBooks.length + 1;
      } else {
        validId = this.$store.getters.getLastBooksInd + 1;
      }
      if (this.checkedValidation) {
        this.$store.commit("addBook", {
          id: validId,
          title: this.title,
          author: this.author,
          year: this.year,
          publisher: this.publisher,
          pages: this.pages,
          quantity: this.quantity,
        });
        this.$store.dispatch("addBook", {
          id: this.$store.getters.getLastBooksInd,
          title: this.title,
          author: this.author,
          year: this.year,
          publisher: this.publisher,
          pages: this.pages,
          quantity: this.quantity,
        });
        this.$emit("close");
      } else {
        console.log("Input in from is not validation!");
      }
    },
  },
  computed: {
    validatorTitle() {
      /* return /^[A-Z]?[a-z]+\s?$/.test(this.title); */
      return this.title.length !== 0;
    },
    validatorAuthor() {
      return /^(([A-Za-z]+[\-\']?)*([A-Za-z]+)?\s)+([A-Za-z]+[\-\']?)*([A-Za-z]+)?$/.test(
        this.author
      );
    },
    validatorYear() {
      if (this.year == null) {
        return false;
      } else if (+this.year <= 0 && +this.year > new Date().getFullYear()) {
        return false;
      } else {
        return true;
      }
    },
    validatorPublisher() {
      return this.publisher.trim().length ? true : false;
    },
    validatorPages() {
      return /^\d+$/.test(this.pages);
    },
    validatorQuantity() {
      return /^\d+$/.test(this.quantity);
    },
    checkedValidation() {
      return [
        this.validatorTitle,
        this.validatorAuthor,
        this.validatorYear,
        this.validatorPublisher,
        this.validatorPages,
        this.validatorQuantity,
      ].every((elem) => elem);
    },
  },
};
</script>
