<template>
  <main>
    <div class="wrap" >
      <RouterView />
    </div>
  </main>
</template>

<script setup>
  import { RouterView } from 'vue-router';


</script>
<style lang="scss" scoped>
main {
  width: 100%;
  background: $primaryColorGreen;
  background-image: url("https://www.transparenttextures.com/patterns/grid-me.png");
}
.wrap {
  max-width: 360px;
  height: calc(100svh - 60px);
  margin: auto;
  padding: 40px 20px;
  overflow-y: scroll;
}
::-webkit-scrollbar{
  width:5px;
  background-color:transparent;
  border-radius: 5px; 
}

::-webkit-scrollbar-thumb {
  background: rgba(234, 234, 235, 0.5);
  border-radius: 10px; 
}

</style>
