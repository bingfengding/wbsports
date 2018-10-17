<template>
  <div id="place">
    <div class="placeCen">
      <div class="placeImg">
        <div class="placeLeft">
          <div class="placeLeftText">
            <!-- {{imgList[imgIndex].img_title}} -->
          </div>
          <bigImg :pose="isZoomed?'in':'out'" class="bigImg">
            <img :src="domain+imgList[imgIndex].l_image" alt="">
          </bigImg>
          <bigImg :pose="isZoomed?'out':'in'" class="bigImg">
            <img :src="domain+imgList[imgIndex].l_image" alt="">
          </bigImg>
        </div>
        <div class="placeRight">
          <p class="ft60">万博体育</p>
          <p class="ft84">骑士殿堂</p>
          <p>万博体育给你最新咨询</p>
          <div class="imgBox">
            <div class="img" v-cloak v-for="(item,index) in imgList" :key="index" @click="changeBigImg(index)">
              <img :src="domain+item.s_image" alt="">
              <div class="imgModel" v-show="imgIndex!=index"></div>
            </div>
          </div>
        </div>
      </div>
   
    </div>
  </div>
</template>
<script>
import posed from 'vue-pose'
import {hall} from "api/home/home"
export default {
  data () {
    return {
      domain:"",
      isZoomed:false,
      imgIndex:0,
      imgList:[
        {
          img_title:"英超最佳球员",
          s_image:require("../../image/place/1.png"),
          l_image:require("../../image/place/1_b.png")
        }
      ],
    
    }
  },
  created(){
    hall().then(res=>{
      if(res.status ===200){
        let _base = res.data.data
        this.domain = _base.domain
        this.imgList = _base.hall
      }
    })
  },
  methods:{
    changeBigImg(index){
      this.isZoomed = !this.isZoomed
      let timer = setTimeout(()=>{
        this.imgIndex = index
        clearTimeout(timer)
      },300)
      
    }
    
  },
  components: {
    bigImg:posed.div({
      out:{
        opacity: 0,
        scale:0.1,
        transition:{
          ease:"easeInOut",
          duration: 400,
        }
      },
      in:{
        opacity: 1,
        scale:1,
        delay:400,
        transition:{
          ease:"easeInOut",
          duration: 400,
        }
      }
    })
  }
}
</script>

<style lang="stylus" scoped>
#place
  padding-top 150px
  display flex
  justify-content center
  @keyframes draw
    0% 
      stroke-dasharray: 60,188;
      stroke-dashoffset: -143;
      stroke-width: 2px;
    100% 
        stroke-dasharray:248
        stroke-dashoffset: 0;
        stroke-width: 1px;
        stroke: #ff8b47;
  .placeCen
    .placeImg
      display flex
      justify-content center
      .placeLeft
        width 411px
        height 447px
        position relative
        overflow hidden
        .placeLeftText
          font-size 18px
          line-height 40px
          color #4e505e
          text-align center
        .bigImg
          position absolute
          bottom 0
          left 0
          width 100%
          height 447px
          img
            width 100%
            height 100%
      .placeRight
        margin-left 60px
        .ft60
          font-size 60px
        .ft84
          font-size 84px
        p
          text-align right
          color #ff8b47
        .imgBox
          margin-top 60px
          display flex
          justify-content center
          align-items flex-end
          .img
            width 154px
            height 155px
            margin-right 20px
            cursor pointer
            position relative
            .imgModel
              position absolute
              top 0
              left 0
              right 0
              bottom 0
              background-color rgba(0,0,0,0.7)
            img
              width 100%
              height 100%
            &:last-of-type
              margin-right 0

</style>
