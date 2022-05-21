<!--
 * @Author: your name
 * @Date: 2022-02-13 11:06:52
 * @LastEditTime: 2022-05-21 11:34:54
 * @LastEditors: zhangbinyan 1733674157@qq.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \test-vue3\src\views\About.vue
-->
<template>
  <el-container>
    <el-header>
      <div class="left">
        <img src="/static/img/yarward.png" alt="" />
      </div>
      <div style="position: absolute; left: 80px">山东亚华电子股份有限公司</div>
      <div class="topDeptName">
        <el-select
          v-model="selectDeptId"
          @change="changeUnit"
          placeholder="请选择护理单元"
        >
          <el-option
            v-for="item in dataDeptInfoList"
            :key="item.deptId"
            :value="item.deptId"
            :label="item.deptName"
          >
          </el-option>
        </el-select>
      </div>
      <div class="right">
        <img src="/static/img/noUser.png" alt="" />
        <div class="userName">
          <div style="color: #333">你好，{{ empInfo.empName }}</div>
          <div style="color: #999">{{ deptInfo.deptName }}</div>
        </div>
        <div @click="passVis = true" style="cursor: pointer">
          <el-icon color="#409EFC"
            ><Lock style="margin-right: 8px; height: 1.3em; width: 1.3em"
          /></el-icon>
        </div>
        <div @click="dialogVisible = true" style="cursor: pointer">
          <el-icon color="#409EFC"
            ><SwitchButton style="height: 1.3em; width: 1.3em"
          /></el-icon>
        </div>
      </div>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <div class="passport_first_menu">
          <div class="passport-first-div">
            <!-- <vue3SeamlessScroll :ops="ops" style="height: 100%"> -->
            <FirstMenu
              :authorityTree="authorityList"
              @secondClick="secondClick"
              ref="nav_menu"
            ></FirstMenu>
            <!-- </vue3SeamlessScroll> -->
          </div>
        </div>
        <div class="passport_second_menu">
          <secondMenu
            v-if="secondShow"
            :authorityTree="authorityList"
            :defaultActive="defaultActive"
            :dataKey="dataKey"
            :firstName="firstName"
            @checkMenu="checkMenu"
          ></secondMenu>
        </div>
      </el-aside>
      <el-container>
        <el-footer>
          <div class="passport_main_router_left"></div>
          <div class="passport_main_router_right" v-if="welcomeFlag">
            <LocationFilled
              style="width: 1em; height: 1em; margin-right: 8px"
              color="#1e87f0"
            />
            <span>{{ menuSelected.selectedMenu.secondMenu }}</span>
            <span style="font-size: 18px">&nbsp;>&nbsp;</span>
            <span style="color: #333333">{{
              menuSelected.selectedMenu.thirdMenu
            }}</span>
          </div>
          <div class="passport_main_router_right" v-else>
            <LocationFilled
              style="width: 1em; height: 1em; margin-right: 8px"
              color="#1e87f0"
            />
            <span>{{ menuSelected.selectedMenu.firstMenu }}</span>
            <span style="font-size: 18px">&nbsp;>&nbsp;</span>
            <span v-if="menuSelected.selectedMenu.secondMenu !== ''"
              >&nbsp;{{ menuSelected.selectedMenu.secondMenu }}</span
            >
            <span
              v-if="menuSelected.selectedMenu.secondMenu !== ''"
              style="font-size: 18px"
              >&nbsp;>&nbsp;</span
            >
            <span style="color: #333333">{{
              menuSelected.selectedMenu.thirdMenu
            }}</span>
          </div>
        </el-footer>
        <el-main v-if="welcomeFlag" class="passport_welcome">
          <img
            :src="'/static/img/welcome_org.jpg'"
            onerror="javascript:this.src='/static/img/welcome_org.jpg';"
          />
        </el-main>
        <el-main
          :class="{ 'passport-full-screen': $route.meta.isFullScreen }"
          :style="IEStyle"
          v-if="!welcomeFlag"
        >
          <div class="passport_view">
            <router-view v-if="isRouterAlive" />
          </div>
        </el-main>
      </el-container>
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
    <!--修改密码-->
    <el-dialog
      title="修改密码"
      v-model="passVis"
      width="580px"
      :show-close="false"
      :close-on-click-modal="false"
    >
      <el-form
        v-if="passVis"
        :rules="rules"
        :model="modifyPassForm"
        label-width="120px"
        ref="ruleFormRef"
        class="typt-add-dialog"
      >
        <el-form-item label="旧密码:" prop="oldPass">
          <el-input type="password" v-model="modifyPassForm.oldPass"></el-input>
        </el-form-item>
        <el-form-item label="新密码:" prop="userPassword">
          <el-input
            type="password"
            v-model="modifyPassForm.userPassword"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认新密码:" prop="checkPass">
          <el-input
            type="password"
            v-model="modifyPassForm.checkPass"
          ></el-input>
        </el-form-item>
      </el-form>
      <div class="dialog-footer">
        <el-button @click="passVis = false">取 消</el-button>
        <el-button type="primary" @click="doModify(ruleFormRef)"
          >确 认</el-button
        >
      </div>
    </el-dialog>
  </el-container>
