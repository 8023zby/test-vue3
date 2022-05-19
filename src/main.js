/*
 * @Author: your name
 * @Date: 2022-02-13 11:06:52
 * @LastEditTime: 2022-05-19 11:22:29
 * @LastEditors: zhangbinyan 1733674157@qq.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \test-vue3\src\main.js
 */
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import vue3SeamlessScroll from "vue3-seamless-scroll";

createApp(App)
  .use(ElementPlus)
  .use(store)
  .use(router)
  .use(vue3SeamlessScroll)
  .mount("#app");
