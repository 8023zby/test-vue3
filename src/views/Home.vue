<template>
  <div class="home">
    <div class="div">
      <span>用户名：</span>
      <el-input
        style="width: 300px"
        v-model="account.loginName"
        placeholder="请输入账号"
      ></el-input>
    </div>

    <div class="div">
      <span>密码：</span>
      <el-input
        style="width: 300px"
        v-model="account.loginPassword"
        placeholder="请输入账号"
      ></el-input>
    </div>
    <div class="div">
      <el-button @click="login" type="primary">登录</el-button>
    </div>

    <!-- 选择终端弹窗 -->
    <el-dialog v-model="chooseDialog" title="请选择" width="30%">
      <el-form>
        <el-form-item label="登录应用" :label-width="formLabelWidth">
          <el-select v-model="LandingEndId" placeholder="请选择">
            <el-option
              v-for="(item, index) in userInfo.landingEndList"
              :key="index"
              :label="item.landingEndName"
              :value="item.landingEndId"
              >{{ item.landingEndName }}</el-option
            >
          </el-select>
        </el-form-item>
        <el-form-item
          v-if="
            userInfo &&
            userInfo.dataDeptInfoList &&
            userInfo.dataDeptInfoList.length > 0 &&
            LandingEndId.indexOf('webLangingEndId') > -1
          "
          label="科室"
          :label-width="formLabelWidth"
        >
          <el-select v-model="deptId" placeholder="请选择">
            <el-option
              v-for="(dept, index) in userInfo.dataDeptInfoList"
              :key="index"
              :label="dept.deptName"
              :value="dept.deptId"
              >{{ dept.deptName }}</el-option
            >
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="chooseDialog = false">取消</el-button>
          <el-button type="primary" @click="confirm">确认</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
// 组合式 API 的核心思想是直接在函数作用域内定义响应式状态变量，并将从多个函数中得到的状态组合起来处理复杂问题
import { reactive, ref } from "vue";
import router from "../router";
import { loginApi } from "@/api/index.js";
import { ElMessage } from "element-plus";

const account = reactive({
  loginName: "",
  loginPassword: "",
  orgType: 2,
  photoCode: "",
  verifyStr: "06a852395dcb40b08fbca78249eabd8d",
});

const formLabelWidth = "110px";

let userInfo = ref({});
let deptId = ref("");
let LandingEndId = ref("");

let chooseDialog = ref(false);

const login = () => {
  loginApi.login(account).then((res) => {
    if (res.data.status === 200) {
      userInfo.value = res.data.data;
      chooseDialog.value = true;
      getLandingEndId();
      getDeptId();
      window.localStorage.setItem("token", JSON.stringify(res.data.data.token));
      window.localStorage.setItem(
        "empInfo",
        JSON.stringify(res.data.data.empInfo)
      );
      window.localStorage.setItem(
        "orgInfo",
        JSON.stringify(res.data.data.orgInfo)
      );
    } else {
      ElMessage.error(res.data.desc);
    }
  });
};

const getLandingEndId = () => {
  loginApi.getLandingEndId().then((res) => {
    if (res.data.status === 200) {
      LandingEndId.value = res.data.data;
    } else {
      ElMessage.error(res.data.desc);
    }
  });
};

const getDeptId = () => {
  loginApi.getDeptId().then((res) => {
    if (res.data.status === 200) {
      deptId.value = res.data.data;
    } else {
      ElMessage.error(res.data.desc);
    }
  });
};

const confirm = () => {
  selectDept();
  getAuth();
  checkDeptLanding();
  router.push({
    path: "/about",
    query: { userName: userInfo.value.empInfo.empName },
  });
};

const selectDept = () => {
  loginApi.selectDept(deptId.value).then((res) => {
    if (res.data.status !== 200) {
      ElMessage.error(res.data.desc);
    }
  });
};

const getAuth = () => {
  loginApi.getAuth(LandingEndId.value).then((res) => {
    console.log(res, "获取菜单");
    window.localStorage.setItem("authorityList", JSON.stringify(res.data.data));
  });
};

const checkDeptLanding = () => {
  const params = {
    userId: userInfo.value.empInfo.empId,
    deptName: "急诊病房",
    landingName: "病区护理",
  };
  loginApi.checkDeptLanding(params).then((res) => {
    console.log(res, "checkDeptLanding");
  });
};
</script>

<style scoped lang="scss">
.home {
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: url("../assets/home.jpg") 100% 100% no-repeat;
  .div {
    margin: 10px 0;
    text-align: left;
    span {
      display: inline-block;
      width: 70px;
    }
  }
}
</style>
