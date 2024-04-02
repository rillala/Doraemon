<script setup>
import { Input, Table, Descriptions, Button } from "ant-design-vue";
import { EyeOutlined, CloseOutlined } from "@ant-design/icons-vue";
import { ref, onMounted, watch } from "vue";
import apiInstance from "@/plugins/auth";

// 搜尋框
const value = ref("");

watch(value, (newValue) => {
  if (newValue == "") {
    console.log("newValue為空值");
    displayList.value = managerList.value;
  }
});

function onSearch(searchValue) {
  console.log("use value", searchValue);
  console.log("or use this.value", value.value);

  displayList.value = managerList.value.filter((item) => {
    return (
      item.name.includes(searchValue) ||
      item.id.toString().includes(searchValue)
    );
  });
}

// Ant Design Table 組件的設定
const columns = [
  {
    title: "編號",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "名稱",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "狀態",
    dataIndex: "status",
    key: "status",
    slots: { customRender: "status" },
  },
  {
    title: "查看",
    key: "check",
    slots: { customRender: "action" },
  },
];

// fake manager list
const displayList = ref([]);
const managerList = ref([
  {
    id: 1,
    name: "John Doe1",
    account: "dora",
    psw: "123",
    status: "0",
  },
  {
    id: 2,
    name: "John Doe2",
    account: "dora",
    psw: "123",
    status: "0",
  },
  {
    id: 3,
    name: "John Doe3",
    account: "dora",
    psw: "123",
    status: "0",
  },
]);

function getManager() {
  apiInstance
    .get("api")
    .then((response) => {
      response.data = displayList.value;
      // 給予套組陣列初始值
      displayList.value = managerList.value;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

const infoBox = ref({});
const showInfoBox = ref(false);

function showInfo(currentId) {
  let currentInfo = managerList.value.find((item) => item.id == currentId);

  if (currentInfo) {
    infoBox.value = currentInfo;
    showInfoBox.value = true;
  }
}

function changeStatue(currentId) {
  let currentIndex = parseInt(currentId) - 1;
  if (confirm(`確定要更改${managerList.value[currentIndex].name}的狀態?`)) {
    console.log(currentId);

    //這邊先假的修改
    let currentStatue = managerList.value[currentIndex].status;
    let newStatue;

    if (currentStatue == 0) {
      newStatue = 1;
    } else {
      newStatue = 0;
    }
    managerList.value[currentIndex].status = newStatue;

    //修改管理員狀態, 這邊之後記得接資料庫
    displayList.value = managerList.value;
    showInfo(currentId);
  }
}

// 元件初始的時候執行
onMounted(() => {
  // getManager();
  displayList.value = managerList.value;
});
</script>

<template>
  <main>
    <Input.Search
      id="manage-search"
      v-model:value="value"
      placeholder="請輸入管理員名稱或編號"
      style="display: block; max-width: 300px; margin: 0 auto 20px"
      @search="onSearch"
    />

    <div id="manager-table" v-if="!showInfoBox">
      <Table :columns="columns" :data-source="displayList">
        <!-- 狀態列 -->
        <template v-slot:status="{ text }">
          <span>{{ text == 0 ? "啟用" : "停用" }}</span>
        </template>
        <!-- 查看列 -->
        <template v-slot:action="{ record }">
          <EyeOutlined @click="showInfo(record.id)" />
        </template>
      </Table>
    </div>
    <!--查看燈箱-->
    <div id="manager-info-box" v-if="showInfoBox">
      <CloseOutlined id="box-closed" @click="showInfoBox = false" />
      <Descriptions
        :title="infoBox.name"
        bordered
        :column="{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }"
      >
        <Descriptions.Item label="編號">{{ infoBox.id }}</Descriptions.Item>
        <Descriptions.Item label="狀態" class="statue-cell"
          >{{ infoBox.status == 0 ? "啟用" : "停用" }}
          <Button type="default" @click="changeStatue(infoBox.id)">{{
            infoBox.status == 0 ? "停用" : "啟用"
          }}</Button>
        </Descriptions.Item>
        <Descriptions.Item label="帳號">{{
          infoBox.account
        }}</Descriptions.Item>
        <Descriptions.Item label="密碼">{{ infoBox.psw }}</Descriptions.Item>
      </Descriptions>
    </div>
  </main>
</template>

<style lang="scss" scoped>
#manager-info-box {
  position: relative;
  width: 100%;
  padding: 20px;
  background: #fff;

  #box-closed {
    position: absolute;
    top: 0;
    right: 10px;
    padding: 5px;

    &:hover {
      background: $bgColorGray;
    }
  }
}

#status-btn {
  margin-left: 10px;
  padding: 5px;
  background: red;
  cursor: pointer;
}
</style>
