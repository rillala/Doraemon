<template>
  <div class="splineViewer" ref="splineViewer"></div>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
  name: 'SplineViewer',
  setup() {
    const splineViewer = ref(null);

    onMounted(() => {
      const script = document.createElement('script');
      script.type = 'module';
      script.src = 'https://unpkg.com/@splinetool/viewer@1.0.93/build/spline-viewer.js';
      script.onload = () => {
        const viewer = document.createElement('spline-viewer');
        viewer.setAttribute('url', 'https://prod.spline.design/FN40hS3oQZLg2p8W/scene.splinecode');
        splineViewer.value.appendChild(viewer);
      };
      document.body.appendChild(script);
    });

    return {
      splineViewer,
    };
  },
};
</script>
<!-- <script type="module" src="https://unpkg.com/@splinetool/viewer@1.0.93/build/spline-viewer.js"></script>
<spline-viewer url="https://prod.spline.design/FN40hS3oQZLg2p8W/scene.splinecode"></spline-viewer> -->

<style lang="scss" scoped>
@import "@/assets/scss/page/home.scss";
  .splineViewer{
    width: 100%;
    height: 100vh; 
    margin: 0; 
    padding: 0;
    position: fixed;
    top: 0;
    left: 0;
  }
  @media screen and (min-width: 375px){
    .splineViewer{
      width: 130%;
      left: 0px;
    }
  }

  @media screen and (min-width: 1024px){
    .splineViewer{
      width: 120%;
      left: 0;
    }
  }

  @media screen and (min-width: 1300px){
    .splineViewer{
      width: 115%;
      left: -120px;
    }
  }
</style>
