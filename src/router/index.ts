import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: () => import("../layouts/AuthLayout.vue"),
    beforeEnter: () => {
      return "/auth/login";
    },
  },
  {
    path: "/auth",
    component: () => import("../layouts/AuthLayout.vue"),
    children: [
      {
        path: "login",
        name: "auth-login",
        component: () => import("../views/auth/LoginView.vue"),
      },
    ],
  },
  {
    path: "/app",
    component: () => import("../layouts/BaseLayout.vue"),
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: "scheduler",
        name: "app-scheduler",
        component: () => import("../views/SchedulerView.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
