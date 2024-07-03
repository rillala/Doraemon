<script setup>
import { ref, onMounted, onUnmounted, computed, watch } from "vue";
import moment from "moment";
import { useUserStore } from '@/stores/user';
import { useFirestore } from '../../composable/useFirestore.js'

const currentTime = ref(getTime());

function getTime() {
  return moment().format("l") + "  " + moment().format("LT");
}

function updateTime() {
  currentTime.value = getTime();
}

const intervalId = setInterval(updateTime, 1000);

const UserStore = useUserStore();

onMounted(async()=>{
    await UserStore.fetchMembers();
})

const memberList = computed(() => UserStore.memberList);
const memberNum =  computed(() => memberList.value.length)


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

const chartData = computed(() => {
    const dateLables = []
    memberList.value.forEach((item)=>{
        dateLables.push(moment(item.creationTime).format('MMDD'))  
    })

    const accDate = dateLables.reduce((acc,date) => {
        acc[date] = (acc[date] || 0) + 1
        return acc
    },{})

    return {
        labels:Object.keys(accDate),
        datasets:[
            {
                label:'註冊會員人數',
                backgroundColor: 'rgba(192,144,121,0.2)',
                borderColor: 'white',
                data:Object.values(accDate)
            }
        ]
    }  
})

</script>

<template>
  <main>
    <div class="pcSmTitle">現在時刻<br />{{ currentTime }}</div>
    <div class="pcSmTitle">
      目前會員人數統計: <span class="primaryColorPink">{{ memberNum }}</span> 人
    </div>
    <div id="member_chart">
      <Bar :options="chartOptions" :data="chartData"></Bar>
    </div>
    <!-- <p class="pcMarkText">歷史會員人數統計表</p> -->
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
