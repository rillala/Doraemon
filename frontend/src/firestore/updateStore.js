import { db } from "@/firebaseConfig";
import { doc, updateDoc } from "firebase/firestore";

/**
 * 更新指定的 Firestore 集合中的文档。
 * @param {string} collectionName 集合名称
 * @param {string} docId 文档ID
 * @param {Object} data 要更新的文档数据
 * @returns {Promise<void>}
 */
async function updateFirestoreData(collectionName, docId, data) {
  const docRef = doc(db, collectionName, docId);
  try {
    await updateDoc(docRef, data);
    console.log("Document updated with ID: ", docRef.id);
  } catch (error) {
    console.error("Error updating document: ", error);
  }
}

export { updateFirestoreData };

// 使用方式：在元件 script 中寫以下這段, 將getFirestoreData("這裡寫要取用的集合的名稱")

// import { updateFirestoreData } from "@/firestore/updateStore.js";
