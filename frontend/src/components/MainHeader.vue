<script setup></script>

<template>
  <nav>
    <div class="nav-wrap">
      <ul class="nav-row">
        <li class="nav-icon">
          <RouterLink to="/">
            <div class="icon-wrap">
              <img src="/home.svg" alt="home">
            </div>
          </RouterLink>
        </li>
        <li class="nav-icon" @click="toggleSubMenu('message')">
          <ul class="submenu-wrap" v-show="subMenuStatus.message">
            <li>
              <button class="submenu-btn" @click="navigatePost('LivingRoom')">客廳</button>
            </li>
            <li>
              <button class="submenu-btn" @click="navigatePost('Bathroom')">廁所</button>
            </li>
            <li>
              <button class="submenu-btn" @click="navigatePost('Bedroom')">房間</button>
            </li>
          </ul>
          <div class="icon-wrap">
            <img src="/chat.svg" alt="message">
          </div>
        </li>
        <li class="nav-icon addFile">
          <div class="icon-wrap" ><img class="addIcon" src="/add.svg" alt="addFile"></div>
          <input class="addInput" type="file">
        </li>
        <li class="nav-icon">
          <RouterLink to="/game">
            <div class="icon-wrap"><img src="/toliet.svg" alt="message"></div>
          </RouterLink>
        </li>
        <li class="nav-icon" @click="toggleSubMenu('member')">
          <ul class="submenu-wrap" v-show="subMenuStatus.member">
            <li>
              <button class="submenu-btn">資料</button>
            </li>
            <li>
              <button class="submenu-btn">發文</button>
            </li>
            <li>
              <button class="submenu-btn">收藏</button>
            </li>
          </ul>
          <div class="icon-wrap"><img src="/member.svg" alt="member"></div>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from 'vue-router';

const subMenuStatus = ref({
  message:false,
  member:false
});
const toggleSubMenu = (subMenu)=>{
  subMenuStatus.value[subMenu] = !subMenuStatus.value[subMenu] 
};

const router = useRouter();
const navigatePost = (post_class_name)=>{
  router.push({name:'message',params:{post_class_name}})
};

</script>

<style lang="scss" scoped>
  @import "@/assets/scss/components/mainHeader";
</style>
