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
            <li v-for="(item, index) in messageMenu" :key="index">
              <button class="submenu-btn phMarkText " @click="navigatePost(item.class_name)">{{ item.label }}</button>
            </li>
          </ul>
          <div class="icon-wrap">
            <img src="/chat.svg" alt="message">
          </div>
        </li>
        <li class="nav-icon addFile">
          <div class="icon-wrap"><img class="addIcon" src="/add.svg" alt="addFile"></div>
          <input class="addInput" type="file">
        </li>
        <li class="nav-icon">
          <RouterLink to="/game">
            <div class="icon-wrap"><img src="/kitchen.svg" alt="message"></div>
          </RouterLink>
        </li>
        <li class="nav-icon" @click="toggleSignModal()" v-show="!isSignin">
          <div class="icon-wrap"><img src="/member.svg" alt="member"></div>
        </li>
        <li class="nav-icon" @click="toggleSubMenu('member')" v-show="isSignin">
          <ul class="submenu-wrap" v-show="subMenuStatus.member">
            <li v-for="(item, index) in memberMunu" :key="index">
              <RouterLink :to="item.route" class="submenu-link phMarkText">{{ item.label }}</RouterLink>
            </li>
            <li>
              <button class="submenu-btn phMarkText" @click="signout()">登出</button>
            </li>
          </ul>
          <div class="icon-wrap"><img src="/member.svg" alt="member"></div>
        </li>
        <li class="nav-icon">
          <RouterLink to="/admin">
            <p>後台</p>
            <!-- <div class="icon-wrap">
              <img src="/home.svg" alt="home">
            </div> -->
          </RouterLink>
        </li>
      </ul>
    </div>
  </nav>
  <div class="sign-wrap" v-show="signModalStatus">
    <div class="sign-bg" @click="toggleSignModal()">
      <div class="sign-modal" @click.stop>
        <div class="sign-close" @click="toggleSignModal()"><i class="fa-solid fa-x fa-lg" style="color: #ffffff;"></i>
        </div>
        <label class="sign-switch">
          <input type="checkbox" v-model="isChecked">
          <span class="switch-left">登入</span>
          <span class="switch-right">註冊</span>
        </label>
        <div class="sign-outer" ref="signOuter">
          <div class="sign-row" :style="{ transform: `translateX(-${offset}px)` }">
            <div class="signin">
              <input class="sign-input phMarkText" type="text" placeholder="email" v-model="signinForm.email">
              <input class="sign-input phMarkText" type="text" placeholder="password" v-model="signinForm.password">
              <span class="sign-forget pcMarkText" @click="toggleForgotEmail">忘記密碼？</span>

              <div class="sign-forgrt-wrap" v-show="forgotEmail.status">
                <input class="sign-input phMarkText" type="text" placeholder="請輸入email" v-model="forgotEmail.input">
                <button class="sign-btn phInnerText" v-show="forgotEmail.status" @click="forgotPassword"> 確認送出</button>
              </div>

              <div class="sign-btn-wrap" v-show="!forgotEmail.status">
                <button class="sign-btn phInnerText" @click="signin()">登入</button>
                <button class="othersign-btn phInnerText" @click="signGoogle">Ｇoogle登入</button>
              </div>

            </div>
            <div class="signup">
              <input class="sign-input phMarkText" type="text" placeholder="name" v-model="signupForm.name">
              <input class="sign-input phMarkText" type="text" placeholder="email" v-model="signupForm.email"
                @focus="cleansignupError">
              <small>{{ signupError.email }}</small>
              <input class="sign-input phMarkText" type="text" placeholder="password" v-model="signupForm.password"
                @focus="cleansignupError">
              <small>{{ signupError.password }}</small>
              <button class="sign-btn phInnerText" @click="singup()">註冊</button>
              <button class="othersign-btn phInnerText" @click="signGoogle">Ｇoogle註冊</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useRouter } from 'vue-router';
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  onAuthStateChanged, signOut,
  sendEmailVerification,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithRedirect,
  getRedirectResult
} from "firebase/auth";

