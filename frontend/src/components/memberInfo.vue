<template>
    <div class="member-basic">
        <div class="avatar-wrap">
            <img src="/member.svg" alt="avatar">
        </div>
        <span class="phInnerText">馬桶王</span>
    </div>
    <div class="member-info">
        <div class="input-wrap" v-for="(item, index) in memberInfo" :key="index">
            <label class="phMarkText">{{ item.label }}：</label>
            <input :readonly="!editing" class="phMarkText member-input" :placeholder="item.data"
                v-show="!editing"></input>
            <input type="text" class="phMarkText member-input-modify" v-model="item.data" v-show="editing">
        </div>
        <div class="btn-wrap" style="z-index: 10;">
            <button class="phMarkText editing-btn" v-show="!editing" @click="toggleToModify">修改資料</button>
            <button class="phMarkText editing-btn" v-show="editing" @click="saveEditing">儲存修改</button>
            <button class="phMarkText editing-btn" @click="toggleToModify" v-show="editing">取消修改</button>
            <button class="phMarkText editing-btn" v-show="!editing">修改密碼</button>
        </div>
    </div>
</template>

<script setup>
import { getAuth, updateProfile, verifyBeforeUpdateEmail, updateEmail, reauthenticateWithCredential, EmailAuthProvider, signOut } from "firebase/auth";
import { onMounted, ref } from "vue";
import { useRouter } from 'vue-router';

const auth = getAuth();
const user = auth.currentUser;
const router = useRouter();
console.log(user)

const memberInfo = ref([
    { label: 'name', data: '' },
    { label: 'email', data: '' },
    { label: 'password', data: '' },
])

onMounted(() => {
    if (user) {
        memberInfo.value.forEach(item => {
            switch (item.label) {
                case 'name':
                    item.data = user.displayName;
                    break;
                case 'email':
                    item.data = user.email;
                    break;
                // case 'password':
                //     item.data = '******';
                //     break;
            }
        })
    }
})

const editing = ref(false);
const toggleToModify = () => {
    editing.value = !editing.value;
}

//敏感資料修改時，要重新取得user的驗證
async function reAuth(email, password) {
    try {
        // const auth = getAuth();
        // const user = auth.currentUser;
        const credential = EmailAuthProvider.credential(email, password);
        await reauthenticateWithCredential(user, credential);
        return true
    } catch (e) {
        return null
    }
}

//更新email並同步發驗證信
async function modifyEmail() {
    const auth = getAuth();
    const user = auth.currentUser;
    const actionCodeSettings = {
        //點完驗證連結後跳轉的網址
        url: 'https://doraemon-dbbf0.web.app/member/info',
        // url: 'http://localhost:5173/member/info',
        handleCodeInApp: true,
    }
    try {
        //新的email要到更新後的信箱重新驗證
        await verifyBeforeUpdateEmail(user, memberInfo.value[1].data, actionCodeSettings)
        console.log(user);
        console.log(memberInfo.value[1]);
        await updateEmail(user, memberInfo.value[1].data);
    } catch (e) {
        if (e.code === 'auth/operation-not-allowed') {
            alert('修改成功，請至信箱完成驗證');
            signOut(auth);
            router.push('/');
        } else {
            console.error('email修改失敗：', e.message);
        }
    }
}

const saveEditing = async () => {
    try {
        const email = user.email;
        const password = memberInfo.value.find(item => item.label === 'password').data;
        await reAuth(email, password);
        console.log('here');

        // 更新displayname
        const displayName = memberInfo.value.find(item => item.label === 'name').data;
        await updateProfile(user, { displayName: displayName })
        console.log("Profile updated successfully");
        console.log(memberInfo.value[0]);

        //更新email
        await modifyEmail();
    } catch (e) {
        console.error('修改失敗：', e);
    }

}


</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/memberInfo";
</style>