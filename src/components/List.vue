<!--
 * @Author: your name
 * @Date: 2022-02-13 11:06:52
 * @LastEditTime: 2022-02-21 16:29:13
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \test-vue3\src\components\List.vue
-->
<template>
  <div class="passport_view">
    <el-form class="frombox" :model="form">
      <el-form-item label="床号">
        <el-select v-model="form.region" placeholder="选择床位">
          <el-option
            v-for="(item, index) in bedNo"
            :key="index"
            :label="item.bedName"
            :value="item.bedName"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchData">
          <el-icon><Search /></el-icon>
          查询
        </el-button>
        <el-button type="primary" @click="reset">
          <el-icon><Search /></el-icon>
          重置
        </el-button>
      </el-form-item>
    </el-form>
    <div class="content">
      <el-table
        :data="saveData"
        style="width: 100%"
        @row-click="rowClickHandle"
      >
        <el-table-column type="index" label="序号" width="100" />
        <el-table-column prop="bedName" label="床号" />
        <el-table-column prop="patientName" label="姓名" />
        <el-table-column prop="patientSex" label="性别" />
        <el-table-column prop="patientAge" label="年龄" />
        <el-table-column prop="operationTime" label="手术时间" />
        <el-table-column prop="operationProject" label="手术项目" />
        <el-table-column prop="operationLevel" label="手术等级" />
        <el-table-column prop="operationDeptName" label="执行科室" />
        <el-table-column prop="operationSurgeonName" label="主导医生" />
        <el-table-column prop="anesthesiaMode" label="麻醉方式" />
      </el-table>
    </div>
    <Detail
      :data="data"
      :dialogVisible="dialogVisible"
      @close="closeDialog"
    ></Detail>
  </div>
</template>

<script>
import { reactive, ref, onMounted } from "vue";
import bedData from "../../public/mock/bedData.json";
import operationData from "../../public/mock/operationData.json";
import { Search } from "@element-plus/icons-vue";
import Detail from "./Detail.vue";

export default {
  components: {
    Search,
    Detail,
  },
  setup() {
    const form = reactive({ region: "" });
    let bedNo = ref([]);
    let operationList = ref([]);
    let saveData = ref([]);
    let data = reactive({});
    let dialogVisible = ref(false);

    onMounted(() => {
      bedNo.value = bedData.data.list;
      operationList.value = operationData.data.list;
      saveData.value = operationData.data.list;
    });

    function searchData() {
      saveData.value = operationList.value.filter((item) =>
        item.bedName.includes(form.region)
      );
    }

    function reset() {
      saveData.value = operationList.value;
      form.region = "";
    }

    function rowClickHandle(row) {
      data.value = row;
      dialogVisible.value = true;
    }

    function closeDialog() {
      dialogVisible.value = false;
    }

    return {
      form,
      bedNo,
      operationList,
      saveData,
      data,
      dialogVisible,
      searchData,
      reset,
      rowClickHandle,
      closeDialog,
    };
  },
};
</script>

<style scoped lang="scss">
.passport_view {
  background: #fff;
  width: 100%;
  height: 100%;
  box-shadow: 2px 2px 10px #ccc;
  overflow: auto;
  .frombox {
    display: flex;
    flex-wrap: wrap;
    padding: 20px 10px;
    border-bottom: 1px solid #e6e6e6;
    .el-form-item {
      padding: 0 10px;
    }
  }
  .content {
    padding: 20px;
  }
}
</style>
