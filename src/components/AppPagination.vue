<template>
  <ul class="pagination" v-if="pages > 1">
    <li :class="{ disabledBtn: pageNum === 1 }" @click="$emit('prevPage')">
      <i class="material-icons">chevron_left</i>
    </li>
    <li
      class="waves-effect"
      v-for="page in pages"
      :key="page"
      @click="$emit('pageClick', page)"
      :class="{ active: pageNum == page }"
    >
      {{ page }}
    </li>
    <li
      class="waves-effect"
      @click="$emit('nextPage')"
      :class="{ disabledBtn: pageNum == isPage }"
    >
      <i class="material-icons">chevron_right</i>
    </li>
  </ul>
</template>
<script>
export default {
  emits: ["pageClick", "nextPage", "prevPage"],
  props: {
    pageNum: Number,
    pages: Number,
    pageIsUse: {
      type: String,
      default: false,
      validator(value) {
        ["books", "visitors", "cards"].includes(value);
      },
    },
  },
  computed: {
    isPage() {
      return this.pageIsUse === "books"
        ? this.$store.getters.getPagesBooks
        : this.pageIsUse === "visitors"
        ? this.$store.getters.getPagesVisitors
        : this.$store.getters.getPagesCards;
    },
  },
};
</script>
