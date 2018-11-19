<template>
 <div id="weibo">
    
   <div class="weiboHeader" :style="domain? 'backgroundImage:url('+domain+focus.bg_image+')':'backgroundImage:url('+focus.bg_image+')' ">
     <div class="abTop"></div>
     <div class="abBottom"> </div>
     <div class="textBox">
       <div class="headerImg">
         <img :src="domain? domain+focus.image:focus.image" alt="">
       </div>
       <div class="textList">
         <div class="listImg">
           <img src="../image/weibo/title.png" alt="">
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
       <img src="../image/weibo/title2.png" alt="">
     </div>
   </div>
   <div class="incoBox">
     <div class="incoBoxImg" v-cloak v-for="(item,index) in incoList" :key="index">
       <img :src="domain?domain +item.smallimage:item.smallimage" alt="">
  
      </div>
   </div>
   <div class="line">
     <div class="lineImgBox">
       媒体合作伙伴
     </div>
   </div>
   <div class="media">
     <div class="mediaBox">
       <div class="mediaItem" v-for="(item,index) in media" :key="index">
         <img :src="domain+item.smallimage" alt="">
       </div>
     </div>
   </div>
 </div>
</template>
<script>
import {newslist,focus,support,newsDetail,cooperation} from "@/api/home/home"
 export default {
    props: {
    base: Boolean
  },
   data () {
     return {
       domain:"",
       focus:{
         bg_image:require("../image/weibo/bg.png"),
         focus_url:"https://www.weibo.com/u/6728889134",
         id:1,
         image:require("../image/weibo/header.png"),
         subtitle:"知名体育博主 知名博主",
         title:"万博体育"

       },
       incoList:[
         {
           smallimage:""
         }
       ],
       media:[
         {
           smallimage:require("../image/weibo/1.png")
         },
         {
           smallimage:require("../image/weibo/2.png")
         },
         {
           smallimage:require("../image/weibo/3.png")
         },
         {
           smallimage:require("../image/weibo/4.png")
         },
         {
           smallimage:require("../image/weibo/5.png")
         },
         {
           smallimage:require("../image/weibo/6.png")
         },
         {
           smallimage:require("../image/weibo/7.png")
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
    
     support().then(res=>{
       if(res.status ===200){
          let _base = res.data.data
          this.domain = _base.domain
          this.incoList = _base.support

       }
     })
     cooperation().then(res=>{
       if(res.status===200){
         let _base = res.data.data
       
         this.domain = _base.domain
         this.media = _base.cooperation
    
       }
     })
   },
    methods:{
      guanzhu(){
        window.top.open(this.focus.focus_url)
      },
      
   },
   components: {

   }
 }
</script>
<style lang="stylus" scoped>
#weibo
  padding-top 130px
  
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
      color #737373
      font-size 26px
      img 
        width auto 
        height 44px
  .incoBox
    display flex
    justify-content center
    align-items center
    .incoBoxImg
      margin 0 25px
  .media
    display flex
    justify-content center
    padding-bottom 100px
    .mediaBox
      display flex
      justify-content center
      align-items center
      flex-wrap wrap
      width 1200px
      .mediaItem
        margin 0 40px
        width 200px
        display flex
        justify-content center
        img
          max-width 100%
          width auto
          height auto

      
</style>

