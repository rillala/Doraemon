<script setup>
import { ref,onMounted,onUnmounted,computed } from "vue";
import moment from "moment";

const currentTime = ref(getTime());

function getTime() {
  return moment().format("l") + "  " + moment().format("LT");
}

function updateTime() {
  currentTime.value = getTime();
}

const intervalId = setInterval(updateTime, 1000);


import { db } from "@/firebaseConfig";
import {collection,onSnapshot,query} from "firebase/firestore";

const documents = ref([]);
let getData;

onMounted(async () => {
  //組件掛載完成時
  const lastestQuery = query(collection(db, "user"));
  const getData = onSnapshot(lastestQuery, (snapshot) => {
    //監聽即時資料更新
    documents.value = snapshot.docs.map((doc) => {
      return {
        // uid:doc.uid,
        creationDate:doc.data().creationDate
      }
    });
    console.log('Processed documents:', documents.value);
  });
});

onUnmounted(() => {
  //組件被銷毀時
  getData(); // 停止監聽資料
});

// 抓取目前會員人數
// const memberNum = ref("0");
const memberNum = computed(()=>{
    return documents.value.length;
})
// 轉換日期格式並計數
const userCounts = documents.value.reduce((acc, user) => {
    const date = new Date(user.creationDate)
    // （getMonth()的月份從0開始，0代表一月，因此需要加1）
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const formattedDate = month + day;

    acc[formattedDate] = (acc[formattedDate] || 0) + 1;
    return acc;
}, {});
const sortedDates = Object.keys(userCounts).sort();


//引入vue-chartjs的設定
import { Bar } from "vue-chartjs";
//chart.js設定
import {
    Chart as ChartJS,
    Title,
    Tooltip, //hover會出現的資訊
    Legend, //圖例
    BarElement, //用bar就一定要引入
    CategoryScale, //有設定x軸和y軸就要引入
    LinearScale, //有設定x軸和y軸就要引入
} from 'chart.js';

ChartJS.register(
    Title,
    Tooltip,
    Legend,
    BarElement, 
    CategoryScale, 
    LinearScale  
);

const chartOptions = 
    {
        responsive:true,
        maintainAspectRatio:false,
        plugins:{
            legend:{
                display:true,
                position:"bottom",
                labels: {
                    color: '#000',
                    font: {
                        size: 14,
                        weight: 'bold'
                    }
                },
            }
        },
        scales:{
            y:{ 
                display:true,
                // 標題
                title: {
                    display: true,
                    text: '人數',
                    font:{
                        size: 10,
                    }
                },
                ticks:{
                  display:false
                }
            }, 
            x:{ 
                display:true,
                title: {
                    display: true,
                    text: '日期',
                    font:{
                        size: 10,
                    }
                },
                stacked: false
            }
        }
    }
const chartData = {
    labels:
    Object.keys(userCounts).sort(),
    // ['0501','0502','0503','0504','0505','0506','0507',],
    datasets:[
        {
            label:'歷史統計表會員人數',
            backgroundColor: 'rgba(192,144,121,0.2)',
            borderColor: 'white',
            data: 
            Object.values(userCounts),
            // [10,20,30,40,35,25,5] 
        }
    ]
}

// 原本的user資料只有使用Authenication，要取出裡面的所有資料要使用付費cloud function功能
// 所以模擬一個後端資料庫接上firebase-admin SDK把現有的user資料抓到pinia，再全部寫入FireStore
// 這個只有使用一次，之後的註冊資料會同步寫入firestore

// import { useUserStore } from "@/stores/user";
// const userStore = useUserStore();
// async function fetchUserList() {
//     await userStore.fetchUsers();
// }
// onMounted(async()=>{
//     await fetchUserList()
// })

// import { db } from "@/firebaseConfig";
// import {
//   collection,
//   addDoc,
// } from "firebase/firestore";

// const addData = async () => {
//   if (!userStore.users || userStore.users.length === 0) {
//     console.log('No data')
//     // 確認有輸入值，若為空白則不執行
//     return;
//   }
//   userStore.users.forEach(async(user) => {
//       try {
//         const docRef = await addDoc(collection(db, "user"), {
//             uid: user.uid,
//             email: user.email,
//             displayName: user.displayName,
//             disabled: user.disabled,
//             emailVerified: user.emailVerified,
//             creationDate: user.creationDate, 
//         });
//         console.log("Document written with ID: ", docRef.id); // 送出後會再回傳一個id值
//       } catch (e) {
//         console.error("Error adding document: ", e);
//       } 
//   })
// };

</script>

<template>
  <main>
    <div class="pcSmTitle">現在時刻<br />{{ currentTime }}</div>
    <div class="pcSmTitle">
      目前會員人數統計: <span class="primaryColorPink">{{ memberNum }}</span> 人
    </div>
    <!-- <div id="member_chart"></div> -->
    <div id="member_chart">
      <Bar :options="chartOptions" :data="chartData"></Bar>
    </div>
    <!-- <p class="pcMarkText">歷史會員人數統計表</p> -->
     <button @click="addData">add user</button>
      <!-- <div>{{ documents }}</div> -->
  </main>
</template>

<style lang="scss" scoped>
main {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

#member_chart {
  width: 250px;
  height: 250px;
  // border: 1px solid #000;
}
</style>
