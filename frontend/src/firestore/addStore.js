import { db } from "@/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

/**
 * 向指定的 Firestore 集合中新增文档。
 * @param {string} collectionName 集合名称
 * @param {Object} data 要新增的文档数据
 * @returns {Promise<void>}
 */

async function addFirestoreData(collectionName, data) {
  try {
    const docRef = await addDoc(collection(db, collectionName), data);
    console.log("Document written with ID: ", docRef.id);
  } catch (error) {
    console.error("Error adding document: ", error);
  }
}

export { addFirestoreData };

// 使用方式：在元件 script 中寫以下這段, 將getFirestoreData("這裡寫要取用的集合的名稱")

// import { addFirestoreData } from "@/firestore/addStore.js";
