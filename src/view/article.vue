
<template>

  <div id="article">
    
    <header>
      <el-row class="header">
        <el-col :span="8" class="headerLeft">
          <div class="svgBox" @click="gotoHome"></div>
        </el-col>
        <el-col :span="16" class="headerRight">
          <!-- <div class="headerTop">
            <div class="headerLogoBox">
              <div class="headerLogo" v-for="(item,index) in logBox" :key="index">
                <img :src="item.url" alt="">
              </div>
            </div>
          </div> -->
          <div class="headerBottom">
            <div class="list-shortcut">
          
                <div class="headerItem" v-cloak v-for="(item,index) in headerList" :key="index" @click="gotoHome">
                  {{item.title}}
                </div>
              
            </div>
          </div>
        </el-col>
      </el-row>
    </header>
    <div class="main">
      <div class="mainCen">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>{{title}}</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="bannerImg" :style="'backgroundImage:url('+bannerImg+')'">
        </div>
        <div class="context">
          <div class="conLeft">
            <div class="leftTab"><img src="../image/article/tag.png" alt=""></div>
            <div class="leftTitle">
              {{title}}
            </div>
            <div class="leftHtmlBox">
              <div class="leftHtml" v-html="articleContent"></div>
            </div>
            
            <div class="leftBottom">
              <p class="leftFen">分享:</p>
              <div class="fenBox">
                <!-- <div class="weibo"><img src="../image/article/weibo.png" alt=""></div>
                <div class="wechat"
                @click="fenWechat"
                ><img src="../image/article/wechat.png" alt=""></div> -->
                <div class="bdsharebuttonbox" data-tag="share_1">
                  <a class="bds_tsina" data-cmd="tsina"></a>
                  <a class="bds_weixin" data-cmd="weixin"></a>
                </div>

              </div>
            </div>
          </div>
          <div class="conRight">
            <div class="news">
              <p class="ft48">相关新闻</p>
              <div class="newsBox"> 
                <div class="newsItem" v-cloak v-for="(item,index) in newsList" :key="index">
                  <div class="newsImgBox">
                    <img :src="domain+item.image" alt="">
                  </div>
                  <div class="textBox">
                    <p><span class="colorOrange">{{item.cn_name}}</span>/{{item.startdate}}</p>
                    <p class="textTitle">
                      {{item.cn_title}}
                    </p>
                    <div class="camBox">
                        <div class="camImg">
                          <img src="../image/article/text.png" alt="">
                        </div>
                        <div class="smallMore">
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
            <div class="video" v-show="videoList[0]">
              <p class="ft48">相关视频</p>
              <div class="videoBox">
                <div class="videoItem" v-cloak v-for="(item,index) in videoList" :key="index" :style="'backgroundImage:url('+domain+item.image+')'"
                  @click="openVideo(index)"
                >
                  <div class="videoText">
                    <div class="videoImg">
                      <img src="../image/article/play.png" alt="">
                    </div>
                    <div class="text">
                      {{item.cn_title}}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <transition name="el-fade-in">
        <div class="model" v-show="ifShowVideo" @click="modelClick">
          <div class="videoBox" @click.stop>
            <player :video-url = "baseVideo" :state = "state" class="player"></player>
          </div>
        </div>
      </transition>
    </div>
   
    <div class="weibo">
      <div class="placeText">
          <div class="textBox" v-cloak v-for="(item,index) in textList" :key="index">
            <p class="text1"><span class="colorOrange">{{item.cn_name}}</span>/{{item.startdate}}</p>
            <p class="text2">{{item.cn_title}}</p>
            <div class="camBox">
              <div class="camImg">
                <img src="../image/cam.png" alt="">
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
          <img :src=" domain+focus.image" alt="">
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
  </div>
  </div>
