<template>
  <el-menu
    @open="openMenu"
    @close="closeMenu"
    text-color="#666666"
    active-text-color="#1e87f0"
    :default-active="defaultActive"
    class="el-menu-vertical-demo"
    @select="checkMenu"
    :default-openeds="opened"
    @checkMenu="checkMenu"
  >
    <menu-tree
      :menuNum="menuNum"
      v-for="(item, index) in secondMenuData"
      :key="index"
      :menuData="item"
      :firstName="firstName"
      :selectedKey="selectedKey"
    ></menu-tree>
  </el-menu>
</template>

<script setup>
import MenuTree from "./MenuTree.vue";
import { defineProps, watch, ref, reactive, defineEmits } from "vue";
const props = defineProps([
  "authorityTree",
  "dataKey",
  "defaultActive",
  "firstName",
]);
const emit = defineEmits(["checkMenu"]);

let secondMenuData = ref([]);
const opened = ref([]);
const tempObj = reactive({});
const selectedKey = ref("");

watch(props.dataKey, () => {
  secondMenuData.value = props.authorityTree[props.dataKey].child;
  secondMenuData.value.forEach((item) => {
    opened.value.push(item.authorityId);
  });
});

const a = () => {
  secondMenuData.value = props.authorityTree[props.dataKey].child;
  secondMenuData.value.forEach((item) => {
    opened.value.push(item.authorityId);
  });
  console.log(secondMenuData.value, "mmmmmmmmmm")
};

a();

const openMenu = (key) => {
  tempObj[key] = key + "_open";
  initData();
};

const closeMenu = (key) => {
  tempObj[key] = key + "_close";
  initData();
};
const checkMenu = (key) => {
  let dom = event.target;
  let tagName = dom.tagName;
  if (tagName === "LI") {
    dom = dom.firstChild;
  }
  let curName = dom.innerText;
  let pName = dom.getAttribute("pName");
  let fName = dom.getAttribute("fName");
  emit("checkMenu", key, curName, pName, "", fName);
};

const initData = () => {
  selectedKey.value = "";
  let d = tempObj;
  for (let p in d) {
    selectedKey.value += d[p];
  }
};
</script>

<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 150px !important;
}
.el-menu-vertical-demo {
  height: 100%;
  overflow: auto;
}
</style>
