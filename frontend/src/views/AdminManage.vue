<script setup>
import Submenu from "@/components/admin/menu.vue";
import MainView from "@/components/admin/main.vue";
import ManagerView from "@/components/admin/manager.vue";
import MemberView from "@/components/admin/member.vue";
import { ref } from "vue";

const currentView = ref("0");

function changeView(index) {
  // console.log(index);
  currentView.value = index;
  // console.log(currentView.value);
}
</script>

<template>
  <main>
    <Submenu @updateView="changeView" />
    <div class="wrap">
      <MainView v-if="currentView == 0" />
      <ManagerView v-else-if="currentView == 1" />
      <MemberView v-else />
    </div>
  </main>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/main.scss";

.wrap {
  max-width: 360px;
  height: calc(100svh - 50px);
  margin: auto;
  padding-top: 40px;
}
</style>
