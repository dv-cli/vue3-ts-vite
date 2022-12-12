import { RouteRecordRaw } from "vue-router";

/**
 * constant(常驻路由)
 */
export const constantRouter: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/home/index",
  },
  {
    path: "/home",
    name: "Home",
    redirect: "/home/index",
    component: () => import("@/view/layout/PageLayout.vue"),
    meta: {
      title: "首页",
    },
    children: [
      {
        path: "index",
        name: "HomePage",
        component: () => import("@/view/home/Home.vue"),
      },
    ],
  },
  {
    path: "/example",
    name: "Example",
    component: () => import("@/view/layout/PageLayout.vue"),
    meta: {
      title: "演示示例",
    },
    children: [
      {
        path: "virtual-table",
        name: "VirtualTable",
        component: () => import("@/view/example/VirtualTable.vue"),
        meta: {
          title: "虚拟滚动表格",
        },
      },
      {
        path: "test111",
        name: "Test1",
        component: () => import("@/view/example/Test.vue"),
        meta: {
          title: "测试111",
        },
      },
      {
        path: "vue-use",
        name: "VueUse",
        component: () => import("@/view/example/VueUse.vue"),
        meta: {
          title: "VueUse用例",
        },
      },
      {
        path: "hello-world",
        name: "HelloWorld",
        component: () => import("@/view/example/HelloWorld.vue"),
        meta: {
          title: "HelloWorld",
        },
      },
    ],
  },
];
