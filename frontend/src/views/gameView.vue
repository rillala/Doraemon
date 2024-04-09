<template>
  <section class="game-bg">
    <!-- 初始畫面 -->
    <div v-if="isContent1" class="game-start">
      <div class="game-logo pcBigTitle">
        失落的廚房
      </div>
      <button @click="showGameRules" class="game-go pcSmTitle">開始遊戲</button>
    </div>

    <div v-else-if="!isGameStarted" class="game-rule">
       <!--  遊戲規則   -->
      <div class="game-rule-title pcBigTitle">
        遊戲規則
      </div>
      <div class="game-rule-content pcSmTitle">
        你將看到一份清單，列出需要的廚房用具和食材等。在三分鐘內找出清單上的全部東西，速度越快，排行越高！
      </div>
      <button @click="GameStart" class="game-button pcSmTitle">開始</button>
    </div>
    <div v-else>
      <!-- 遊戲進行畫面 -->
      <div class="game-content">
        <img
      id="draggable-img"
      :style="{left: imagePosition.x + 'px', top: imagePosition.y + 'px'}"
      src="@/assets/scss/image/game/seasoning/seasoning08.svg"
      alt="可拖曳的圖片"
      @mousedown="startDrag"
    />
    <img
      id="draggable-img"
      :style="{left: imagePosition1.x + 'px', top: imagePosition1.y + 'px'}"
      src="@/assets/scss/image/game/seasoning/seasoning07.svg"
      alt="可拖曳的圖片"
      @mousedown="startDrag"
    />

       <div class="game-box">
        <div class="game-box-topic1"><img src="@/assets/scss/image/game/pot/pot02.svg" alt=""></div>
       </div>
       <div class="game-box">
        <div class="game-box-topic2"><img src="@/assets/scss/image/game/seasoning/seasoning12.svg" alt=""></div>
       </div>
       <div class="game-box">
        <div class="game-box-topic3"><img src="@/assets/scss/image/game/kitchenware/kitchenware03.svg" alt=""></div>
       </div>
       <div class="game-box">
        <div class="game-box-topic4"><img src="@/assets/scss/image/game/drink/drink18.svg" alt=""></div>
       </div>
       <div class="game-box">
        <div class="game-box-topic5"><img src="@/assets/scss/image/game/food/food05.svg" alt=""></div>
       </div>
       <div class="game-box">
        <div class="game-box-topic6"><img src="@/assets/scss/image/game/drink/drink19.svg" alt=""></div>
       </div>
       <div class="game-box">
        <div class="game-box-topic7"><img src="@/assets/scss/image/game/knife/knife03.svg" alt=""></div>
       </div>
       <div class="game-box">
        <div class="game-box-topic8"><img src="@/assets/scss/image/game/pan/pan02.svg" alt=""></div>
       </div>
       <div class="game-box">
        <div class="game-box-topic9"><img src="@/assets/scss/image/game/kitchenware/kitchenware02.svg" alt=""></div>
       </div>
       <div class="game-box">
        <div class="game-box-topic10"><img src="@/assets/scss/image/game/seasoning/seasoning08.svg" alt=""></div>
       </div>
        
      </div>
    </div>
  </section>
</template>

<script>
import { throttle } from 'lodash';
export default {
  data() {
    return {
      isContent1: true,
      isGameStarted: false, // 遊戲是否已經開始的狀態

      //拖曳圖片
      dragging: false,
      startX: 0,
      startY: 0,
      imagePosition: {
        x: 810, // 將初始 x 座標設置為 100
        y: -515  // 將初始 y 座標設置為 100
      },
      imagePosition1: {
        x: 790, // 將初始 x 座標設置為 100
        y: -505  // 將初始 y 座標設置為 100
      }
    };
  },
  mounted() {
    document.addEventListener('mousemove', this.drag);
    document.addEventListener('mouseup', this.endDrag);
  },
  methods: {
    GameStart() {
      this.isGameStarted = true;
    },
    showGameRules() {
      this.isContent1 = false;
    },
    startDrag(event) {
      this.dragging = true;
      this.startX = event.clientX - this.imagePosition.x;
      this.startY = event.clientY - this.imagePosition.y;
      requestAnimationFrame(this.animate);
    },
    endDrag() {
      this.dragging = false;
    },
    drag: throttle(function(event) {
      if (this.dragging) {
        const offsetX = event.clientX - this.startX;
        const offsetY = event.clientY - this.startY;
        this.imagePosition = {
          x: offsetX,
          y: offsetY
        };
      }
    }, 1000 / 60), // 限制拖曳事件的觸發頻率為每秒 60 次
    animate() {
      if (this.dragging) {
        requestAnimationFrame(this.animate);
        const offsetX = event.clientX - this.startX;
        const offsetY = event.clientY - this.startY;
        this.imagePosition = {
          x: offsetX,
          y: offsetY
        };
      }
    }
  },
  beforeDestroy() {
    document.removeEventListener('mousemove', this.drag);
    document.removeEventListener('mouseup', this.endDrag);
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/page/game.scss";
</style>
