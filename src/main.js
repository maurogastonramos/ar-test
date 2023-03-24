import { createApp } from 'vue'
import { createPinia } from "pinia";
import App from './App.vue'

const pinia = createPinia();

import "./assets/tailwind.css";

createApp(App).use(pinia).mount("#app");
