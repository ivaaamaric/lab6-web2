import { createApp, defineAsyncComponent } from "vue";
import App from "./App.vue";
import store from "./stores";
import router from "./router";
import Workout from './components/Workout.vue';
import WeightConverter from './components/WeightConverter.vue';
const MusicPlayer = defineAsyncComponent(() => import('./components/MusicPlayer.vue'));

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const app = createApp(App);
app.use(store);
app.use(router);
app.component('workout', Workout);
app.component('weight', WeightConverter);
app.component('music', MusicPlayer);
app.mount("#app");
