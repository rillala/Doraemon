import { db } from "@/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
//使用 getDoc() 時，僅會擷取一次資料快照，並不會自動更新。故如果當FireStore資料庫發生變更時，需要再次使用getDoc()才能查看到變更。這種方法通常用於靜態或不經常變動的資料，因為它不會自動監聽數據的變更。

/**
 * 从指定的 Firestore 集合中获取所有文档。
 * @param {string} collectionName 集合名称
 * @returns {Promise<Array>} 包含集合中所有文档数据的 Promise 对象
 */
async function getFirestoreData(collectionName) {
  const querySnapshot = await getDocs(collection(db, collectionName));
  const documents = [];
  querySnapshot.forEach((doc) => {
    documents.push({ id: doc.id, ...doc.data() });
  });
  return documents;
}

export { getFirestoreData };

// 使用方式：在元件 script 中寫以下這段, 將getFirestoreData("這裡寫要取用的集合的名稱")

// import { getFirestoreData } from "@/firestore/getStore.js";

// const documents = ref([]);
// onMounted(async () => {
//   try {
//     const data = await getFirestoreData("test");
//    documents.value = data;
//    console.log(documents.value);
//   } catch (error) {
//     console.error("讀取數據失敗：", error);
//   }
// });
