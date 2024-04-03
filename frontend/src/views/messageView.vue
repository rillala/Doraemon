
<template>
  <main>
    <div class="wrap">
      <button class="map-view">
        <div class="icon-wrap">
          <img src="/map.svg" alt="map">
        </div>
      </button>
      <div v-for="item in 3">
        <postCard/>
      </div>
    </div>
  </main>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { onMounted } from 'vue';
import postCard from "@/components/postCard.vue"  

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