</template>

<script setup>
import router from "@/router";
import { loginApi } from "@/api/login/index.js";
import { ref, reactive, onMounted, nextTick } from "vue";
import { ElMessage } from "element-plus";
import { Lock, SwitchButton, LocationFilled } from "@element-plus/icons-vue";
import FirstMenu from "./MenuFirst.vue";
import secondMenu from "./Menu.vue";

let dialogVisible = ref(false);
let passVis = ref(false);

const ruleFormRef = ref();

let selectDeptId = ref("");

const authorityList = ref([]);
authorityList.value = JSON.parse(localStorage.getItem("authorityList"));

let dataKey = ref(0);
let secondShow = ref(true);
let firstName = ref("");
let defaultActive = ref("");
let welcomeFlag = ref(true);

const modifyPassForm = reactive({
  oldPass: "",
  userPassword: "",
  checkPass: "",
});

const menuSelected = reactive({
  mainShow: false,
  selectedMenu: {
    firstMenu: "",
    secondMenu: "首页",
    thirdMenu: "欢迎页",
  },
});
const isRouterAlive = ref(true);

const rules = reactive({
  oldPass: [
    { required: true, message: "请输入旧密码", trigger: "blur" },
    { min: 6, max: 20, message: "密码长度为6-20位", trigger: "blur" },
  ],
  userPassword: [
    { required: true, message: "请输入新密码", trigger: "blur" },
    { min: 6, max: 20, message: "密码长度为6-20位", trigger: "blur" },
  ],
  checkPass: [
    { required: true, message: "请确认新密码", trigger: "blur" },
    { min: 6, max: 20, message: "密码长度为6-20位", trigger: "blur" },
  ],
});

const empInfo = JSON.parse(window.localStorage.getItem("empInfo"));

const deptInfo = JSON.parse(window.localStorage.getItem("deptInfo"));

const dataDeptInfoList = JSON.parse(localStorage.getItem("dataDeptInfoList"));

selectDeptId.value = localStorage.getItem("selectDeptId");

onMounted(() => {
  // let path = router.currentRoute.value.path;
  // 控制欢迎页显示
  // if (path !== "/main") {
  //   welcomeFlag.value = false;
  // } else {
  //   welcomeFlag.value = true;
  // }
});

const logout = () => {
  loginApi.logout().then((res) => {
    console.log(res);
    dialogVisible.value = false;
    ElMessage.success("注销成功");
    router.push({ path: "/" });
  });
};

// 切换科室
const changeUnit = (deptId) => {
  loginApi.saveDept(deptId).then((res) => {
    console.log(res, "ppp");
    if (res.status === 200) {
      let temp = dataDeptInfoList.find((item) => {
        return item.deptId === selectDeptId.value;
      });
      localStorage.setItem("selectDeptInfo", JSON.stringify(temp));
      localStorage.setItem("selectDeptId", selectDeptId.value);
      window.location.reload();
    } else if (res.desc !== "") {
      // MsgShow("error", res.desc, 3000);
      return false;
    }
  });
};

const doModify = async (formEl) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      changePass();
    } else {
      console.log("error submit!", fields);
    }
  });
};

const changePass = () => {
  const empInfo = JSON.parse(localStorage.getItem("empInfo"));
  const empId = empInfo.empId;
  const params = {
    userId: empId,
    oldPwd: modifyPassForm.oldPass,
    newPwd: modifyPassForm.userPassword,
  };
  loginApi.changePassword(params).then((res) => {
    if (res.data.status === 200) {
      ElMessage({
        message: "修改密码成功,请重新登录！",
        type: "success",
      });
      setTimeout(() => {
        router.push("/login");
      }, 1500);
    } else {
      ElMessage({
        message: res.data.desc,
        type: "error",
      });
    }
  });
};

