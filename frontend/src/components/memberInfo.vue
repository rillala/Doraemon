<template>
    <div class="member-basic">
        <div class="avatar-wrap">
            <div class="img-wrap">
                <img v-if="imageURL" :src="imageURL" :style="{ width: '100%', height: '100%' }">
                <img src="/member.svg" alt="avatar" :style="{ display: imageURL == null ? 'block' : 'none' }">
            </div>
            <input type="file" class="theFile" @change="fileChange">
        </div>
        <span class="phInnerText">{{ memberInfo[0].data }}</span>
    </div>
    <div class="member-info">
        <div class="input-wrap" v-for="(item, index) in memberInfo" :key="index">
            <label class="phMarkText">{{ item.label }}：</label>
            <input :type="item.type || 'text'" class="phMarkText member-input" :value="item.data" v-show="!item.editing"
                readonly>
            <input :type="item.type || 'text'" class="phMarkText member-input-modify" :placeholder="item.placeholder"
                v-show="item.editing" v-model="item.data">
            <input type="password" class="phMarkText member-input-modify" placeholder="請輸入原有密碼" v-model="oldPassword"
                v-show="item.editing && (item.label == '信箱' || item.label == '密碼')">
            <div class="modify-btn-wrap" v-show="!item.editing" @click="toggleToModify(item.label)">
                <img src="../../public/pencil.png" alt="修改資料">
            </div>
            <div class="save-btn-wrap" v-show="item.editing" style="display: flex;">
                <i class="fa-solid fa-check fa-xl save-btn" @click="saveEditing(item.label)"></i>
                <i class="fa-solid fa-xmark fa-xl save-btn" @click="toggleToModify(item.label)"></i>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from 'vue-router';
import { 
    getAuth, 
    updateProfile, 
    verifyBeforeUpdateEmail, 
    updateEmail, 
    reauthenticateWithCredential, 
    EmailAuthProvider, 
    signOut, 
    updatePassword,
} from "firebase/auth";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL, } from 'firebase/storage';

const auth = getAuth();
const user = auth.currentUser;
const router = useRouter();

const toggleToModify = (label) => {
    //檢查是不是用email登入
    const isEmailLogin = user.providerData.some(p=>p.providerId === 'password');
    //email登入的才能修改memberInfo
    if(isEmailLogin){
        const item = memberInfo.value.find(i => i.label == label)
        if (item) {
            item.editing = !item.editing;
        }
    }else{
        alert('使用google登入，請至google帳號修改個人資訊');
    }
}

const memberInfo = ref([
    { label: '名字', data: user.displayName, placeholder: '請輸入名字', editing: false },
    { label: '信箱', data: user.email, placeholder: '請輸入email', type: 'email', editing: false },
    { label: '密碼', data: '', placeholder: '請輸入新密碼', type: 'password', editing: false },
])


//根據傳入的label判斷是哪個欄位需要修改
const saveEditing = async (label) => {
    try {
        const item = memberInfo.value.find(i => i.label == label)
        switch (label) {
            case '名字':
                await modifyName(item);
                break;
            case '信箱':
                await modifyEmail(item);
                break;
            case '密碼':
                await modifyPassword(item);
                break;
            default:
                console.error('未識別的標籤')
        }
    } catch (e) {
        console.error('修改失敗：', e);
    }
}

const oldPassword = ref('');

//敏感資料(eamil,password)修改時，要重新取得user的驗證
async function reAuth() {
    //剛登入時可以不用經過credential就修改，加入判斷強制取得
    if (!oldPassword.value) {
        alert('請輸入原有密碼');
        return false;
    }
    try {
        const credential = EmailAuthProvider.credential(user.email, oldPassword.value);
        await reauthenticateWithCredential(user, credential);
        return true;
    } catch (e) {
        alert('密碼錯誤');
        return false;
    }
}
//修改displayName
async function modifyName(item) {
    await updateProfile(user, { displayName: item.data });
    alert('名字更新成功');
    item.editing = false;
}

//修改email並同步發驗證信
async function modifyEmail(item) {
    const actionCodeSettings = {
        //點完驗證連結後跳轉的網址
        url: 'https://doraemon-dbbf0.firebaseapp.com/member/info',
        // url: 'http://localhost:5173/member/info',
        handleCodeInApp: true,
    }
    const authSuccess = await reAuth();
    if (!authSuccess) {
        return;
    }
    try {
        //新的email要到更新後的信箱重新驗證
        await verifyBeforeUpdateEmail(user, item.data, actionCodeSettings)
        await updateEmail(user, item.data);
        item.editing = false;
    } catch (error) {
        const errorCode = error.code;
        switch (errorCode) {
            case 'auth/operation-not-allowed':
                alert('修改成功，請至信箱完成驗證');
                signOut(auth);
                router.push('/');
                break;
            case 'auth/requires-recent-login':
                alert('請輸入密碼完成修改');
                break;
            default:
                console.error('email修改失敗：', errorCode, error.message);
        };
    }
}
//修改password(在登入狀態下)
async function modifyPassword(item) {
    const authSuccess = await reAuth();
    if (!authSuccess) {
        return;
    }
    try {
        await updatePassword(user, item.data);
        alert('密碼更新完成，請重新登入');
        signOut(auth);
        router.push('/');
        item.editing = false;
    } catch (error) {
        const errorCode = error.code;
        if (errorCode == 'auth/weak-password') {
            alert('密碼請設定6個字以上');
        } else {
            console.error('修改失敗：', e);
        }
    }
}

//修改會員大頭貼，存在storage中
const imageURL = ref('' || user.photoURL);

//使用storage
const storage = getStorage();
//修改大頭貼
const fileChange = async (e) => {
    if(user){
        //抓到上傳的文件
        const file = e.target.files[0];
        //上傳文件的路徑以uid顯示，上傳新的會把舊的蓋掉
        const fileRef = storageRef(storage, `avatars/${user.uid}`);
        
        try{
            //上傳照片
            const snapshot = await uploadBytes(fileRef,file);
            //抓到上傳照片的URL(下載它的數據)
            const photoURL = await getDownloadURL(snapshot.ref);
            //寫進user的photoURL中
            await updateProfile(user,{photoURL:photoURL})
            //更新畫面
            imageURL.value = photoURL;
            console.log(user.photoURL);
        }catch(error){
            console.error(error);
        }
    }
};

</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/memberInfo";
</style>