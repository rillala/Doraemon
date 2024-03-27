<script setup>
import { ref, defineEmits } from "vue";
import { Menu } from "ant-design-vue";
import { CaretDownOutlined } from "@ant-design/icons-vue";

const menuList = ref([
  {
    menuTitle: "後臺首頁",
  },
  {
    menuTitle: "管理員管理",
  },
  {
    menuTitle: "會員管理",
  },
]);

const currentPage = ref("後臺首頁");
const openKeys = ref(["0"]);
const emit = defineEmits(["updateView"]);

function changeManage(index) {
  currentPage.value = menuList.value[index].menuTitle;
  emit("updateView", index);
  openKeys.value = [];
}
</script>

<template>
  <main>
    <Menu :openKeys="openKeys" :selectedKeys="[]" mode="inline" id="admin_menu">
      <Menu.SubMenu key="sub" class="pcSmTitle">
        <template #title>{{ currentPage }}</template>
        <Menu.Item
          v-for="(page, index) in menuList"
          :key="index"
          @click="changeManage(index)"
          class="pcInnerText"
          >{{ page.menuTitle }}</Menu.Item
        >
      </Menu.SubMenu>
    </Menu>
  </main>
</template>

<style lang="scss">
/* 確保 Menu 組件的父容器有相對定位 */
#admin_menu {
  position: relative;
  background: $primaryColorBrown;
  border: 0;
  text-align: center;
  color: #fff;
}

/* 針對子選單的樣式調整 */
ul.ant-menu-sub {
  position: absolute;
  width: 100%;
  z-index: 500;
  background: $bgColorGray !important;
}

li.ant-menu-item.ant-menu-item-only-child {
  background: $primaryColorBrown;
  padding: 0 0 0 60px !important;
  text-align: left;
}

span.ant-menu-title-content {
  color: #fff;
}
</style>
