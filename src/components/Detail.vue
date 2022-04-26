<!--
 * @Author: your name
 * @Date: 2022-02-17 08:54:15
 * @LastEditTime: 2022-02-21 16:29:30
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \test-vue3\src\components\Detaile.vue
-->
<template>
  <el-dialog v-model="props.dialogVisible" title="Tips" width="30%">
    <div>
      <p>床号：{{ props.data.value.bedName }}</p>
      <p>姓名：{{ props.data.value.patientName }}</p>
      <p>性别：{{ props.data.value.patientSex }}</p>
      <p>年龄：{{ props.data.value.patientAge }}</p>
      <p>手术名称：{{ props.data.value.operationProject }}</p>
      <p>麻醉方式：{{ props.data.value.anesthesiaMode }}</p>
      <p>主刀医生：{{ props.data.value.operationSurgeonName }}</p>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeDialog">Cancel</el-button>
        <el-button @click="closeDialog" type="primary">Confirm</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script>
export default {
  props: {
    data: Object,
    dialogVisible: Boolean,
  },
  setup(props, context) {
    console.log(props, "传递的参数是什么", context);
    function closeDialog() {
      context.emit("close", false);
    }
    return {
      props,
      closeDialog,
    };
  },
};
</script>

<style scoped lang="scss"></style>
