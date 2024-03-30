
<template>
  <main>
    <button class="map-view">
      <div class="icon-wrap">
        <img src="/map.svg" alt="map">
      </div>
    </button>
  </main>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { onMounted } from 'vue';

const route = useRoute();
const data = route.params.data; // 上面傳遞的參數,可能是a/b/c


// onMounted(() => {
//   // getData();
//   if (data.value === "a"){
//   displayList.value = 客廳的資料;
//   } else if (data.value === "b"){
//   displayList.value = 房間的資料;
//   } else {
//     displayList.value = 廁所的資料;
//   }
  
// });

</script>

<style lang="scss" scoped>
@import "@/assets/scss/page/message.scss";
</style>
