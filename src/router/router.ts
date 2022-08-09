import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: () => import("src/page/Home.vue"),
  },
  {
    path: "/001",
    name: "扫雷",
    component: () => import("src/page/001/index.vue"),
  },
  {
    path: "/002",
    name: "二叉树",
    component: () => import("src/page/002/index.vue"),
  },
  {
    path: "/003",
    name: "视频解析",
    component: () => import("src/page/003/index.vue"),
  },
  {
    path: "/004",
    name: "跟随鼠标",
    component: () => import("src/page/004/index.vue"),
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
