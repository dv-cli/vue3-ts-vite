import { createApp } from "vue";
import App from "./App.vue";
import "./assets/style/global.less";

import router from "./router/index";
import { createPinia } from "pinia";

createApp(App).use(router).use(createPinia()).mount("#app");