const secondClick = (key, isReload = true) => {
  if (key === dataKey.value) return false;
  secondShow.value = false;
  nextTick(() => {
    secondShow.value = true;
  });
  dataKey.value = key;
  firstName.value = authorityList.value[key].authorityName || "";
  // 刷新页面不需要再进行选中第一个菜单操作
  if (!isReload) {
    // 1.7需求 点击一级菜单默认选中二级或三级第一个
    let menuData = authorityList.value[key].child;
    let toRouter = "";
    let curName = "";
    let pName = "";
    if (menuData.length > 0) {
      let thirdData = menuData[0].child;
      if (thirdData.length === 0) {
        curName = menuData[0].authorityName;
        toRouter = menuData[0].pageUrl;
      } else {
        pName = menuData[0].authorityName;
        curName = thirdData[0].authorityName;
        toRouter = thirdData[0].pageUrl;
      }
      checkMenu(toRouter, curName, pName, "", firstName.value, {}, "fresh");
    }
  }
};

// 点击菜单
const checkMenu = (
  key,
  curName,
  pName,
  realKey = "",
  fName = "",
  toQuery = {},
  isReload = ""
) => {
  welcomeFlag.value = false;
  menuSelected.mainShow = true;
  menuSelected.selectedMenu.firstMenu = fName;
  menuSelected.selectedMenu.secondMenu = pName;
  menuSelected.selectedMenu.thirdMenu = curName;
  console.log(menuSelected, "ppppppp");
  firstName.value = fName;
  defaultActive.value = key;
  if (isReload === "fresh") {
    if (realKey === "") {
      router.push({ path: `${key}`, query: toQuery });
    } else {
      router.push({ path: `${realKey}`, query: toQuery });
    }
  } else {
    isRouterAlive.value = false;
    if (realKey === "") {
      router.push({ path: `${key}`, query: toQuery });
    } else {
      router.push({ path: `${realKey}`, query: toQuery });
    }
    setTimeout(() => {
      isRouterAlive.value = true;
    }, 200);
  }
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
    color: #666;
    line-height: 50px;
    height: 50px !important;
    font-size: 14px;
  }
  .el-header {
    box-shadow: 5px 2px 10px #ccc;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 0;
    padding-right: 20px;
    z-index: 1;
  }
  .el-aside {
    color: white;
    text-align: center;
    height: 100%;
    border-right: 1px solid #e6e6e6;
    color: #ffffff;
    text-align: left;
    overflow: hidden;
    width: 210px !important;
    height: 100%;
    display: flex;
    border-right: 1px solid #cccccc;
  }
  .el-menu-vertical-demo {
    height: 100%;
  }
  .el-main {
    padding: 30px;
  }
  .el-footer {
    padding: 0px !important;
    height: 42px !important;
    line-height: 40px;
    border-bottom: 1px solid #ebeeed;
    display: flex;
    box-sizing: border-box;
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
    line-height: 50px;
    div {
      line-height: 20px;
    }
  }
}
.passport_first_menu {
  width: 60px;
  height: 100%;
  background-color: #1e87f0;
  z-index: 2;
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
.el-icon {
  width: 2em;
}
/deep/.el-select {
  .el-input__inner {
    border: none;
    color: #3c9efd;
    font-size: 18px;
  }
}
.topDeptName {
  width: 200px;
  /deep/.el-input__icon {
    color: #3c9efd !important;
    font-size: 18px !important;
  }
}
.el-select-dropdown__item /deep/ {
  font-size: 16px;
  font-weight: 500;
}
.passport_main_router_left {
  width: 5px;
  background: #1d87ef;
}
.passport_main_router_right {
  padding-left: 10px;
  color: #666666;
  font-size: 14px;
  position: relative;
}
.passport_main_router_right img {
  position: absolute;
  top: 14px;
}
.passport_first_menu {
  width: 60px;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  flex: 0 0 auto;
}
.passport_second_menu {
  width: 150px;
  height: 100%;
  padding-top: 4px;
}
.passport_welcome {
  padding: 0px !important;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>
