import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";

// firebase 初始化
import "./firebaseConfig";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.config.globalProperties.$moment = moment;

app.mount("#app");
