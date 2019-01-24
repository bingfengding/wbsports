<template>
 <div id="videos">
   <div class="videosCen">
     <p class="videosTitle">精彩视频</p>
   <div class="swiperBox">
     <swiper :options="videosOption" class="videoSwiper" ref="videoSwiper" >
       <swiper-slide class="swiperSlideVideos" v-cloak v-for="(item,index) in videosList" :key="index" :style="'backgroundImage:url('+domain+item.image+')'"
       @click.native="openVideo(index)"
       >
       <div class="swiperModel">
         <div class="textBox">
            <div class="textImg">
              <img src="../../image/home/videos/playButton.png" alt="">
            </div>
            <div class="text">
              {{item.cn_title}}
            </div>
          </div>
       </div>
          
       </swiper-slide>
     </swiper>

     <!-- <div class="videos-swiper-pagination" slot="pagination"></div> -->
   </div>
    <div class="more">
      <div class="moreBox" @click="goto('videos')">查看全部视频</div>
    </div>    

   </div>
   <transition name="el-fade-in">
    <div class="model" v-show="ifShowVideo" @click="modelClick">
      <div class="videoBox" @click.stop>
        <player :video-url = "baseVideo" :state = "state" class="player" ></player>
      </div>
    </div>
   </transition>

 </div>
</template>

<script>
import {swiper,swiperSlide} from "vue-awesome-swiper"
import player from '@/components/player'
import {videos} from "@/api/home/home"
 export default {
   data () {
     return {
        domain:"",
        ifShowVideo:false,
        state:false,
        baseVideo:require("../../image/home/videos/1.mp4"),
        videosOption:{
          slidesPerView: 3,
          slidesPerColumn : 2,
          slidesPerGroup : 6,
          spaceBetween : 40,
          slidesPerColumnFill:"row",
          pagination: {
            el: '.videos-swiper-pagination',
            clickable :true,
          },
          on: {
            touchEnd: function(event){
              
            },
          },
        },
        videosList:[
          {
            cn_title:"原本以为是青铜 结果是个王者",
            url:require("../../image/home/videos/1.mp4"),
            image:require("../../image/home/videos/video_01.png"),
            id:1,
          }]
     }
   },
   created(){
     videos().then(res=>{
       if(res.status ===200){
         let _base = res.data.data
         this.domain = _base.domain
         this.videosList = _base.videos
         
         this.baseVideo = this.videosList[0].url
         
       }
     })
   },
   mounted(){
      this.$nextTick(()=>{
        this.baseVideo = this.videosList[0].url
        
      })
     
   },
   methods:{
    goto(url){
      this.$router.push(url)
    },     
     openVideo(index){
       
       this.ifShowVideo = true
       this.baseVideo = this.videosList[index].url
       this.state = false

     },
     modelClick(){
       this.ifShowVideo = false
       this.state = true
       this.baseVideo = ""
      
     }
   },
   components: {
     swiper,
     swiperSlide,
     player
   }
 }
</script>
<style lang="stylus" scoped>
#videos
  display flex
  justify-content center
  padding-bottom 100px
  .videosCen
    width 1400px
    .videosTitle
      font-size 84px
      color #ff8b47
      padding-bottom 50px
    .swiperBox
      margin-bottom 40px
      .videoSwiper
        .swiperSlideVideos
          height 300px
          background-size cover
          background-position center center
          cursor pointer
          .swiperModel
            width 100%
            height 100%
            padding 40px 190px 0 20px
            background-color rgba(0,0,0,0.6)
            .textBox
              color #ffffff
              font-size 30px
              .textImg
                padding-bottom 10px
    .more
      display flex
      justify-content center
    .moreBox
      width 220px
      height 50px
      line-height 50px
      color #fff
      background-color #ff8b47
      text-align center
      cursor pointer
  .model
    position fixed
    top 0
    left 0
    right 0
    bottom 0
    background-color rgba(0,0,0,0.7)
    z-index 1000
    .videoBox
      position fixed
      top 50%
      transform translate(-50%,-50%)
      left 50%
      width 1000px

      
    
</style>

<style lang="stylus">
#videos
  padding-top 100px
  position relative
  .videos-swiper-pagination
    position absolute
    left 50%
    transform translateX(-50%)
    z-index 10
    margin-top 30px
  .swiper-pagination-bullet
    width 40px
    height 4px
    background-color #000000
    border-radius 0
    opacity 1
    margin-right 10px
    &:focus
      outline 0
    &.swiper-pagination-bullet-active
      background-color #ff8b47
  
</style>
