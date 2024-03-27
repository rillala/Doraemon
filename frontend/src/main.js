import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import moment from "moment";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.config.globalProperties.$moment = moment;

app.mount("#app");
