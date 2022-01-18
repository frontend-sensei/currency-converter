import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/exchange-rates",
    name: "Exchange Rates",
    component: () =>
      import(
        /* webpackChunkName: "exchange-rates" */ "../views/ExchangeRates.vue"
      ),
  },
  {
    path: "/settings",
    name: "Settings",
    component: () =>
      import(/* webpackChunkName: "settings" */ "../views/Settings.vue"),
  },
  {
    path: "/converter",
    name: "Converter",
    component: () =>
      import(/* webpackChunkName: "converter" */ "../views/Converter.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
