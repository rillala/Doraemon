<script setup>
import { ref } from "vue";
import moment from "moment";

const currentTime = ref(getTime());

function getTime() {
  return moment().format("l") + "  " + moment().format("LT");
}

function updateTime() {
  currentTime.value = getTime();
}

const intervalId = setInterval(updateTime, 1000);

// 抓取目前會員人數
const memberNum = ref("0");
</script>

<template>
  <main>
    <div class="pcSmTitle">現在時刻<br />{{ currentTime }}</div>
    <div class="pcSmTitle">
      目前會員人數統計: <span class="primaryColorPink">{{ memberNum }}</span> 人
    </div>

    <div id="member_chart"></div>
    <p class="pcMarkText">歷史會員人數統計表</p>
  </main>
</template>

<style lang="scss" scoped>
main {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

#member_chart {
  width: 250px;
  height: 250px;
  border: 1px solid #000;
}
</style>
