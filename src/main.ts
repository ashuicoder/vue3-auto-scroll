import { createApp } from "vue";
import App from "./App.vue";

// import Vue3AutoScroll from "./packages/vue3-auto-scroll";
import Vue3AutoScroll from "vue3-auto-scroll";
import "vue3-auto-scroll/dist/style.css";

const app = createApp(App);
app.use(Vue3AutoScroll);
app.mount("#app");
