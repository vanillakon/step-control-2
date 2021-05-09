<template>
  <h4 class="logo">
    <router-link to="/books">LIBRARY</router-link>
  </h4>
  <the-navbar></the-navbar>
  <div class="container">
    <router-view></router-view>
  </div>
</template>
<script>
import TheNavbar from "./components/TheNavbar";
export default {
  components: {
    TheNavbar,
  },
};
</script>
<style lang="scss">
@import "~materialize-css/dist/css/materialize.min.css";
</style>
