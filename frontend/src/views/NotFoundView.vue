<script setup>
import { Button } from "ant-design-vue";
import { ref, onMounted } from "vue";
import { getFirestoreData } from "@/firestore/getStore.js";
import { addFirestoreData } from "@/firestore/addStore.js";
import { updateFirestoreData } from "@/firestore/updateStore.js";
import { deleteFirestoreData } from "@/firestore/deleteStore.js";

// 示範如何讀取 firestore 裡的數據
const documents = ref([]);

onMounted(async () => {
  try {
    const data = await getFirestoreData("test");
    documents.value = data;
    console.log(documents.value);
  } catch (error) {
    console.error("讀取數據失敗：", error);
  }
});

// 示範如何新增數據到 firestore
const dataToAdd = ref({
  title: "",
  info: "",
});

async function addData() {
  try {
    await addFirestoreData("test", dataToAdd.value);
    console.log("Data added successfully");
    dataToAdd.value.title = "";
    dataToAdd.value.info = "";
  } catch (error) {
    console.error("Failed to add data: ", error);
  }
}

// 示範如何更新 firestore 中的數據

const updateId = ref(""); // 需要更新的文档ID
const updatedData = ref({
  title: "",
  info: "",
});

async function updateData() {
  try {
    await updateFirestoreData("test", updateId, updatedData);
    console.log("Data updated successfully");
  } catch (error) {
    console.error("Failed to update data: ", error);
  }
}

// 示範如何刪除 firestore 裡的數據
const dataToDelete = ref(""); // 需要删除的文档ID

async function deleteData() {
  try {
    await deleteFirestoreData("test", dataToDelete);
    console.log("Data deleted successfully");
    dataToDelete.value = "";
  } catch (error) {
    console.error("Failed to delete data: ", error);
  }
}
</script>

<template>
  <main>
    <Button type="primary">按鈕</Button>
    <div v-for="data in documents">
      <p>id: {{ data.id }}</p>
      <p>title: {{ data.title }}</p>
      <p>info: {{ data.info }}</p>
      <br />
      <br />
    </div>
    <br />
    <button @click="addData">Add Data</button>
    <span>title:</span>
    <input type="text" name="title" v-model="dataToAdd.title" />
    <span>info:</span>
    <input type="text" name="info" v-model="dataToAdd.info" />
    <br />
    <button @click="updateData">Update Data</button>
    <span>update id:</span>
    <input type="text" name="update-id" v-model="updateId" />
    <span>title:</span>
    <input type="text" name="update-title" v-model="updatedData.title" />
    <span>info:</span>
    <input type="text" name="update-info" v-model="updatedData.info" />
    <br />
    <button @click="deleteData">Delete Data</button>
    <span>delete Id:</span>
    <input type="text" name="deleteId" v-model="dataToDelete" />
  </main>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/page/notFound.scss";
</style>
