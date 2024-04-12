<script setup>
import {
  ref,
  onMounted,
  watch,
  onUnmounted,
  registerRuntimeCompiler,
} from "vue";
import { Button, Input, Space } from "ant-design-vue";
import {
  UserOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons-vue";
import { db } from "@/firebaseConfig";
import { collection, onSnapshot, query, doc } from "firebase/firestore";
import { useRouter } from "vue-router";

const router = useRouter();

// 獲取管理員資料
const managerList = ref([]);
let getManagerData;

onMounted(async () => {
  //組件掛載完成時
  const lastestQuery = query(collection(db, "admin_manager"));

  getManagerData = onSnapshot(lastestQuery, (snapshot) => {
    //監聽即時資料更新
    let originalList = snapshot.docs.map((doc) => ({ ...doc.data() }));

    managerList.value = originalList.filter((item) => item.status !== false);
  });
});

onUnmounted(() => {
  //組件被銷毀時
  if (getManagerData) {
    getManagerData(); // 停止監聽資料
  }
});

// 管理員資料驗證

const managerAcc = ref("");
const managerPsw = ref("");

function checkLogin() {
  console.log(managerAcc.value);
  console.log(managerPsw.value);

  if (managerAcc.value !== "" && managerPsw.value !== "") {
    // 確認是否有此帳號
    let index = managerList.value.findIndex((item) => {
      return item.account.includes(managerAcc.value);
    });

    if (index !== -1) {
      console.log(managerList.value[index].psw);
      console.log(managerPsw.value);

      // 確認密碼是否和 此帳號的密碼 相同
      if (managerList.value[index].psw === managerPsw.value) {
        // 成功即跳轉頁面
        console.log("密碼匹配，進行下一步操作");
        sessionStorage.setItem("admin", "true");
        router.push("/manage");
      } else {
        // 如果密碼不匹配
        // 失敗就提示警告訊息 並清空輸入框
        alert("輸入密碼錯誤！");
        managerAcc.value = "";
        managerPsw.value = "";
        return;
      }
    } else {
      // 沒有找到符合條件的物件
      // 失敗就提示警告訊息 並清空輸入框
      alert("不存在此帳號！");
      managerAcc.value = "";
      managerPsw.value = "";
      return;
    }
  } else {
    alert("請輸入帳號和密碼！");
  }
}
</script>

<template>
  <main>
    <div class="wrap">
      <h1 class="pcBigTitle">哆啦a夢<br />網站後臺入口</h1>
      <Input
        class="input btn"
        placeholder="請輸入管理員帳號"
        @input="managerAcc = $event.target.value"
      >
        <template #prefix>
          <UserOutlined type="user" />
        </template>
      </Input>
      <Input.Password
        class="input btn"
        placeholder="請輸入管理員密碼"
        @input="managerPsw = $event.target.value"
      />
      <Button class="btn pcInnerText" type="default" @click="checkLogin"
        >登入</Button
      >
      <RouterLink class="link pcMarkText" to="/">前台首頁</RouterLink>
    </div>
  </main>
</template>

<style lang="scss" scoped>
// @import "@/assets/scss/page/admin.scss";

main {
  width: 100svw;
  height: 100svh;
  // margin: -8px;
  background: $primaryColorBrown;
  background-image: url("https://www.transparenttextures.com/patterns/grid-me.png");
}

.wrap {
  width: 100%;
  max-width: 360px;
  margin: auto;
  padding: 80px 20px 20px;
  text-align: center;
  box-sizing: border-box;
}

h1 {
  margin-bottom: 60px;
  color: #fff;
}

.btn {
  width: 100%;
  margin: 0 auto 20px;
}

.input {
  border: 1px solid $bgColorGray;
  height: 36px;
  padding: 10px;
}

.link{
  text-decoration: none;
  color: #fff;
  cursor: pointer;
}
</style>
