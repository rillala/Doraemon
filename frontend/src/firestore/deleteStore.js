import { db } from "@/firebaseConfig";
import { doc, deleteDoc } from "firebase/firestore";
//使用 getDoc() 時，僅會擷取一次資料快照，並不會自動更新。故如果當FireStore資料庫發生變更時，需要再次使用getDoc()才能查看到變更。這種方法通常用於靜態或不經常變動的資料，因為它不會自動監聽數據的變更。

/**
 * 从指定的 Firestore 集合中删除文档。
 * @param {string} collectionName 集合名称
 * @param {string} docId 要删除的文档ID
 * @returns {Promise<void>}
 */
async function deleteFirestoreData(collectionName, docId) {
  const docRef = doc(db, collectionName, docId);
  try {
    await deleteDoc(docRef);
    console.log("Document deleted with ID: ", docRef.id);
  } catch (error) {
    console.error("Error deleting document: ", error);
  }
}

export { deleteFirestoreData };

// 使用方式：在元件 script 中寫以下這段, 將getFirestoreData("這裡寫要取用的集合的名稱")

// import { deleteFirestoreData } from "@/firestore/deleteStore.js";
