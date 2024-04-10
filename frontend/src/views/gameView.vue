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
      <div class="game-content-bg">
      <div class="game-content">
        <div class="image-container">
  <img v-for="(image, index) in images" 
       :src="getImageUrl(image)" 
       :key="index" 
       :style="{top: image.top + 'px', left: image.left + 'px', position: 'absolute'}" 
       @mousedown="startDrag(index, $event)">
</div>
        <!-- <img
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
    /> -->

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
    </div>
  </section>
</template>

<script>

export default {
  data() {
    return {
      isContent1: true,
      isGameStarted: false, // 遊戲是否已經開始的狀態

      //拖曳圖片
      // dragging: false,
      // startX: 0,
      // startY: 0,
      // imagePosition: {
      //   x: 610, // 將初始 x 座標設置為
      //   y: -415  // 將初始 y 座標設置為 
      // },
      // imagePosition1: {
      //   x: 590, // 將初始 x 座標設置為 
      //   y: -405  // 將初始 y 座標設置為 
      // }
      images: [
        { src: 'seasoning/seasoning01', left: 100, top: -400 }, 
        { src: 'seasoning/seasoning02', left: 200, top: -400 },
        { src: 'seasoning/seasoning03', left: 300, top: -400 },
        { src: 'seasoning/seasoning04', left: 400, top: -400 },
        { src: 'seasoning/seasoning05', left: 500, top: -400 },
        { src: 'seasoning/seasoning06', left: 600, top: -400 },
        { src: 'seasoning/seasoning07', left: 700, top: -400 },
        { src: 'seasoning/seasoning08', left: 800, top: -400 },
        { src: 'seasoning/seasoning09', left: 900, top: -400 },
        { src: 'seasoning/seasoning10', left: 1000, top: -400 },
      ], 
      dragging: false,
      offsetX: 0,
      offsetY: 0,
      draggedIndex: -1

    };
  },
  methods: {
    GameStart() {
      this.isGameStarted = true;
    },
    showGameRules() {
      this.isContent1 = false;
    },
    getImageUrl(img) {
      return `@/assets/scss/image/game/${img.src}.svg`;
    },
    startDrag(index, event) {
      this.dragging = true;
      this.draggedIndex = index;
      this.offsetX = event.clientX - this.images[index].left;
      this.offsetY = event.clientY - this.images[index].top;
      window.addEventListener('mousemove', this.drag);
      window.addEventListener('mouseup', this.stopDrag);
    },
    drag(event) {
      if (this.dragging && this.draggedIndex !== -1) {
        this.images[this.draggedIndex].left = event.clientX - this.offsetX;
        this.images[this.draggedIndex].top = event.clientY - this.offsetY;
      }
    },
    stopDrag() {
      this.dragging = false;
      this.draggedIndex = -1;
      window.removeEventListener('mousemove', this.drag);
      window.removeEventListener('mouseup', this.stopDrag);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/page/game.scss";
</style>
