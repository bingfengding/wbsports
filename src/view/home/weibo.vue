<template>
 <div id="weibo">
    <div class="placeText">
        <div class="textBox" v-cloak v-for="(item,index) in textList" :key="index">
          <p class="text1"><span class="colorOrange">{{item.cn_name}}</span>/{{item.startdate}}</p>
          <p class="text2">{{item.cn_title}}</p>
          <div class="camBox">
            <div class="camImg">
               <img src="../../image/cam.png" alt="">
            </div>
           
            <div class="moreText">
            <svg viewBox="0 0 90 34" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <rect class="shape" height="34" width="90"></rect>
            </svg>
            <div class="hover-text" @click="toArticle(item.id,'news')">更多精彩</div>
          </div>
          </div>
          
        </div>
      </div>
   <div class="weiboHeader" :style="domain? 'backgroundImage:url('+domain+focus.bg_image+')':'backgroundImage:url('+focus.bg_image+')' ">
     <div class="abTop"></div>
     <div class="abBottom"> </div>
     <div class="textBox">
       <div class="headerImg">
         <img :src="domain? domain+focus.image:focus.image" alt="">
       </div>
       <div class="textList">
         <div class="listImg">
           <img src="../../image/weibo/title.png" alt="">
         </div>
         <p class="textListP">{{focus.subtitle}}</p>
         <div class="btn" @click="guanzhu">
           + 关注
         </div>
       </div>
     </div>
   </div>
   <div class="line">
     <div class="lineImgBox">
       <img src="../../image/weibo/title2.png" alt="">
     </div>
     
   </div>
   <div class="incoBox">
     <div class="incoBoxImg" v-cloak v-for="(item,index) in incoList" :key="index">
       <img :src="domain?domain +item.smallimage:item.smallimage" alt="">
  
      </div>
   </div>
 </div>
</template>
<script>
import {newslist,focus,support,newsDetail } from "@/api/home/home"
 export default {
    props: {
    base: Boolean
  },
   data () {
     return {
       domain:"",
       focus:{
         bg_image:require("../../image/weibo/bg.png"),
         focus_url:"www.baidu.com",
         id:1,
         image:require("../../image/weibo/header.png"),
         subtitle:"知名体育博主 知名博主",
         title:"万博体育"

       },
       incoList:[
         {
           smallimage:""
         }
       ],
       textList:[
        {
          cn_name:"英超",
          startdate:"15.09.2018",
          cn_title:"最新最全的英超咨询都在这里",
          url:"",
          id:1,
        },{
          cn_name:"英超",
          startdate:"15.09.2018",
          cn_title:"最新最全的英超咨询都在这里",
          url:"",
           id:2,
        },{
          cn_name:"英超",
          startdate:"15.09.2018",
          cn_title:"最新最全的英超咨询都在这里",
          url:"",
           id:3,
        },
      ]
     }
   },
   watch:{
     
   },
   created(){
    //  关注
    focus().then(res=>{
      if(res.status ===200){
         let _base = res.data.data
         this.domain = _base.domain
         
         this.focus = _base.focus
       }
    })
     newslist().then(res=>{
       if(res.status ===200){
         let _base = res.data.data
         this.domain = _base.domain
         this.textList = _base.threeNews
       }
     })
     support().then(res=>{
       if(res.status ===200){
          let _base = res.data.data
          this.domain = _base.domain
          this.incoList = _base.support

       }
     })
   },
    methods:{
      guanzhu(){
        window.open(this.focus.focus_url)
      },
      toArticle(id,type){
        if(this.base){
         
        }else{
          let _obj = {
            id,
            type
          };
          this.$store.commit('setNewsDetail',{..._obj})
          this.$router.push('/article')
        }
        
      }
   },
   components: {

   }
 }
</script>
<style lang="stylus" scoped>
#weibo
  padding-top 130px
  .placeText
    display flex
    justify-content center
    padding-bottom 110px
    .textBox
      width 350px
      height 180px
      background-position top right !important
      background-repeat no-repeat !important
      &:nth-of-type(1)
        background url("../../image/place/01.png")
        margin-right 140px
      &:nth-of-type(2)
        background url("../../image/place/02.png")
        margin-right 140px
      &:nth-of-type(3)
        background url("../../image/place/03.png")
      .text1
        .colorOrange
          color #ff8b47
          padding-right 10px
      .text2
        font-size 30px
        width 280px
        margin 20px 0 20px 0
        height 80px
        overflow hidden
        text-overflow: ellipsis
        display -webkit-box
        -webkit-line-clamp 2
        -webkit-box-orient vertical
      .camBox
        display flex
        align-items center
        .camImg
          padding-right 10px
      .moreText
        position relative
        width 90px
        height 34px
        .shape
          fill transparent
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
  .weiboHeader
    background-size cover
    background-position center center
    height 450px
    position relative
    display flex
    padding-left 14%
    align-items center
    .abTop
      background-color #ff8b47
      width 70px
      height 90px
      position absolute
      top -90px
      right 90px
    .abBottom
      background-color #ff8b47
      width 126px
      height 126px
      position absolute
      top 0
      right 160px
    .textBox
      display flex
      justify-content flex-start
      align-items center
      .headerImg
        width 225px
        height 225px
        border-radius 50%
        overflow hidden
        border 6px solid #3d2d32
        display flex
        justify-content center
        align-items center
        img
          width 100%
          height 100%

      .textList
        padding-left 40px
        .listImg
          width 196px
          height 46px
          img
            width 100%
            height 100%
        .textListP
          color #ffffff
          font-size 36px
          padding 20px 0
        .btn
          width 150px
          height 36px
          text-align center
          line-height 36px
          font-size 18px
          background-color #fb7a2e
          cursor pointer
          color #fff
          &:hover
            background-color #ff8b47
  .line
    height 4px
    background-color #ededed
    margin 80px 0 60px 0
    position relative
    .lineImgBox
      padding 0 20px
      background-color #fff
      position absolute
      top 50%
      left 50%
      transform translate(-50%,-50%)
      img 
        width auto 
        height 44px
  .incoBox
    padding-bottom 80px
    display flex
    justify-content center
    align-items center
    .incoBoxImg
      margin 0 25px
      
</style>

