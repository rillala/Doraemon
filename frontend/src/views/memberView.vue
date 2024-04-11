<template>
  <main>
    <div class="wrap" >
      <RouterView></RouterView>
    </div>
  </main>
</template>

<script setup>
  import { RouterView } from 'vue-router';


</script>
<style lang="scss" scoped>
main {
  width: 100dvw;
  // height: 100dvh;
  height: 100%;
  margin: -8px;
  background: $primaryColorGreen;
  background-image: url("https://www.transparenttextures.com/patterns/grid-me.png");
  padding: 40px 20px 80px;
}
.wrap {
  max-width: 360px;
  margin: auto;
  //height: calc(100svh - 60px);
  //margin:0 auto 60px;
}
</style>
