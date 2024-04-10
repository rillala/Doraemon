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
              <button class="submenu-btn phMarkText " @click="navigatePost('LivingRoom')">客廳</button>
            </li>
            <li>
              <button class="submenu-btn phMarkText " @click="navigatePost('Bathroom')">廚房</button>
            </li>
            <li>
              <button class="submenu-btn phMarkText " @click="navigatePost('Bedroom')">房間</button>
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
            <div class="icon-wrap"><img src="/kitchen.svg" alt="message"></div>
          </RouterLink>
        </li>
        <li class="nav-icon" @click="toggleSignModal()"  v-show="!isSignin">
          <div class="icon-wrap"><img src="/member.svg" alt="member"></div>
        </li>
        <li class="nav-icon" @click="toggleSubMenu('member')"  v-show="isSignin">
          <ul class="submenu-wrap" v-show="subMenuStatus.member">
            <li>
              <button class="submenu-btn phMarkText" @click="navigateMember('profile')">資料</button>
            </li>
            <li>
              <button class="submenu-btn phMarkText" @click="navigateMember('post')">發文</button>
            </li>
            <li>
              <button class="submenu-btn phMarkText" @click="navigateMember('save')">收藏</button>
            </li>
            <li>
              <button class="submenu-btn phMarkText" @click="signout()">登出</button>
            </li>
          </ul>
          <div class="icon-wrap"><img src="/member.svg" alt="member"></div>
        </li>
      </ul>
    </div>
  </nav>
  <div class="sign-wrap" v-show="signModalStatus">
    <div class="sign-bg" @click="toggleSignModal()">
      <div class="sign-modal" @click.stop>
        <div class="sign-close" @click="toggleSignModal()"><i class="fa-solid fa-x fa-lg" style="color: #ffffff;"></i></div>
        <label class="sign-switch">
          <input type="checkbox" v-model="isChecked">
          <span class="switch-left">登入</span>
          <span class="switch-right">註冊</span>
        </label>
        <div class="sign-outer" ref="signOuter">
          <div class="sign-row" :style="{ transform: `translateX(-${offset}px)` }">
            <div class="signin">
              <input class="sign-input phMarkText" type="text" placeholder="mail" v-model="signinForm.mail">
              <input class="sign-input phMarkText" type="text" placeholder="password" v-model="signinForm.password">
              <span class="sign-forget pcMarkText">忘記密碼？</span>
              <button class="sign-btn phInnerText" @click="signin()">登入</button>
              <button class="othersign-btn phInnerText">Ｇoogle登入</button>
            </div>
            <div class="signup">
              <input class="sign-input phMarkText" type="text" placeholder="name" v-model="signupForm.name">
              <input class="sign-input phMarkText" type="text" placeholder="mail" v-model="signupForm.mail">
              <input class="sign-input phMarkText" type="text" placeholder="password" v-model="signupForm.password">
              <button class="sign-btn phInnerText" @click="singup()">註冊</button>
              <button class="othersign-btn phInnerText">Ｇoogle註冊</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref,onMounted,watch } from "vue";
import { useRouter } from 'vue-router';

//submenu按鈕
const subMenuStatus = ref({
  message:false,
  member:false
});
const toggleSubMenu = (subMenu)=>{
  subMenuStatus.value[subMenu] = !subMenuStatus.value[subMenu] 
};
//登入註冊燈箱
const signModalStatus = ref(false);
const toggleSignModal = ()=>{
  signModalStatus.value = !signModalStatus.value;
}

const router = useRouter();
const navigatePost = (post_class_name)=>{
  router.push({name:'message',params:{post_class_name}})
};
const navigateMember = (content) => {
  router.push({ name: 'member', params: { content } });
};

//登入註冊切換，用carousel的方法寫
const isChecked = ref(false);
const offset = ref(0);
const signOuter = ref(null);

const switchSign = ()=>{
  if(signOuter.value){
    const widthItem = signOuter.value.offsetWidth;
    offset.value = isChecked.value ? widthItem : 0;
  }
}
watch(isChecked, ()=>{
  switchSign();
})

onMounted(()=>{
  switchSign();
})




import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword,onAuthStateChanged,signOut} from "firebase/auth";
//composition API中的ref會和firebase中的ref衝突，因此另外給名稱
import { getDatabase, ref as firebaseRef, set ,update, push ,child} from "firebase/database";

//使用firebase auth驗證, 成功後儲存資料到realtime database
const auth = getAuth();
const db = getDatabase();

//註冊
const signupForm = ref({
  name:'',
  mail:'',
  password:'',
})

const singup = ()=>{
  createUserWithEmailAndPassword(auth,signupForm.value.mail,signupForm.value.password)
    .then((userCredential)=>{
      const user = userCredential.user;

      //寫入資料到realtime database
      set(firebaseRef(db,'users/' + user.uid),{
        username:signupForm.value.name,
        email:signupForm.value.mail,
      })
      console.log(user.uid);
      console.log(signupForm.value);
    })
    .catch((error)=>{
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(errorCode,errorMessage);
    })
}


//登入
const signinForm = ref({
  mail:'',
  password:''
});

const signin = ()=>{
  signInWithEmailAndPassword(auth,signinForm.value.mail,signinForm.value.password)
  .then((userCredential)=>{
    const user = userCredential.user;
    alert('登入成功');
    signModalStatus.value = false;
    router.push('/member');
  })
  .catch((error)=>{
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error(errorCode,errorMessage);
  })
};

// 判斷是否登入，true可以click會員子選單,false可以click signform
const isSignin = ref(false);
onMounted(()=>{
  onAuthStateChanged(auth,(user)=>{
    isSignin.value = !!user;
  })
});

//登出
const signout = ()=>{
  signOut(auth).then(()=>{
    router.push('/');
  }).catch((error)=>{
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error(errorCode,errorMessage);
  })
}

</script>

<style lang="scss" scoped>
  @import "@/assets/scss/components/mainHeader";
</style>
