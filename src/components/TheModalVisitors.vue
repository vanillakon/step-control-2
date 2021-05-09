<template>
  <div class="modal-backdrop" @click="$emit('close')"></div>
  <div class="modalDiv">
    <div class="iconContainer">
      <i class="small material-icons" @click="$emit('close')">close</i>
    </div>
    <h5>{{ title }}</h5>
    <form class="col s12">
      <div class="col s12">
        <div class="row">
          <div class="input-field col s12">
            <input id="name" type="text" class="validate" v-model="name" />
            <label for="name">Full Name:</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input id="phone" type="text" class="validate" v-model="phone" />
            <label for="phone">Phone Number:</label>
          </div>
        </div>
      </div>
      <a
        v-if="showTitle === 'add'"
        class="waves-effect waves-dark btn grey lighten-1 black-text"
        @click="addVisitor"
        >Save</a
      >
      <a
        v-if="showTitle === 'edit'"
        class="waves-effect waves-dark btn grey lighten-1 black-text"
        @click="changeVisitor"
        >Save</a
      >
    </form>
  </div>
</template>

<script>
export default {
  emits: ["close", "changeVisitor"],
  props: {
    title: String,
    ind: Number,
  },
  data() {
    return {
      name: "",
      phone: "",
    };
  },
  methods: {
    addVisitor() {
      let validId;
      if (!this.$store.getters.getVisitors.length) {
        validId = this.$store.getters.getVisitors.length + 1;
      } else {
        validId = this.$store.getters.getLastVisitorsInd + 1;
      }
      if (this.validatorName && this.validatorPhone) {
        this.$store.commit("addVisitor", {
          id: validId,
          name: this.name,
          phone: this.phone,
        });
        this.$store.dispatch("addVisitor", {
          id: this.$store.getters.getLastVisitorsInd,
          name: this.name,
          phone: this.phone,
        });
        this.$emit("close");
      }
    },
    changeVisitor() {
      this.$store.commit("changeVisitor", {
        ind: this.ind,
        name: this.name,
        phone: this.phone,
      });
      this.$emit("close");
    },
  },
  computed: {
    showTitle() {
      return this.title.split(" ")[0].toLowerCase();
    },
    getInd() {
      return this.$store.getters.getInd;
    },
    validatorName() {
      return /^(([A-Za-z]+[\-\']?)*([A-Za-z]+)?\s)+([A-Za-z]+[\-\']?)*([A-Za-z]+)?$/.test(
        this.name
      );
    },
    validatorPhone() {
      return /^\d{3}\s?-?\d{3}\s?-?\d{2}\s?-?\d{2}$/.test(this.phone);
    },
  },
};
</script>
