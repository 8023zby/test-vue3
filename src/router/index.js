/*
 * @Author: your name
 * @Date: 2022-02-13 11:06:52
 * @LastEditTime: 2022-05-20 16:46:14
 * @LastEditors: zhangbinyan 1733674157@qq.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \test-vue3\src\router\index.js
 */
import { createRouter, createWebHashHistory } from "vue-router";
import Login from "../views/Login.vue";
import cardList from "../views/bnms/cardList.vue";

const routers = [
  {
    path: "/card_list",
    name: "cardList",
    component: cardList,
  },
];

// 形成最后的路由
const finalRouters = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/main",
    name: "main",
    component: () => import("../views/Main.vue"),
    children: routers,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes: finalRouters,
});

export default router;
