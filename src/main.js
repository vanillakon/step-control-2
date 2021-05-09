import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "materialize-css/dist/js/materialize.min";
import "./registerServiceWorker";
import "./theme.css";

createApp(App)
  .use(router)
  .use(store)
  .mount("#app");
