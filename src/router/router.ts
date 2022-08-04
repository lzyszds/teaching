import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: () => import("src/page/Home.vue"),
  },
  {
    path: "/001",
    name: "001",
    component: () => import("src/page/001/index.vue"),
  },
  {
    path: "/002",
    name: "002",
    component: () => import("src/page/002/index.vue"),
  },
];
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
router.beforeEach((to, from) => {
  // 路由守卫逻辑
  // 通过 return turn;
  // 不通过 return false;
  return true;
});

export default router;
