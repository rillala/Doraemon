<script setup>
import { ref, onMounted, computed } from "vue";
import { RouterLink, RouterView, useRouter, useRoute } from "vue-router";
import loading from "@/components/loading.vue";
import MainHeader from "./components/MainHeader.vue";

// 判斷是前台還是後臺, 後台的話不顯示nav
// 使用 useRoute 鉤子來獲取當前路由信息
const route = useRoute();
// const excludedRoutes = ["/admin", "/manage", "/"]; //之後 home 不用顯示 menu 要換成這個
const excludedRoutes = ["/admin", "/manage"];

const isActive = computed(() => !excludedRoutes.includes(route.path));

// 以下做loading畫面用
const isLoading = ref(false);
const router = useRouter();

const setLoading = (loading) => {
  isLoading.value = loading;
};

const beforeRouteChange = () => {
  setLoading(true);
};

const afterRouteChange = () => {
  // 使用 setTimeout 延遲設定 isLoading 為 false
  setTimeout(() => {
    setLoading(false);
  }, 1500); // 延遲 2000 毫秒，即 2 秒
};

onMounted(() => {
  router.beforeEach(beforeRouteChange);
  router.afterEach(afterRouteChange);
});
</script>

<template>
  <MainHeader v-if="isActive" />
  <div v-if="isLoading" id="app-loading"><loading /></div>
  <RouterView id="main-view-app" />
</template>

<style lang="scss" scoped>
// 避免被 nav 蓋掉所以增加下面
#main-view-app {
  margin-bottom: 80px;
}
</style>
