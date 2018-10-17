<template>
 <div id="news">
   <div class="newsTitle">新闻资讯</div>
   <div class="swiperBox">
    
   <swiper :options = "newsOption" ref="newsSwiper" class="newsSwiper">
     <swiper-slide class="newsSwiperSlide" v-cloak v-for="(item,index) in newsList" :key="index">
       <div class="newsSwiperLeft" :style="'backgroundImage:url('+domain+item[0].image+')'">
         <div class="newsSwiperLeftText">
            <div class="ft18 bgOrange">
              {{item[0].cn_name}} /{{item[0].startdate}}
            </div>
            <div class="ft48 width380">{{item[0].cn_title}}</div>
             <div class="camBox">
            <div class="camImg">
               <img src="../../image/cam1.png" alt="">
            </div>
            <div class="samllUrl">
              <svg viewBox="0 0 90 34" version="1.1" xmlns="http://www.w3.org/2000/svg">
                <rect class="shape" height="34" width="90"></rect>
              </svg>
              <div class="hover-text" @click="toArticle(item[0].id,'news')">更多精彩</div>
            </div>
             </div>
         </div>
       </div>
       <div class="newsSwiperRight">
         <div class="swiperSlide2" :style="'backgroundImage:url('+domain+item[1].image+')'">
           <div class="swiperSlide2Text">
             <div class="ft18">
                  <span class="colorOrange">{{item[1].cn_name}} </span>
                /{{item[1].startdate}}
                </div>
                <div class="ft30">{{item[1].cn_title}}</div>
                 <div class="camBox">
            <div class="camImg">
               <img src="../../image/cam.png" alt="">
            </div>
                <div class="samllUrl">
                  <svg viewBox="0 0 90 34" version="1.1" xmlns="http://www.w3.org/2000/svg">
                    <rect class="shape" height="34" width="90"></rect>
                  </svg>
                  <div class="hover-text" @click="toArticle(item[1].id,'news')">更多精彩</div>
                </div>
                 </div>
           </div>
         </div>
         <div class="swiperSlide2rigth">
           <div class="swiperSlide3">
             <div class="swiperSlideImg">
               <img v-lazy="domain+item[2].image" alt="">
             </div>
             <div class="swiperSlideText">
                <div class="ft18">
                  <span class="colorOrange">{{item[2].cn_name}} </span>
                /{{item[2].startdate}}
                </div>
                <div class="ft30">{{item[2].cn_title}}</div>
                 <div class="camBox">
            <div class="camImg">
               <img src="../../image/cam.png" alt="">
            </div>
                <div class="samllUrl">
                  <svg viewBox="0 0 90 34" version="1.1" xmlns="http://www.w3.org/2000/svg">
                    <rect class="shape" height="34" width="90"></rect>
                  </svg>
                  <div class="hover-text" @click="toArticle(item[2].id,'news')">更多精彩</div>
                </div>
                 </div>
             </div>
           </div>
           <div class="swiperSlide3">
             <div class="swiperSlideImg">
               <img v-lazy="domain+item[3].image" alt="">
             </div>
             <div class="swiperSlideText">
                <div class="ft18">
                  <span class="colorOrange">{{item[3].cn_name}} </span>
                /{{item[3].startdate}}
                </div>
                <div class="ft30">{{item[3].cn_title}}</div>
                <div class="camBox">
            <div class="camImg">
               <img src="../../image/cam.png" alt="">
            </div>
                <div class="samllUrl">
                  <svg viewBox="0 0 90 34" version="1.1" xmlns="http://www.w3.org/2000/svg">
                    <rect class="shape" height="34" width="90"></rect>
                  </svg>
                  <div class="hover-text" @click="toArticle(item[3].id,'news')">更多精彩</div>
                </div>
                </div>
             </div>
           </div>
         </div>
       </div>
     </swiper-slide>
    
   </swiper>
   <div class="news-swiper-pagination" slot="pagination">
      </div>
      </div>
 </div>
</template>

