<script setup>
import { Button, Input, Space } from "ant-design-vue";
import {
  UserOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons-vue";
</script>

<template>
  <main>
    <div class="wrap">
      <h1 class="pcBigTitle">哆啦a夢<br />網站後臺入口</h1>
      <Input class="input btn" placeholder="請輸入管理員帳號">
        <template #prefix>
          <user-outlined type="user" />
        </template>
      </Input>
      <Input.Password class="input btn" placeholder="請輸入管理員密碼" />
      <Button class="btn pcInnerText" type="default">登入</Button>
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
</style>
