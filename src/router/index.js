import { defineAsyncComponent } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import Workouts from "../views/Workouts.vue";
import Converter from "../views/Converter.vue";
import NotFound from "../views/NotFound.vue";

const Music = defineAsyncComponent(() => import('../views/Music.vue'));

const routes = [
  {
    path: "/",
    component: Workouts,
  },
  {
    path: "/workouts/:id?",
    component: Workouts,
    props: true
  },
  {
    path: "/converter",
    component: Converter,
  },
  {
    path: "/music",
    component: Music,
  },
  {
    path: "/:catchAll(.*)",
    name: "NotFound",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
