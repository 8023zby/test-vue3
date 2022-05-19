<template>
  <el-sub-menu
    v-if="props.menuData.child && props.menuData.child.length > 0"
    :index="menuData.authorityId"
  >
    <template #title>
      <i class="passport_nav_i">
        <i
          v-if="flag.indexOf(props.menuData.authorityId + '_close') > -1"
          class="el-icon-caret-right passport_nav_open"
        />
        <i v-else class="el-icon-caret-bottom passport_nav_open"></i>
      </i>
      <span style="position: relative">
        {{ props.menuData.authorityName }}
      </span>
    </template>
    <el-menu-item
      v-for="(item, index) in props.menuData.child"
      :key="index"
      :index="item.pageUrl"
    >
      <span
        style="position: relative"
        :pName="props.menuData.authorityName"
        :url="item.pageUrl"
        :fName="props.firstName"
      >
        {{ item.authorityName }}
      </span>
    </el-menu-item>
  </el-sub-menu>
  <el-menu-item
    v-else
    :index="props.menuData.pageUrl"
    class="passport-second-menu"
  >
    <span
      pName=""
      :url="props.menuData.pageUrl"
      :fName="props.firstName"
      style="position: relative"
    >
      {{ props.menuData.authorityName }}
    </span>
  </el-menu-item>
</template>

<script setup>
import { defineProps, watch, ref } from "vue";
const props = defineProps(["menuData", "selectedKey", "firstName"]);
let flag = ref("");

console.log(props.selectedKey, "pp")

// flag.value = props.selectedKey;

watch(props.selectedKey, () => {
  flag.value = props.selectedKey;
});
// export default {
//   name: "menu-tree",
//   props: {
//     menuData: {
//       type: Object,
//       required: true,
//     },
//     selectedKey: {
//       type: String,
//     },
//     firstName: {
//       type: String,
//       required: true,
//     }
//   },
//   data() {
//     return {
//       flag: "",
//     };
//   },
//   watch: {
//     selectedKey() {
//       this.flag = this.selectedKey;
//     },
//   },
//   created() {
//     this.flag = this.selectedKey;
//   },
// };
</script>

<style lang="scss">
.passport_second_menu {
  .passport_nav_open {
    font-size: 12px;
    width: 6px;
    margin-top: -5px;
    color: #1e87f0;
  }
  .passport_nav_i {
    padding-right: 5px;
  }
  .passport-second-menu {
    padding-left: 25px !important;
    color: #333333 !important;
    height: 38px;
    line-height: 38px;
    background: #f7f7f7;
  }
  .is-active {
    background: #daeff7;
    color: #409eff !important;
  }
  .passport-second-menu:hover {
    background: #ecf5ff;
  }
  .el-submenu__title {
    padding: 0 10px !important;
    height: 38px !important;
    line-height: 38px !important;
    color: #333333 !important;
  }
  .el-submenu__icon-arrow {
    display: none;
  }
  .el-submenu {
    background: #f7f7f7;
    .el-menu-item {
      height: 38px !important;
      line-height: 38px !important;
      padding-left: 30px !important;
      min-width: 140px !important;
    }
  }
  .passport-message-circle {
    position: absolute;
    background-color: #ee736d;
    min-width: 18px;
    height: 18px;
    border-radius: 18px;
    top: -8px;
    right: -20px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    color: #ffffff;
    pointer-events: none;
  }
}
</style>