//submenu狀態和導航
const router = useRouter();
const messageMenu = [
  { class_name: 'Bedroom', label: '房間' },
  { class_name: 'LivingRoom', label: '客廳' },
  { class_name: 'Bathroom', label: '廚房' },
]
const navigatePost = (post_class_name) => {
  router.push({ name: 'message', params: { post_class_name } })
};
const memberMunu = [
  { route: '/member/info', label: '資料' },
  { route: '/member/post', label: '發文' },
  { route: '/member/save', label: '收藏' }
];
const subMenuStatus = ref({
  message: false,
  member: false
});
const toggleSubMenu = (subMenu) => {
  subMenuStatus.value[subMenu] = !subMenuStatus.value[subMenu]
};
//登入註冊燈箱
const signModalStatus = ref(false);
const toggleSignModal = () => {
  signModalStatus.value = !signModalStatus.value;
}

//登入註冊切換，用carousel的方法寫
const isChecked = ref(false);
const offset = ref(0);
const signOuter = ref(null);

const switchSign = () => {
  if (signOuter.value) {
    const widthItem = signOuter.value.offsetWidth;
    offset.value = isChecked.value ? widthItem : 0;
  }
}
watch(isChecked, () => {
  switchSign();
})

onMounted(() => {
  switchSign();
})

//使用firebase auth驗證
const auth = getAuth();

//註冊
const signupForm = ref({
  name: '',
  email: '',
  password: '',
})
//註冊時的錯誤訊息
const signupError = ref({
  email: '',
  password: ''
});
const cleansignupError = () => {
  signupError.value = { email: '', password: '' }
}
const singup = () => {
  createUserWithEmailAndPassword(auth, signupForm.value.email, signupForm.value.password)
    .then((userCredential) => {
      const user = userCredential.user;
      //用mail註冊要另外把displayName存進去，使用updateProfile
      updateProfile(user, { displayName: signupForm.value.name })
        .then(() => {
          //驗證mail後才算註冊成功
          sendEmailVerification(user)
            .then(() => {
              alert('註冊成功，請檢查信件以完成驗證')
              signModalStatus.value = false;
              router.push('/member/info');
              cleanForm();
            }).catch((error => {
              console.error(error);
            }))
        }).catch((error) => {
          console.error(error);
        })
    })
    .catch((error) => {
      const errorCode = error.code;
      switch (errorCode) {
        case 'auth/invalid-email':
          signupError.value.email = '請輸入正確Email格式';
          break;
        case 'auth/email-already-in-use':
          signupError.value.email = '此Email已存在';
          break;
        case 'auth/weak-password':
          signupError.value.password = '密碼請設定6個字以上';
          break;
        default:
          console.error(errorCode, error.message);
      };
    })
}


//登入
const signinForm = ref({
  email: '',
  password: ''
});

const signin = () => {
  signInWithEmailAndPassword(auth, signinForm.value.email, signinForm.value.password)
    .then((userCredential) => {
      const user = userCredential.user;
      alert('登入成功');
      signModalStatus.value = false;
      router.push('/member/info');
      cleanForm();
    })
    .catch((error) => {
      const errorCode = error.code;
      alert('登入失敗，請再次確認帳號密碼')
    })
};

// 判斷是否登入，true可以click會員子選單,false可以click signform
const isSignin = ref(false);

onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    isSignin.value = !!user;
  })
});

//登出
const signout = () => {
  signOut(auth).then(() => {
    router.push('/');
  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error(errorCode, errorMessage);
  })
}

const cleanForm = () => {
  signupForm.value.name = '';
  signupForm.value.email = '';
  signupForm.value.password = '';
  signinForm.value.email = '';
  signinForm.value.password = '';
}

//忘記密碼
const forgotEmail = ref({ input: '', status: false });
const toggleForgotEmail = () => {
  forgotEmail.value.status = !forgotEmail.value.status;
}
const forgotPassword = () => {
  sendPasswordResetEmail(auth, forgotEmail.value.input)
    .then(() => {
      alert('請至信箱收件');
      location.reload();
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(errorCode, errorMessage);
    })
}

//google登入(到google登入頁面)
const signGoogle = async () => {
  const providerGoogle = new GoogleAuthProvider();
  try {
    await signInWithRedirect(auth, providerGoogle);
    
    // 抓取使用者資料
    const result = await getRedirectResult(auth);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const user = result.user;
  } catch (error) {
    console.error('Error Code:', error.code);
    console.error('Error Message:', error.message);
    if (error.customData && error.customData.email) {
      console.error('Email:', error.customData.email);
    }
    if (error.credential) {
      console.error('Credential:', GoogleAuthProvider.credentialFromError(error));
    }
  }
}

</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/mainHeader";
</style>
