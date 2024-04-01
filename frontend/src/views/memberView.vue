<template>
  <main>
    <div class="wrap">
      <memberInfo/>
    </div>
  </main>
</template>

<script setup>
  import memberInfo from "@/components/memberInfo.vue"  


</script>
<style lang="scss" scoped>
main {
  width: 100svw;
  height: 100svh;
  margin: -8px;
  background: $primaryColorGreen;
  background-image: url("https://www.transparenttextures.com/patterns/grid-me.png");
}
.wrap {
  max-width: 360px;
  //height: calc(100svh - 50px);
  margin: auto;
  padding: 40px 20px 0 20px;
}
</style>
