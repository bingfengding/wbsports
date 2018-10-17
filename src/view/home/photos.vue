<template>
  <div id="photos">
    <swiper :options = "photosOptions" class="photosSwiper" :class="isTranslate?'isTranslate':''"
    ref="photosSwiper"
    >
      <swiper-slide 
        class="photosSwiperSlide"
       >
       <img src="../../image/photos/0.png" alt="">
      </swiper-slide>
      <swiper-slide 
      class="photosSwiperSlide"
        v-cloak
        v-for="(item,index) in photosList" 
        :key="index"
        @click.native="changeClass"
       >
        <ZoomImage 
          :imageWidth="index==0?408:660"
          imageHeight="430"
          :src="domain+item.image"
          :translate=" translate"
          @isZoomed="changeClass"
        ></ZoomImage>
      </swiper-slide>
    </swiper>
    <div class="photos-swiper-pagination swiper-pagination" slot="pagination"></div>
  </div>
</template>

<script>
import {swiper,swiperSlide} from "vue-awesome-swiper"
import ZoomImage from '@/components/ZoomImage'
import {gallery} from "@/api/home/home"
 export default {
   data () {
     return {
        domain:"",
        translate :0,
        isTranslate:false,
        photosList:[
          {
            image:require("../../image/photos/1.png"),
            id:1,
          }
        ],
        photosOptions:{
          slidesPerColumn: 2,
          slidesPerView : 'auto',
          freeMode:true,
          freeModeMomentumVelocityRatio:0.5,
          observer:true,//修改swiper自己或子元素时，自动初始化swiper 
          observeParents:true,//修改swiper的父元素时，自动初始化swiper 
          pagination: {
            el: '.photos-swiper-pagination',
            clickable :true,
            type: 'progressbar',
            progressbarFillClass:"progressbar",
            
          },
          on:{
            transitionEnd: (swiper)=>{
              this.translate = this.swiper.translate
            },
          },
        },

     }
   },
   created(){
     gallery().then(res=>{
       if(res.status ===200){
         let _base = res.data.data
         this.domain = _base.domain
         this.photosList = _base.gallery
       }
     })
   },
   mounted(){
     this.$nextTick(()=>{
      
     })
   },

   computed:{
    swiper() {
      return this.$refs.photosSwiper.swiper
    },
   },
   watch:{
   
   },

   methods:{
     changeClass(data){

      //  this.isTranslate = data?true:false
     }
   },
   components: {
     ZoomImage,
     swiper,
     swiperSlide
   }
 }
</script>

<style lang="stylus">
#photos
  padding 100px 0 0 270px
  .photosSwiper
    .photosSwiperSlide
      width 660px
      height 430px
      &:first-of-type
        width 408px
      &:nth-of-type(2)
        .image
          width 100% !important
          height 100%
</style>
<style lang="stylus">
#photos
  position relative
  .photos-swiper-pagination
    height 10px
    width 82%
    bottom -10px
    left 270px
    .progressbar
      position fixed
      left 0
      top 0
      height 100%
      width 100%
      background-color #ff8b47
      transform-origin: left top
</style>
