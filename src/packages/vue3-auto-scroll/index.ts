import { App } from "vue";
import Vue3AutoScroll from "./vue3-auto-scroll.vue";

Vue3AutoScroll.name = "vue3-auto-scroll";

export { Vue3AutoScroll };

export default (app: App) => {
  app.component(Vue3AutoScroll.name, Vue3AutoScroll);
};
