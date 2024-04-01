<script setup>
import { ref, onMounted, computed } from "vue";
import { RouterLink, RouterView, useRouter, useRoute } from "vue-router";
import loading from "@/components/loading.vue";
import MainHeader from "./components/MainHeader.vue";

// 判斷是前台還是後臺, 後台的話不顯示nav
// 使用 useRoute 鉤子來獲取當前路由信息
const route = useRoute();
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
  setLoading(false);
};

onMounted(() => {
  router.beforeEach(beforeRouteChange);
  router.afterEach(afterRouteChange);
});
</script>

<template>
  <MainHeader v-if="isActive" />
  <div v-if="isLoading" id="app-loading"><loading /></div>
  <RouterView v-else />
</template>

<style lang="scss" scoped></style>
