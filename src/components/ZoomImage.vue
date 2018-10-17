<template>
  <div :style="{ width: imageWidth + 'px', height: imageHeight + 'px' }" @click="toggleZoom" class="image">
    <Frame :pose="pose" class="frame" />
    <ZoomImage :pose="pose" :src="src" :translateX = "translateX" :class="isZoomed?'zoomed':''"/>
  </div>
</template>

<script>
import posed from 'vue-pose';

const transition = {
  duration: 400,
  ease: [0.08, 0.69, 0.2, 0.99],
  type: 'spring'
};

export default {
  props: ['imageWidth', 'imageHeight', 'src',"translate"],
  data: () => ({
      isZoomed: false,
      translateX:200,
     }),
  computed: {
    pose() {
      return this.isZoomed ? 'zoomedIn' : 'zoomedOut'
    },
    toggleZoom() {
      return this.isZoomed ? this.zoomOut : this.zoomIn;
    }
  },
  watch:{
    translate:function(a,b){
      this.translateX = -a + 200
    }
  },
  methods: {
    zoomIn() {
      window.addEventListener('scroll', this.zoomOut)
      this.isZoomed = true
      //this.$emit("isZoomed",true)
    },
    zoomOut() {
      window.removeEventListener('scroll', this.zoomOut)
      this.isZoomed = false
      //this.$emit("isZoomed",false)
    }
  },
  mounted(){
    
  },
  components: {
    Frame: posed.div({
      zoomedOut: {
        applyAtEnd: { display: 'none' },
        opacity: 0
      },
      zoomedIn: {
        applyAtStart: { display: 'block' },
        opacity: 1
      }
    }),
    ZoomImage: posed.img({
      zoomedOut: {
        position: 'static',
        width: '100%',
        height: '100%',
        transition,
        flip: true,
        zIndex:1,
      },
      zoomedIn: {
        position: 'fixed',
        top: 0,
         width: 'auto',
        height: 'auto',
        left:({translateX})=>translateX,
        bottom: 0,
        zIndex:100,
        transition,
        flip: true,
        
      }
    })
  }
}
</script>

<style lang="stylus">
.image
  img 
    cursor: zoom-in;
    display: block;
    max-width: 100%;
    margin: auto;
    z-index: 11;
    &.zoomed 
      cursor: zoom-out;
  .frame 
    position: fixed;
    width:100%;
    height:100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: none;
    background: rgba(255,255,255,0.9);
    transform: translateZ(0);
    z-index: 1;
  
</style>