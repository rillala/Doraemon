<script setup>
import { Input, Table } from "ant-design-vue";
import { SmileOutlined, DownOutlined } from "@ant-design/icons-vue";
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

// fake manager list
const displayList = ref([]);
const managerList = ref([
  {
    id: 1,
    name: "John Doe",
    account: "dora",
    psw: "123",
    status: "0",
  },
  {
    id: 2,
    name: "John Doe",
    account: "dora",
    psw: "123",
    status: "0",
  },
  {
    id: 3,
    name: "John Doe",
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

// Ant Design Table 組件的設定
const columns = [
  {
    dataIndex: "name",
    key: "name",
    slots: {
      title: "customTitle",
      customRender: "name",
    },
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Tags",
    key: "tags",
    dataIndex: "tags",
    slots: {
      customRender: "tags",
    },
  },
  {
    title: "Action",
    key: "action",
    slots: {
      customRender: "action",
    },
  },
];

// 元件初始的時候執行
onMounted(() => {
  // getManager();
  displayList.value = managerList.value;
});
</script>

<template>
  <main>
    <Input.Search
      v-model:value="value"
      placeholder="請輸入管理員名稱或編號"
      style="width: 200px"
      @search="onSearch"
    />

    <Table :columns="columns" :data-source="data">
      <template #name="{ text }">
        <a>{{ text }}</a>
      </template>
      <template #customTitle>
        <span>
          <smile-outlined />
          Name
        </span>
      </template>
      <template #tags="{ text: tags }">
        <span>
          <a-tag
            v-for="tag in tags"
            :key="tag"
            :color="
              tag === 'loser'
                ? 'volcano'
                : tag.length > 5
                ? 'geekblue'
                : 'green'
            "
          >
            {{ tag.toUpperCase() }}
          </a-tag>
        </span>
      </template>
      <template #action="{ record }">
        <span>
          <a>Invite 一 {{ record.name }}</a>
          <a-divider type="vertical" />
          <a>Delete</a>
          <a-divider type="vertical" />
          <a class="ant-dropdown-link">
            More actions
            <down-outlined />
          </a>
        </span>
      </template>
    </Table>
  </main>
</template>

<style lang="scss" scoped>
div {
}
</style>
