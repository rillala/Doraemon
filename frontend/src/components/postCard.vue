<template>
    <div class="card-wrap">
        <div class="card-top">
            <span class="pcMarkText">#tag</span>
            <div class="save-wrap" @click="toggleSave">
                <img src="/unsave.svg" alt="save" v-show="saveStatus == false">
                <img src="/save.svg" alt="save" v-show="saveStatus == true">
            </div>
        </div>
        <div class="card-title">
            <div class="avatar-wrap">
                <img src="https://fakeimg.pl/50x50/500">
                <!-- <img src="/member.svg" alt="avatar"> -->
            </div>
            <h1 class="phBigTitle">title</h1>
        </div>
        <div class="pic-wrap">
            <img src="https://fakeimg.pl/400x300/200">
            <!-- <img src="" alt=""> -->
        </div>
        <p class="pcMarkText">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis quod in recusandae consequatur magni reprehenderit amet cupiditate quibusdam sed eius asperiores voluptatibus deserunt atque iure quae iusto, impedit sequi ut.</p>
        <div class="card-bottom">
            <input type="text">
            <span class="pcMarkText more-comment" @click="toggleComment">查看留言<i class="fa-solid fa-angle-down fa-sm" style="color: #a3a3a3;"></i></span>
            <transition name="slide">
                <div class="comment-other" v-show="commentStatus">
                    <div class="avatar-wrap">
                        <img src="https://fakeimg.pl/50x50/200">
                    </div>
                    <p class="pcMarkText">Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio quas sit sint in.</p>
                </div>
            </transition>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";

const commentStatus = ref(false)
const toggleComment = ()=>{
    commentStatus.value = !commentStatus.value
}

const saveStatus = ref(false)
const toggleSave = ()=>{
    saveStatus.value = !saveStatus.value
}

</script>

<style lang="scss" scoped>
    @import "@/assets/scss/components/postCard.scss";  
</style>