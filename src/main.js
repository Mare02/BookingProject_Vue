import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Toast from "vue-toastification";
import GiGridImages from '@chinhpd/vue3-grid-images';
import "vue-toastification/dist/index.css";
 

createApp(App).use(store).use(router).use(Toast).use(GiGridImages).mount('#app')
