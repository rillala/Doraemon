<script setup>
import { Button } from "ant-design-vue";
import { ref, onMounted, onUnmounted } from "vue";
import { db } from "@/firebaseConfig";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";

// ------示範如何讀取 firestore 裡的數據

const documents = ref([]);
let getData;

onMounted(async () => {
  //組件掛載完成時
  const lastestQuery = query(collection(db, "test"));

  getData = onSnapshot(lastestQuery, (snapshot) => {
    //監聽即時資料更新
    documents.value = snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });
  });
});

onUnmounted(() => {
  //組件被銷毀時
  if (getData) {
    getData(); // 停止監聽資料
  }
});

// ------示範如何新增數據到 firestore

const dataToAdd = ref({
  title: "",
  info: "",
}); // 輸入框的值

const addData = async () => {
  if (!dataToAdd.value) {
    // 確認有輸入值，若為空白則不執行
    return;
  }
  try {
    const docRef = await addDoc(collection(db, "test"), dataToAdd.value);
    console.log("Document written with ID: ", docRef.id); // 送出後會再回傳一個id值
  } catch (e) {
    console.error("Error adding document: ", e);
  } finally {
    dataToAdd.value = { title: "", info: "" };
  }
};

// ------示範如何更新 firestore 中的數據

const updateId = ref(""); // 需要更新的文档ID
const updatedData = ref({
  title: "",
  info: "",
});

const updateData = async () => {
  try {
    await updateDoc(doc(db, "test", updateId.value), updatedData.value);
  } catch (err) {
    console.error("Error: ", err);
  }
};

// ------示範如何刪除 firestore 裡的數據
// *這是刪除某個集合的document文件
// deleteDoc(doc(db, "collection 的名稱", "document 的名稱"))
// *這是刪除某個集合的document文件中的欄位
// updateDoc(doc(db, 'collection 的名稱', 'document 的名稱'), {
//   要刪除的欄位名稱: deleteField()
// });

const dataToDelete = ref(""); // 需要删除的文档ID

const deleteData = async () => {
  try {
    await deleteDoc(doc(db, "test", dataToDelete.value));
  } catch (err) {
    console.error("Error: ", err);
  }
};
</script>

<template>
  <main>
    <Button type="primary">按鈕</Button>
    <div v-for="data in documents">
      <br />
      <p>id: {{ data.id }}</p>
      <p>title: {{ data.title }}</p>
      <p>info: {{ data.info }}</p>
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
