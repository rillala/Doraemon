<script setup>
import { Button } from "ant-design-vue";
import { ref, onMounted } from "vue";
import { getFirestoreData } from "@/firestore/getStore.js";

const documents = ref([]);

onMounted(async () => {
  try {
    const data = await getFirestoreData("test");
    documents.value = data;
    console.log(documents.value);
  } catch (error) {
    console.error("讀取數據失敗：", error);
  }
});
</script>

<template>
  <main>
    <Button type="primary">按鈕</Button>
    <div v-for="data in documents">
      <h1>{{ data.id }}</h1>
      <p>{{ data.title }}</p>
      <span>{{ data.info }}</span>
    </div>
  </main>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/page/notFound.scss";
</style>
