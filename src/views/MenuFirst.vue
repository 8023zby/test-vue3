<template>
  <div>
    <div
      :class="{
        passport_first_nav: true,
        passport_selected: triangleShow === index,
      }"
      v-for="(item, index) in props.authorityTree"
      :key="index"
      @click="changeMenu(index)"
    >
      <div class="passport_first_img">
        <div
          class="passport-menu-div"
          v-if="item.icon.indexOf('.svg') > -1"
        ></div>
        <object
          @click="changeMenu(index)"
          v-if="item.icon.indexOf('.svg') > -1"
          type="image/svg+xml"
          :data="item.icon"
          class="passport-iconCls"
        >
          <param name="src" :value="item.icon" />
        </object>
        <img
          v-else
          :src="item.icon"
          onerror="javascript:this.src='/static/passport/img/menu.png';"
          class="passport-iconCls"
        />
      </div>
      <div class="passport_first_tit">
        <span :title="item.name">{{ item.authorityName }}</span>
      </div>
      <div
        class="passport_first_triangle"
        v-show="triangleShow === index"
      ></div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, ref, defineEmits } from "vue";

const props = defineProps(["authorityTree"]);
const emit = defineEmits(["secondClick"]);

let triangleShow = ref(0);

const changeMenu = (index, isReload = false) => {
  if (typeof index === undefined) {
    return;
  }
  triangleShow.value = index;
  emit("secondClick", index, isReload);
};
</script>

<style lang="scss" scoped>
.passport_first_img {
  position: relative;
}
.passport-menu-div {
  position: absolute;
  width: 32px;
  height: 32px;
  background: transparent;
  cursor: pointer;
}
.passport_first_nav {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 62px;
  font-size: 14px;
  justify-content: center;
  position: relative;
  cursor: pointer;
}
.passport_first_tit {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: center;
  width: 100%;
}
.passport_selected {
  background: rgba(0, 0, 0, 0.2);
}
.passport_first_triangle {
  width: 0;
  height: 0;
  border-width: 7px 7px 7px 0;
  border-style: solid;
  border-color: transparent #ffffff transparent transparent; /*透明 灰 透明 透明 */
  margin: 40px auto;
  position: absolute;
  right: 0px;
  top: -15px;
}
.passport-iconCls {
  max-width: 32px;
  max-height: 32px;
}
.passport-message-circle {
  position: absolute;
  background-color: #ee736d;
  min-width: 18px;
  min-height: 18px;
  border-radius: 18px;
  top: 0;
  right: 7px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
}
</style>
