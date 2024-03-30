<script setup>
import { RouterLink, RouterView } from "vue-router";
import loading from "@/components/loading.vue";
import MainHeader from "./components/MainHeader.vue";

// 以下做loading畫面用

import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
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
  <MainHeader/>
  <div v-if="isLoading" id="app-loading"><loading /></div>
  <RouterView v-else />
</template>

<style lang="scss" scoped></style>