</template>
<script>
import weibo from "./home/weibo"
import player from '@/components/player'
import {newsDetail,focus,newslist,support} from "@/api/home/home"
import { mapGetters } from 'vuex'
import { setInterval, clearInterval } from 'timers';
export default {
  data () {
    return {
      domain:"",
      ifShowVideo:false,
      state:false,
      baseVideo:require("../image/videos/1.mp4"),
      title:"我以为是青铜没想到是王者安排",
      bannerImg:require("../image/article/banner.png"),
      logBox:[
          {
            url:require("../image/home/logo_02.png")
          },{
            url:require("../image/home/logo_03.png")
          },{
            url:require("../image/home/logo_04.png")
          },
        ],
        headerList:[
          {
            title:"首页",
            top:"",
          },{
            title:"新闻咨询",
            top:"",
          },
          // {
          //   title:"精彩视频",
          //   top:"",
          // },{
          //   title:"最新相册",
          //   top:"",
          // },
          {
            title:"骑士殿堂",
            top:"",
          },{
            title:"万博体育微博",
            top:"",
          },
        ],
        newsList:[
          {
            image:require("../image/article/news_01.png"),
            startdate:"15.09.2018",
            cn_name:"曼联",
            cn_title:"原来以为是 青铜结果是 稍等fds sdf s 阿瑟东啊王者安排",
            url:"",
            id:1,
          }
        ],
        videoList:[
          {
            image:require("../image/article/video_01.png"),
            cn_title:"原本以为是青铜 结果是王者",
            url:require("../image/videos/1.mp4"),
            id:1,
          }
        ],
        articleContent:"訴紀出是！的家星，家",
        focus:{
         bg_image:require("../image/weibo/bg.png"),
         focus_url:"www.baidu.com",
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
    created(){
      


      let _obj = this.getNewsDetail
      newsDetail({..._obj}).then(res=>{
        if(res.status==200){
          let _base = res.data.data
          this.domain = _base.domain
          this.videoList = _base.relationVideos
          this.newsList = _base.relationNews
          this.title = _base.newsDetail.cn_title
  
          this.articleContent = _base.newsDetail.maincontent
          this.bannerImg = this.domain+_base.newsDetail.image
        }
      })
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
   computed:{
      ...mapGetters([
      'getNewsDetail'
    ])
   },

    beforeCreate(){
       window._bd_share_main = "";
    },
    mounted(){
      
      this.$nextTick(()=>{
        this.baseVideo = this.videoList[0].url
        window._bd_share_config = {
            "common":{
              "bdSnsKey":{},
              "bdText":"",
              "bdMini":"2",
              "bdPic":"",
              "bdStyle":"0",
              "bdSize":"16"
            },
            "share":{}
          };
          const s = document.createElement('script')
          s.type = 'text/javascript'
          s.src='http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion='+~(-new Date()/36e5)
          document.body.appendChild(s)
      })
    },
  methods:{
   
    guanzhu(){
        window.open(this.focus.focus_url)
      },
    toArticle(id,type){
      let _obj = {
        id,
        type
      };
      this.$store.commit('setNewsDetail',{..._obj})
      let _obj1 = this.getNewsDetail
      newsDetail({..._obj1}).then(res=>{
        if(res.status==200){
          let _base = res.data.data
          this.domain = _base.domain
          this.videoList = _base.relationVideos
          this.newsList = _base.relationNews
          this.title = _base.newsDetail.cn_title
      
          this.articleContent = _base.newsDetail.maincontent
          this.bannerImg = this.domain+_base.newsDetail.image
 
        }
      })
      this.top()
    },
    gotoHome(){
      this.$router.push("/")
    },
    openVideo(index){
      this.ifShowVideo = true
      this.baseVideo = this.videoList[index].url 
      this.state = false
    },
    modelClick(){
      this.ifShowVideo = false
      this.state = true
      this.baseVideo = ""
    },
    top(){
      let step =  document.documentElement.scrollTop / 50 || document.body.scrollTop / 50
      let timer = setInterval(()=>{
        let distance = document.documentElement.scrollTop || document.body.scrollTop
        
        document.documentElement.scrollTop = distance - step
        document.body.scrollTop = distance - step
        if(distance <= 0){
          clearInterval(timer)
        }
      },10)
    }
  },
  components: {
    weibo,
    player
  }
}
</script>

<style lang="stylus" scoped>
#article
  padding-top 120px
  header
    z-index 99
    position fixed
    top 0
    width 100%
    .header
      height 70px
      background-color #0c132a
      .headerLeft
        height inherit
        display flex
        justify-content flex-end
        align-items center
        padding-right 5%
        //border-right 1px solid #555a6a
        .svgBox
          width 120px
          height 40px
          background url("../image/home/logo_05.svg") no-repeat
          background-size 120px auto
          background-position: 0 0
      .headerRight
        .headerTop
          height 80px
          border-bottom 1px solid #555a6a
          display flex
          justify-content flex-end
          padding-right 20%
          .headerLogoBox
            border-left 1px solid #555a6a
            display flex
            justify-content center
            align-items center
            .headerLogo
              border-right 1px solid #555a6a
              padding 0 40px
              height 80px
              display flex
              align-items center
        .headerBottom
          display flex
          justify-content flex-end
          padding-right 20%
          height 70px
          align-items center
          .list-shortcut
            display flex
            justify-content space-between
            color #868994
            .headerItem
              margin-right 40px
              cursor pointer
              &:hover
                color #ffffff
              &:first-of-type
                color #ffffff
  .main
    display flex
    justify-content center
    .mainCen
      width 1370px  
      .bannerImg
        height 330px
        background-size cover
        background-position center center
        margin 40px 0
      .context
        display flex
        justify-content center
        .conLeft
          width 834px
          margin-right 60px
          border-bottom 1px solid #e0e0e0
          .leftTitle
            font-size 60px
            font-weight 600
            padding 20px 0 30px 0
          .leftHtmlBox
            width 834px
            height 1500px
            overflow hidden
            .leftHtml
              overflow hidden
              padding-right 20px
              width 854px
              height 1500px
              overflow-y auto
          .leftBottom
            padding-top 40px
            .leftFen
              font-size 24px
            .fenBox
              padding 20px 0 30px 0
              .bdsharebuttonbox
                height 30px
        .conRight
          width 506px
          .news
            .ft48
              font-size 48px
              color #ef9156
              padding-bottom 30px
            .newsBox
              .newsItem
                display flex
                justify-content flex-end
                box-shadow 6px 6px 10px #999999
                margin-bottom 20px
                .newsImgBox
                  width 232px
                  height 220px
                  overflow hidden
                  display flex
                  justify-content center
                  align-items center
                  img
                    width 100%
                    height 100%
                .textBox
                  width 270px
                  margin-right 4px
                  padding 20px 30px 0 30px
                  .colorOrange
                    color #ef9156
                    padding-right 10px
                  .textTitle
                    font-size 26px
                    margin 10px 0
                    height 105px
                    overflow  hidden
                    text-overflow ellipsis
                    display -webkit-box
                    -webkit-line-clamp 3
                    -webkit-box-orient vertical
                  .camBox
                    display flex
                    align-items center
                    .camImg
                      padding-right 10px
                  .smallMore
                    position relative
                    width 90px
                    height 34px
                    .shape
                      fill: transparent;
                      stroke-width: 2px
                      stroke: #ff8b47
                      stroke-dasharray: 60 188
                      stroke-dashoffset: 106
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
          .video
            .ft48
              font-size 48px
              color #ff8b47
              padding 30px 0
            .videoBox
              .videoItem
                width 500px
                height 250px
                background-size cover
                background-position center center
                margin-bottom 30px
                display flex
                align-items center
                cursor pointer
                .videoText
                  display flex
                  justify-content flex-start
                  align-items center
                  .videoImg
                    width 121px
                    height 121px
                    margin 0 20px
                    img
                      width 100%
                      height 100%
                  .text
                    width 230px
                    color #ffffff
                    font-size 30px
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

  .weibo
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
          background url("../image/place/01.png")
          margin-right 140px
        &:nth-of-type(2)
          background url("../image/place/02.png")
          margin-right 140px
        &:nth-of-type(3)
          background url("../image/place/03.png")
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
        margin-right 50px
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
#article
  .el-breadcrumb
    .el-breadcrumb__inner.is-link
      color #7f7f7f
      &:hover
        color #ef9156
    .el-breadcrumb__inner
      color #ef9156
  .bdsharebuttonbox
    height auto !important
    .bds_tsina
      background url("../image/article/weibo.png")
      width 50px
      height 50px
    .bds_weixin
      background url("../image/article/wechat.png")
      width 55px
      height 51px
</style>

