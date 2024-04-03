<template>
    <div class="member-basic">
        <div class="avatar-wrap">
            <img src="/member.svg" alt="avatar">
        </div>
        <span class="phInnerText">馬桶王</span>
    </div>
    <div class="member-info">
        <div class="input-wrap">
            <input type="text" placeholder="name" class="phMarkText member-input">
            <button>
                <img src="/pencil.png" alt="modify">
            </button>
        </div>
        <div class="input-wrap">
            <input type="text" placeholder="passward" class="phMarkText member-input">
            <button>
                <img src="/pencil.png" alt="modify">
            </button>
        </div>
        <div class="input-wrap">
            <input type="text" placeholder="mail" class="phMarkText member-input">
            <button>
                <img src="/pencil.png" alt="modify">
            </button>
        </div>
    </div>
</template>

<script setup></script>

<style lang="scss" scoped>
    @import "@/assets/scss/components/memberInfo";
</style>