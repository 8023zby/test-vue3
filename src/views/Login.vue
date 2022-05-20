<template>
  <el-container>
    <el-header>
      <img src="/static/img/tit_yarward.png" alt="" />
      <div class="passport-login-tit">亚华云枢医院服务交互系统</div>
    </el-header>
    <el-main>
      <div class="home">
        <div>
          <img src="/static/img/leftImg.png" alt="" />
        </div>
        <div class="user">
          <div class="title">账号密码登录</div>
          <div class="div">
            <el-input
              :prefix-icon="Avatar"
              style="width: 400px"
              v-model="account.loginName"
              placeholder="请输入用户名"
            ></el-input>
          </div>

          <div class="div">
            <el-input
              :prefix-icon="Unlock"
              style="width: 400px"
              v-model="account.loginPassword"
              type="password"
              placeholder="请输入密码"
            ></el-input>
          </div>
          <div class="div">
            <el-button class="primary" @click="login" type="primary"
              >登录</el-button
            >
          </div>
        </div>
      </div>
    </el-main>
    <el-footer style="60px"></el-footer>
    <!-- 选择终端弹窗 -->
    <el-dialog v-model="chooseDialog" title="请选择">
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
  </el-container>
</template>

<script setup>
// 组合式 API 的核心思想是直接在函数作用域内定义响应式状态变量，并将从多个函数中得到的状态组合起来处理复杂问题
import { reactive, ref } from "vue";
import router from "../router";
import { loginApi } from "@/api/login/index.js";
import { ElMessage } from "element-plus";
import { Avatar, Unlock } from "@element-plus/icons-vue";

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
      window.localStorage.setItem(
        "deptInfo",
        JSON.stringify(res.data.data.deptInfo)
      );
      window.localStorage.setItem(
        "dataDeptInfoList",
        JSON.stringify(res.data.data.dataDeptInfoList)
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
      saveDeptId(res.data.data);
    } else {
      ElMessage.error(res.data.desc);
    }
  });
};

const confirm = () => {
  selectDept();
  getAuth();
  checkDeptLanding();
  router.push({ path: "/main" });
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

// 存储deptId与选择的科室信息
const saveDeptId = (deptId) => {
  window.localStorage.setItem("selectDeptId", deptId);
  const dataDeptInfoList = JSON.parse(
    window.localStorage.getItem("dataDeptInfoList")
  );
  for (let index = 0; index < dataDeptInfoList.length; index++) {
    if (dataDeptInfoList[index].deptId === deptId) {
      window.localStorage.setItem(
        "selectDeptInfo",
        JSON.stringify(dataDeptInfoList[index])
      );
    }
  }
};
</script>

<style scoped lang="scss">
.el-container {
  width: 100%;
  height: 100%;
}
.el-main,
.el-footer {
  widows: 100%;
  padding: 0;
}
.el-main {
  background: #1e87f0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.el-header {
  height: 80px;
  display: flex;
  align-items: center;
  img {
    height: 40px;
  }
  .passport-login-tit {
    margin-left: 20px;
    font-size: 24px;
    color: #333;
  }
}
.home {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1170px;
  height: 560px;
  .div {
    margin: 10px 0;
    text-align: left;
    height: 100px;
  }
  .el-button--primary {
    width: 100%;
    height: 50px;
    font-size: 22px;
    margin-top: 20px;
    background: #1e87f0;
  }
}
.user {
  height: calc(100% - 60px);
  width: 410px;
  background: #fff;
  padding: 30px;
}
.title {
  font-size: 24px;
  color: #333;
  height: 80px;
  line-height: 100px;
}
/deep/.el-input__inner {
  height: 50px;
  line-height: 50px;
}
/deep/.el-dialog {
  width: 490px;
}
.el-select {
  width: 100%;
}
</style>
