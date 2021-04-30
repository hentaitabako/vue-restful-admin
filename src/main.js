import { createApp } from "vue";
import dayjs from "dayjs";
import ElementPlus from "element-plus";
import "element-plus/lib/theme-chalk/index.css";
import App from "./App.vue";
const app = createApp(App);

app.config.globalProperties.$dayjs = dayjs;

app.use(ElementPlus).mount("#app");
