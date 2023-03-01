import { createApp } from "vue";
import naive from "naive-ui";
import App from "./App.vue";
import "./assets/style/global.less";
import "virtual:svg-icons-register";

import router from "./router/index";
import { createPinia } from "pinia";
import CMonitor from "c-monitor";

CMonitor.init({
  appkey: "a7d7f473c2v4bv52v56",
  disable: 1,
  uploadUrl: "",
});

const app = createApp(App);

app.config.errorHandler = err => {
  // console.log("vueError", err);
  CMonitor.notify(err);
};

app.use(router);

app.use(naive);

app.use(createPinia());

app.mount("#app");
