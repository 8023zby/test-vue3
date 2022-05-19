<!--
 * @Author: your name
 * @Date: 2022-02-13 11:06:52
 * @LastEditTime: 2022-05-18 17:30:01
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
          <div
            class="passport_first_nav"
            :class="{ passport_selected: '' }"
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
import { ref, onMounted, reactive } from "vue";
import { ElMessage } from "element-plus";
import { Lock, SwitchButton } from "@element-plus/icons-vue";

let dialogVisible = ref(false);
let passVis = ref(false);

const ruleFormRef = ref();

let selectDeptId = ref("");

const authorityList = ref([]);

const modifyPassForm = reactive({
  oldPass: "",
  userPassword: "",
  checkPass: "",
});

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
  authorityList.value = JSON.parse(localStorage.getItem("authorityList"));
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
    console.log(res, 'pppppp')
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
</style>
