<template>
  <div class="modal-backdrop" @click="$emit('close')"></div>
  <div class="modalDiv">
    <div class="iconContainer">
      <i class="small material-icons" @click="$emit('close')">close</i>
    </div>
    <h5>Add new card</h5>
    <form class="col s12">
      <div class="col s12">
        <div class="row">
          <div class="input-field col s12">
            <div class="input-field col s12">
              <select ref="select" v-model="select">
                <option
                  v-for="(visitor, ind) in visitors"
                  :value="visitor.name"
                  >{{ visitor.name }}</option
                >
              </select>
              <label>Visitor:</label>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <div class="input-field col s12">
              <select ref="select2" v-model="select2">
                <option v-for="(book, ind) in books" :value="book.title">{{
                  book.title
                }}</option>
              </select>
              <label>Book:</label>
            </div>
          </div>
        </div>
      </div>
      <a
        class="waves-effect waves-dark btn grey lighten-1 black-text"
        @click="addCards"
        >Save</a
      >
    </form>
  </div>
</template>
<script>
export default {
  emits: ["close"],
  data() {
    return {
      select: "",
      select2: "",
    };
  },
  mounted() {
    this.select = M.FormSelect.init(this.$refs.select);
    this.select2 = M.FormSelect.init(this.$refs.select2);
  },
  computed: {
    books() {
      return this.$store.getters.getBooksWithQuantity;
    },
    visitors() {
      return this.$store.getters.getVisitors.sort((a, b) => a.name - b.name);
    },
  },
  methods: {
    addCards() {
      let validId;
      if (!this.$store.getters.getCards.length) {
        validId = this.$store.getters.getCards.length + 1;
      } else {
        validId = this.$store.getters.getLastCardsInd + 1;
      }
      this.$store.commit("addCard", {
        id: validId,
        visitor: this.select,
        book: this.select2,
        borrow: new Date().toLocaleDateString(),
        return: "",
      });
      this.$store.dispatch("addCard", {
        id: this.$store.getters.getLastCardsInd,
        visitor: this.select,
        book: this.select2,
        borrow: new Date().toLocaleDateString(),
        return: "",
      });

      this.$emit("close");
    },
  },
};
</script>
