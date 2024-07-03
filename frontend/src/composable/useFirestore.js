import { ref, onMounted ,onUnmounted  } from "vue";
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

export function useFirestore(){
  // let fetchData;
  const documents = ref([]);
  
  const getData = (collectionName) => {
    const lastestQuery = query(collection(db, collectionName));

    // onSnapshot是非同步的documents在取值值會容易有非同步的問題
    onSnapshot(lastestQuery, (snapshot) => {
      //監聽即時資料更新
      documents.value = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
    });
  }
  const addData = async (collectionName,data) => {
    try {
      const docRef = await addDoc(collection(db,collectionName),data);
      return docRef.id;
    } catch (err){
      console.error('新增文件失敗',err);
    }
  };

  const updateData = async (collectionName,docId,data) => {
    try {
      await updateDoc(doc(db,collectionName,docId),data);
    } catch (err){
      console.error('修改文件失敗',err);
    }
  };

  const deleteData = async (collectionName,data) => {
    try {
      await deleteDoc(doc(db,collectionName,data));
    } catch (err){
      console.error('修改文件失敗',err);
    }
  };

  return { documents, getData, addData, updateData, deleteData }
}