<template>
    <div class="member-basic">
        <div class="avatar-wrap">
            <img src="/member.svg" alt="avatar">
        </div>
        <span class="phInnerText">馬桶王</span>
    </div>
    <div class="member-info">
        <div class="input-wrap" v-for="(item, index) in memberInfo" :key="index">
            <input type="text" :readonly="lockInput" :placeholder=item.label class="phMarkText member-input" v-model="item.data">
            <button @click="toggleToModify">
                <img src="/pencil.png" alt="modify">
            </button>
        </div>
        <p style="z-index: 10;">修改密碼</p>
    </div>
</template>

<script setup>
import { getAuth } from "firebase/auth";
import { onMounted,ref } from "vue";
const auth = getAuth();
const user = auth.currentUser;
console.log(user)

const memberInfo = ref([
    {label:'name', data:''},
    {label:'email', data:''},
    // {label:'password', data:''},
])

onMounted(()=>{
    if(user){
        memberInfo.value.forEach(item=>{
            switch (item.label){
                case 'name':
                    item.data = user.displayName;
                    break;
                case 'email':
                    item.data = user.email;
                    break;
            }
        })
    }
})

const lockInput = ref(true);
const toggleToModify = ()=>{
    lockInput.value = !lockInput.value;
}

</script>

<style lang="scss" scoped>
    @import "@/assets/scss/components/memberInfo";
</style>