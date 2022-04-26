<!--
 * @Author: your name
 * @Date: 2022-02-13 11:06:52
 * @LastEditTime: 2022-04-25 17:35:48
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \test-vue3\src\views\About.vue
-->
<template>
  <el-container>
    <el-header>
      <div class="left">欢迎{{ userName }}访问后台管理系统</div>
      <div @click="dialogVisible = true" class="right">退出</div>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu
          active-text-color="#ffd04b"
          background-color="#545c64"
          class="el-menu-vertical-demo"
          default-active="helloword"
          text-color="#fff"
          router
        >
          <el-menu-item index="helloword">
            <el-icon><location /></el-icon>
            <span>第一个菜单</span>
          </el-menu-item>
        </el-menu>
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

<script>
import { Location } from "@element-plus/icons-vue";
import router from "@/router";
import { loginApi } from "@/api/index.js";
import { ref } from "vue";
// import { ElMessageBox } from "element-plus";
export default {
  // elemen-plus使用的图标需要同组件一样注册
  components: {
    Location,
  },
  setup() {
    // 获取路由传参
    const userName = router.currentRoute.value.query.userName;
    let dialogVisible = ref(false);

    const logout = () => {
      loginApi.logout().then((res) => {
        console.log(res);
        dialogVisible.value = false;
        router.push({ path: "/" });
      });
    };

    return {
      userName,
      dialogVisible,
      logout,
    };
  },
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
    line-height: 60px;
  }
  .el-header {
    border-bottom: 1px solid #e6e6e6;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .el-aside {
    color: white;
    text-align: center;
    line-height: 200px;
    height: 100%;
  }
  .el-menu-vertical-demo {
    height: 100%;
  }
  .el-main {
    padding: 30px;
  }
}
</style>
