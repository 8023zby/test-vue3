<!--
 * @Author: your name
 * @Date: 2022-02-13 11:06:52
 * @LastEditTime: 2022-04-26 16:24:54
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \test-vue3\src\views\About.vue
-->
<template>
  <el-container>
    <el-header>
      <div class="left">
        <img src="/static/img/yarward.png" alt="" />
      </div>
      <div class="right">
        <img src="/static/img/noUser.png" alt="" />
        <div class="userName">
          <div>你好，{{ userName }}</div>
          <div>急诊科病房</div>
        </div>
        <div @click="dialogVisible = true">退出</div>
      </div>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <div class="passport_first_menu">
          <div
            class="passport_first_nav"
            v-for="(item, index) in authorityList"
            :key="index"
          >
            <img
              style="padding: 5px 0"
              v-if="item.authorityName === '消息'"
              src="/static/img/menu.png"
              alt=""
            />
            <img v-else :src="item.icon" alt="" />
            {{ item.authorityName }}
          </div>
        </div>
        <div class="passport_second_menu"></div>
      </el-aside>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
    <el-dialog v-model="dialogVisible" title="提示" width="30%">
      <span>确定注销吗？</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="logout">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </el-container>
</template>

<script setup>
import router from "@/router";
import { loginApi } from "@/api/index.js";
import { ref, onMounted } from "vue";
// import { ElMessageBox } from "element-plus";
// 获取路由传参
const userName = router.currentRoute.value.query.userName;
let dialogVisible = ref(false);
const authorityList = ref([]);

onMounted(() => {
  authorityList.value = JSON.parse(
    window.localStorage.getItem("authorityList")
  );
});

const logout = () => {
  loginApi.logout().then((res) => {
    console.log(res);
    dialogVisible.value = false;
    router.push({ path: "/" });
  });
};
</script>

<style scoped lang="scss">
.el-container {
  width: 100%;
  height: 100%;
  .el-header,
  .el-footer {
    background-color: white;
    color: black;
    text-align: left;
  }
  .el-header {
    box-shadow: 5px 2px 10px #ccc;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 0;
    padding-right: 20px;
  }
  .el-aside {
    color: white;
    text-align: center;
    height: 100%;
    border-right: 1px solid #e6e6e6;
  }
  .el-menu-vertical-demo {
    height: 100%;
  }
  .el-main {
    padding: 30px;
  }
}
.left {
  width: 60px;
  height: 100%;
  display: flex;
  align-items: center;
  background-color: #1e87f0;
  img {
    width: 56px;
    height: 15px;
  }
}
.right {
  display: flex;
  align-items: center;
  img {
    width: 30px;
    height: 30px;
  }
  .userName {
    padding: 0 20px;
  }
}
.passport_first_menu {
  width: 60px;
  height: 100%;
  background-color: #1e87f0;
  .passport_first_nav {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 62px;
    font-size: 14px;
    justify-content: center;
    position: relative;
    cursor: pointer;
    img {
      max-width: 32px;
      max-height: 32px;
    }
  }
}
</style>
