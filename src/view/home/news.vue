<template>
  <div id="news">
    <div class="newsTitle"><p>新闻资讯</p></div>
    <div class="newsTextBox">
      <div class="center">
        <div class="item" v-for="(item,index) in newsList" :key="index">
          <div class="slideImg" :style="'backgroundImage:url('+domain+item.image+')'">
          </div>
          <div class="slideText">
            <div class="ft18">
              <span class="colorOrange">{{item.cn_name}} </span>
            / {{item.startdate}}
            </div>
            <div class="ft30">{{item.cn_title}}</div>
            <div class="camBox">
        <div class="camImg">
            <img src="../../image/cam.png" alt="">
        </div>
            <div class="samllUrl">
              <svg viewBox="0 0 90 34" version="1.1" xmlns="http://www.w3.org/2000/svg">
                <rect class="shape" height="34" width="90"></rect>
              </svg>
              <div class="hover-text" @click="toArticle(item.id,'news')">更多精彩</div>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="more">
      <div class="moreBox" @click="goto('news')">查看全部新闻</div>
      
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
         
           {
            image:require("../../image/home/news/news_01_01.png"),
            cn_title:"本来以为是个青铜 结果却是王者",
            cn_name:"曼联",
            startdate:"15.09.2018",
            id:1,
          },{
            image:require("../../image/home/news/news_01_01.png"),
            cn_title:"本来以为是个青铜 结果却是王者",
            cn_name:"曼联",
            startdate:"15.09.2018",
            id:1,
          },{
            image:require("../../image/home/news/news_01_01.png"),
            cn_title:"本来以为是个青铜 结果却是王者",
            cn_name:"曼联",
            startdate:"15.09.2018",
            id:1,
          },{
            image:require("../../image/home/news/news_01_01.png"),
            cn_title:"本来以为是个青铜 结果却是王者",
            cn_name:"曼联",
            startdate:"15.09.2018",
            id:1,
          },
         
          
       ]
     }
   },
   created(){
    // 新闻资讯
     news().then(res=>{
       if(res.status ===200){
         let _base = res.data.data
         this.domain = _base.domain
         console.log(_base)
         this.newsList = _base.news.rows
       }
     })
   },
   methods:{
    goto(url){
      this.$router.push(url)
    },
     toArticle(id,type){
       let _obj = {
          id,
          type
        };
        this.$store.commit('setNewsDetail',{..._obj})
        let _url = "/article?type=" + type +"&id=" +id
       this.$router.push(_url)
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
  padding 100px 40px 0 40px
  .newsTitle
    display flex
    justify-content center
    p
      width 1380px
      font-size 84px
      color #ff8b47
      margin-bottom 40px
      padding-left 40px
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
  .newsTextBox
    display flex
    justify-content center
    .center
      width 1400px
      display flex
      justify-content center
      flex-wrap wrap
      .item
        display flex
        justify-content center
        margin 15px 10px
        box-shadow 2px 2px 4px 2px #ccc
      .slideImg
        width 240px
        height 286px
        background-repeat no-repeat
        background-position center center
        background-size cover
      .colorOrange
        color #ff8b47
      .ft30
        font-size 26px
        margin 20px 0
        font-weight 600
        height 70px
        overflow hidden
        text-overflow: ellipsis
        display -webkit-box
        -webkit-line-clamp 2
        -webkit-box-orient vertical
      .slideText
        width 400px
        padding 20px 20px 0 20px
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

#news
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
</style>