<script>
import {swiper,swiperSlide} from "vue-awesome-swiper"
import player from '@/components/player'
import {news} from "@/api/home/home"
 export default {
   data () {
     return {
       domain:"",
       newsOption:{
         pagination: {
            el: '.news-swiper-pagination',
            clickable :true,
          },
       },
       newsList:[
         [
           {
            image:require("../../image/news/news_01_01.png"),
            cn_title:"本来以为是个青铜 结果却是王者",
            cn_name:"曼联",
            startdate:"15.09.2018",
            id:1,
          },{
            image:require("../../image/news/news_01_01.png"),
            cn_title:"本来以为是个青铜 结果却是王者",
            cn_name:"曼联",
            startdate:"15.09.2018",
            id:1,
          },{
            image:require("../../image/news/news_01_01.png"),
            cn_title:"本来以为是个青铜 结果却是王者",
            cn_name:"曼联",
            startdate:"15.09.2018",
            id:1,
          },{
            image:require("../../image/news/news_01_01.png"),
            cn_title:"本来以为是个青铜 结果却是王者",
            cn_name:"曼联",
            startdate:"15.09.2018",
            id:1,
          },
         ]
          
       ]
     }
   },
   created(){
    // 新闻咨询
     news().then(res=>{
       if(res.status ===200){
         let _base = res.data.data
         this.domain = _base.domain
         this.newsList = _base.news

        
       }
     })
   },
   methods:{
     toArticle(id,type){
       let _obj = {
          id,
          type
        };
        this.$store.commit('setNewsDetail',{..._obj})
        this.$router.push('/article')
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
#news
  padding 150px 40px 0 40px
  .newsTitle
    font-size 84px
    color #ff8b47
    margin-left 270px
    margin-bottom 40px
  .swiperBox
    position relative
    .newsSwiper
      position relative
      .newsSwiperSlide
        height 570px
        padding 0 40px
        .ft48
          font-size 48px
        .newsSwiperLeft
          width 940px
          height 570px
          background-position center center
          background-size cover
          position relative
          color #ffffff
          .newsSwiperLeftText
            position absolute
            bottom 40px
            left 16%
            .width380
              width 390px
              padding 20px 0
              line-height 60px
            .bgOrange
              display inline-block
              background-color #ff8b47
              padding 2px 6px
        .newsSwiperRight
          position absolute
          right 10px
          top 50%
          transform translateY(-50%)
          display flex
          justify-content space-between
          .swiperSlide2
            width 500px
            height 480px
            margin-right 40px
            background-size cover
            background-position center center
            position relative
            box-shadow 6px 6px 10px #999999
            .swiperSlide2Text
              width 360px
              height 220px
              position absolute
              right 0
              bottom 0
              background-color #ffffff
              padding 30px 110px 0 30px
              .colorOrange
                color #ff8b47
              .ft30
                font-size 30px
                height 78px
                margin 16px 0
                overflow hidden
                text-overflow: ellipsis
                display -webkit-box
                -webkit-line-clamp 2
                -webkit-box-orient vertical
          .swiperSlide2rigth
            width 500px
            .swiperSlideImg
              width 230px
              height 220px
              display flex
              justify-content center
              align-items center
              overflow hidden
              img
                width 100%
                height 100% 
            .swiperSlide3
              display flex
              justify-content center
              box-shadow 6px 6px 10px #999999
              .swiperSlideImg
                width 230px
                height 220px
                img
                  width 100%
                  height 100%
              .colorOrange
                color #ff8b47
              .ft30
                font-size 26px
                margin 20px 0
                height 70px
                overflow hidden
                text-overflow: ellipsis
                display -webkit-box
                -webkit-line-clamp 2
                -webkit-box-orient vertical
              .swiperSlideText
                width 270px
                padding 30px 30px 0 30px
                background-color #ffffff
              &:first-of-type
                margin-bottom 40px
  .camBox
    display flex
    align-items center
    .camImg
      padding-right 10px
  .samllUrl
    position relative
    width 90px
    height 34px
    .shape
      fill: transparent;
      stroke-width: 2px
      stroke: #ff8b47
      stroke-dasharray: 60 188
      stroke-dashoffset: 110
    .hover-text
      position absolute
      line-height 34px
      width 90px
      top 0
      cursor pointer
      text-align center
    &:hover
      .hover-text
        transition 0.5s
      .shape
        animation: draw 0.5s linear forwards
                

</style>
<style lang="stylus">
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
#news
  .news-swiper-pagination
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
