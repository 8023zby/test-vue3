/*
 * @Author: your name
 * @Date: 2022-02-13 11:06:52
 * @LastEditTime: 2022-04-25 16:09:10
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \test-vue3\src\router\index.js
 */
import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import List from "../components/List.vue";
import About from "../views/About.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: About,
    children: [
      {
        path: "/helloword",
        name: "helloword",
        component: List,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
