<template>
    <main>
        <div class="wrap">
            <div class="post-wrap">
                <div class="img-wrap">
                    <img :src=imgSrc>
                </div>
                <textarea cols="20" rows="8" class="pcMarkText" placeholder="想說什麼呢？"></textarea>
                <!-- <label for="" class="phInnerText">選擇地點
                    <input type="text" class="pcMarkText">
                </label> -->
                <div class="class-wrap">
                    <span class="phMarkText">選擇分類</span>
                    <button class="phMarkText class-btn">客廳</button>
                    <button class="phMarkText class-btn">廁所</button>
                    <button class="phMarkText class-btn">房間</button>
                </div>
            </div>
            <button class="sent-btn">
                <div class="sent-icon"><img src="/send.svg" alt=""></div>
            </button>
        </div>
    </main>
</template>

<script setup>
import { useImageStore } from '@/stores/image';
import { computed } from 'vue';

const ImageStore = useImageStore();
const imgSrc = computed(()=>ImageStore.previewImage)

</script>
<style lang="scss" scoped>
@import "@/assets/scss/page/postMessage.scss";
</style>