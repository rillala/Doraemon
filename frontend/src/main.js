import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import moment from "moment";

//引入firebaseConfig中的SDK代碼
import firebaseConfig from './firebaseConfig';
import { initializeApp } from "firebase/app";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.config.globalProperties.$moment = moment;

// 啟用firebase主程式
initializeApp(firebaseConfig);

app.mount("#app");
