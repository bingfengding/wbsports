
<template>

  <div id="article">
    <div class="main">
      <div class="mainCen">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/news' }">新闻资讯</el-breadcrumb-item>
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
                <div class="bdsharebuttonbox" data-tag="share_1">
                  <a class="bds_tsina" data-cmd="tsina"></a>
                  <a class="bds_weixin" data-cmd="weixin"></a>
                </div>
              </div>
            </div>
            <div class="adBox2">
            <div class="center" v-if="item.pin ==3" v-for="(item,index) in adBox" :key="index" @click="goUrl(item.url)" :style="'backgroundImage:url('+domain+item.image+')'">
              <!-- <img :src="domain + item.image" alt=""> -->
            </div>
          </div>
          </div>
          <div class="conRight">
            <div class="adBox1">
              <div class="center" v-if="item.pin ==1" v-for="(item,index) in adBox" :key="index"  @click="goUrl(item.url)" :style="'backgroundImage:url('+domain+item.image+')'">
                <!-- <img :src="domain + item.image" alt=""> -->
              </div>
            </div>
            <div class="news">
              <p class="ft48">相关新闻</p>
              <div class="newsBox"> 
                <div class="newsItem" v-cloak v-for="(item,index) in newsList" :key="index">
                  <div class="newsImgBox" :style="'backgroundImage:url('+domain+item.image+')'">
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
            
            <!-- <div class="video" v-show="videoList[0]">
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
            </div> -->
            <div class="adBox1">
              <div class="center" 
              v-if="item.pin ==1" 
              v-for="(item,index) in adBox" 
              :key="index"  
              @click="goUrl(item.url)"
              :style="'backgroundImage:url('+domain+item.image+')'"
              
              >
                <!-- <img :src="domain + item.image" alt=""> -->
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
   
    <!-- <div class="weibo">
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
    </div> -->
  </div>
</template>
<script>
import player from '@/components/player'
import {newsDetail,focus,newslist,support,ad} from "@/api/home/home"
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      domain:"",
      ifShowVideo:false,
      state:false,
      baseVideo:require("../image/home/videos/1.mp4"),
      title:"我以为是青铜没想到是王者安排",
      bannerImg:require("../image/article/banner.png"),
      adBox:[ {
          id:1,
          image:require("../image/home/ad1.png"),
          pin:null,
          title:"",
          url:""
        }],
      logBox:[
          {
            url:require("../image/home/logo_02.png")
          },{
            url:require("../image/home/logo_03.png")
          },{
            url:require("../image/home/logo_04.png")
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
            url:require("../image/home/videos/1.mp4"),
            id:1,
          }
        ],
        articleContent:"訴紀出是！的家星，家",
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
       textList:[
        {
          cn_name:"英超",
          startdate:"15.09.2018",
          cn_title:"最新最全的英超资讯都在这里",
          url:"",
          id:1,
        },{
          cn_name:"英超",
          startdate:"15.09.2018",
          cn_title:"最新最全的英超资讯都在这里",
          url:"",
           id:2,
        },{
          cn_name:"英超",
          startdate:"15.09.2018",
          cn_title:"最新最全的英超资讯都在这里",
          url:"",
           id:3,
        },
      ]
     }
   },
    created(){
      this.getUrl()
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
      ad({type:"article"}).then(res=>{
      if(res.status===200){
        
        let _base =res.data.data
        this.adBox = _base.ad
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
    watch:{
      $route(to,from){
        if(to.name === "article")
        this.getUrl()
      }
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
    getUrl(){
      let _obj = {}
      let num = window.location.hash.indexOf('?')
      if(num+1){
        let _string = window.location.hash.slice(num+1)
        let _arr1 = _string.split("&")
        _arr1.forEach((item)=>{
          let _arr2 = item.split("=")
          _obj[_arr2[0]] = _arr2[1]
        })

      }else {
        _obj = this.getNewsDetail
      }

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
    },
    guanzhu(){
        window.top.open(this.focus.focus_url)
      },
    toArticle(id,type){
      let _obj = {
        id,
        type
      }
      this.$store.commit('setNewsDetail',{..._obj})
      let _url = "/article?type=" + type +"&id=" +id
      this.$router.push(_url)
      let _obj1 = {}
      let num = window.location.hash.indexOf('?')
      if(num+1){
        let _string = window.location.hash.slice(num+1)
        let _arr1 = _string.split("&")
        _arr1.forEach((item)=>{
          let _arr2 = item.split("=")
          _obj1[_arr2[0]] = _arr2[1]
        })

      }else {
        _obj1 = this.getNewsDetail
      }
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
    },
     goUrl(url){
      window.top.open(url)
    }
  },
  components: {
    player
  }
}
</script>

<style lang="stylus" scoped>
#article
  padding-top 30px
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
            height auto
            overflow hidden
            .leftHtml
              overflow hidden
              padding-right 20px
              width 854px
              height auto
              overflow-y auto
          .leftBottom
            padding-top 40px
            .leftFen
              font-size 24px
            .fenBox
              padding 20px 0 30px 0
              .bdsharebuttonbox
                height 30px
          .adBox2
            .center
              max-width 830px
              height 200px
              cursor pointer
              background-position center center
              background-size cover
              img
                width 100%
                height 100%
        .conRight
          width 506px
          .adBox1
            display flex
            justify-content center
            .center
              width 500px
              height 330px
              cursor pointer
              background-position center center
              background-size cover
              img
                width 100%
                height 100%
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
                  background-position center center
                  background-size cover
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
          background url("../image/home/place/01.png")
          margin-right 140px
        &:nth-of-type(2)
          background url("../image/home/place/02.png")
          margin-right 140px
        &:nth-of-type(3)
          background url("../image/home/place/03.png")
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

