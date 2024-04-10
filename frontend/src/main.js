import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";

//引入firebase初始化
import { initializeApp } from "firebase/app";
//引入firebaseConfig中的SDK代碼
import firebaseConfig from './firebaseConfig';
import router from "./router";
import moment from "moment";

// 啟用firebase主程式
initializeApp(firebaseConfig);

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.config.globalProperties.$moment = moment;

app.mount("#app");

