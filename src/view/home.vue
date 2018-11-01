<template>
  <div id="home" class="d_jump">
 
    <header>
      <hbox class="header" :pose="headerShow?'show':'hide'">
        <div class="headerLeft" :class="headerShow?'':'hideBorder'">
          <hbox-left class="svgBox" :pose="headerShow?'show':'hide'"></hbox-left>
        </div>
        <div  class="headerRight"  :pose="headerShow?'show':'hide'">
          <hbox-right  class="headerTop">
            <div class="fenBox">
              <div class="bdsharebuttonbox" data-tag="share_1">
                <a class="bds_tsina" data-cmd="tsina"></a>
                <a class="bds_weixin" data-cmd="weixin"></a>
                <a class="bds_linkedin" data-cmd="linkedin"></a>
                <a class="bds_twi" data-cmd="twi"></a>
                <a class="bds_fbook" data-cmd="fbook"></a>
              </div>
            </div>
          </hbox-right>
          <div class="headerBottom">
            <div class="list-shortcut">
              <div class="step">
                <left-step :steps="steps"></left-step>
              </div>
            </div>
          </div>
        </div>

      </hbox>
    </header>
    <main>
      <ul>
        <li  class="list-group schedule" ref="listGroup">
            <div class="home">
              <swiper class="homeSwiper" ref="homeSwiper" :options="homeOption">
                <swiper-slide class="homeSwiperSlide" :style="
                'backgroundImage:url('+domain+item.image+')'
                " v-cloak v-for="item in homeSwiper" :key="item.id">
                  <div class="homeSwiperText">
                    <div class="homeTitle">
                      {{item.mark}}
                    </div>
                    <div class="homeTextContent">
                    {{ item.cn_title}}
                    </div>
                    <div class="camBox">
                      <div class="camImg">
                        <img src="../image/cam1.png" alt="">
                      </div>
                      <div class="homeMore">
                        <svg viewBox="0 0 90 34" version="1.1" xmlns="http://www.w3.org/2000/svg">
                          <rect class="shape" height="34" width="90"></rect>
                        </svg>
                        <div class="hover-text" @click="toArticle(item.id,'banner')">更多精彩</div>
                      </div>
                    </div>
                  </div>
                </swiper-slide>
                <div class="home-swiper-pagination" slot="pagination">
                </div>
              </swiper>
              <div class="newTeam">
                <div class="teamCenter">
                  <div class="team" v-cloak v-for="(item,index) in events" :key="index">
                    <div class="teamPosition">
                      <p class="ft18">{{item.cn_name}}</p>
                    <div class="teamImgBox">
                  
                      <div class="teamImg">
                        <div class="teamImgImg"><img :src="domain+item.home_image" alt="">
                        </div>
                        <p class="ft18">{{item.cn_home_name}}</p>
                      </div>
                      <div class="vs">VS</div>
                      <div class="teamImg">
                        <div class="teamImgImg"><img :src="domain+item.away_image" alt=""></div>
                        
                        <p class="ft18">{{item.cn_away_name}}</p>
                      </div>
                    </div>
                    <p class="ft18">比赛时间</p>
                    <p class="ft18 teamTime">{{item.time}}</p>
                    </div>
                  
                  </div>
                  <div class="newTeamLeft">最新赛事</div>
                </div>
                <!-- <div class="smallNew">
                  <div class="samllBox" v-cloak v-for="(item,index) in samllBoxs" :key="index">
                    <div class="smallNewImg" :style="'backgroundImage:url('+domain+item.image+')'">
                    </div>
                    <div class="smallNewText">
                      <p class="ft18">{{item.cn_name}}</p>
                      <p class="ft30">{{item.cn_title}}</p>
                      <div class="camBox">
                        <div class="camImg">
                          <img src="../image/cam.png" alt="">
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
                </div> -->
              </div>
            </div>
        </li>
        <li  class="list-group newVideoBox" ref="listGroup">
          <news-list-box class="d_jump"></news-list-box>
          <!-- <videos class="d_jump"></videos> -->
        </li>
        <!-- <li  class="list-group d_jump" ref="listGroup">
          <photos></photos>
        </li> -->
        <li  class="list-group d_jump" ref="listGroup">
          <place></place>

        </li>
        <li  class="list-group d_jump" ref="listGroup">
          <weibo :base = false></weibo>
        </li>
      </ul>
    </main>
  </div>
</template>

<script>
import posed from 'vue-pose'
import leftStep from '@/components/public/steps.vue'
import {swiper,swiperSlide} from "vue-awesome-swiper"
import newsListBox from "./home/news"
import videos from "./home/videos"
import photos from "./home/photos"
import place from "./home/place"
import weibo from "./home/weibo"
import {banner, competition, hot} from "@/api/home/home"
 export default {
   data () {
      return {
        headerShow:true,
        domain:"",
        homeOption:{
          pagination: {
            el: '.home-swiper-pagination',
            clickable :true,
          },
        },
        homeSwiper:[
          {
            mark:"万博体育",
            image:require("../image/home/banner_01.png"),
            cn_title:"我以为是青铜没想到是王者安排",
            sortorder:0,
            id:1,
            status:1,
          }
        ],
        logBox:[
          {
            url:require("../image/home/logo_02.png")
          },{
            url:require("../image/home/logo_03.png")
          },{
            url:require("../image/home/logo_04.png")
          },
        ],
        events:[
          {
            cn_name:"英格兰足球超级联赛",
            home_image:require("../image/home/team_01_1.png"),
            away_image:require("../image/home/team_01_2.png"),
            cn_home_name:"曼联",
            cn_away_name:"利物浦",
            time:"2018.9.15 03:00",
            result:"未开赛"
          },{
            cn_title:"西班牙足球超级联赛",
            img1:require("../image/home/team_01_1.png"),
            img2:require("../image/home/team_01_2.png"),
            name1:"曼联",
            name2:"利物浦",
            time:"2018.9.15 03:00"
          },{
            cn_title:"意大利足球超级联赛",
            img1:require("../image/home/team_01_1.png"),
            img2:require("../image/home/team_01_2.png"),
            name1:"曼联",
            name2:"利物浦",
            time:"2018.9.15 03:00"
          },
        ],
        samllBoxs:[
          {
            image:require("../image/home/small_01.png"),
            cn_name:"这里是小文案",
            cn_title:"超级世界波 打出旋转绝杀 世界第一",
            url:"",
            id:1,
          },{
            image:require("../image/home/small_02.png"),
            cn_name:"这里是小文案",
            cn_title:"超级世界波 打出旋转绝杀 世界第一",
            url:"",
            id:2,
          },
        ],
        steps:{
          active:0,
          step: [
            {title:"首页"},
            {title:"新闻咨询"},
            // {title:"精彩视频"},
            // {title:"最新相册"},
            {title:"骑士殿堂"},
            {title:"万博体育微博"}
          ]
        },
      }
   },
   created(){
    //  赛事
     competition().then(res=>{

       if(res.status ===200){
         let _base = res.data.data
         this.domain  = _base.domain
         this.events = _base.competition
       }
     })
   
    //最热新闻
    hot().then(res=>{
        if(res.status ===200){
            let _base = res.data.data
            this.domain  = _base.domain
            this.samllBoxs = _base.hot
        }
    })

    // banner
     banner().then(
        res=>{
          if(res.status ===200){
            let _base = res.data.data
            this.domain  = _base.domain
            this.homeSwiper = _base.banner
          }else{
            this.$message.error(res.data.error)
          }
        }
     )
   },
  mounted(){
    this.$nextTick(function () {
      window.addEventListener('scroll', this.onScroll)
      this.$nextTick(()=>{
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
    })
  },
  methods:{
   
    onScroll () {
      let scrolled = document.documentElement.scrollTop || document.body.scrollTop
      // if(scrolled >=4729) {
      //   this.steps.active = 5
      // }else if (scrolled < 4729 && scrolled >= 4132) {
      //   this.steps.active = 4
      // } else if (scrolled < 4132 && scrolled >= 3172) {
      //   this.steps.active = 3
      // } else if (scrolled < 3172 && scrolled >= 2121) {
      //   this.steps.active = 2
      // } else if (scrolled < 2121 && scrolled >= 1250) {
      //   this.steps.active = 1
      // } else  {
      //   this.steps.active = 0
      // }

      if (scrolled >= 2718) {
        this.steps.active = 3
      } else if (scrolled < 2718 && scrolled >= 2121) {
        this.steps.active = 2
      } else if (scrolled < 2121 && scrolled >= 1250) {
        this.steps.active = 1
      } else  {
        this.steps.active = 0
      }

      if(scrolled==0){
        this.headerShow = true
      }else{
        this.headerShow = false
      }
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
      leftStep,
      swiper,
      swiperSlide,
      newsListBox,
      photos,
      place,
      weibo,
      videos,
      hbox:posed.div({
        show:{
          height:150
        },
        hide:{
          height:70
        }
      }),
      hboxLeft:posed.div({
        show:{
          width:240,
          height:80
        },
        hide:{
          width:120,
          height:40
        }
      }),
      hboxRight:posed.div({
        show:{
          height:80
        },
        hide:{
          height:0
        }
      })
    }
 }
</script>

<style lang="stylus" scoped>
#home
  z-index 1
  header
    z-index 99
    position fixed
    top 0
    width 100%
    .header
      height 150px
      background-color #0c132a
      display flex
      justify-content center
      .headerLeft
        height inherit
        display flex
        justify-content flex-end
        align-items center
        padding-right 5%
        width 34%
        border-right 1px solid #555a6a
        &.hideBorder
          border-right 1px solid #0c132a
        .svgBox
          width 120px
          height 40px
          background url("../image/home/logo_05.svg") no-repeat
          background-size 100% auto
          background-position: 0 0;
      .headerRight
        width 66%
        .headerTop
          height 80px
          border-bottom 1px solid #555a6a
          display flex
          justify-content flex-end
          padding-right 20%
          overflow hidden
          .fenBox
          display flex
          align-items center
          .bdsharebuttonbox
            display flex
            align-items center
            a
              padding-left 0
              margin-left 20px
              width 30px
              height 30px
              background-size 100% 100%
              background-position 0
              &:first-of-type
                margin-left 0
            .bds_tsina

              background-image url("../image/home/weibo.png")
              
            .bds_weixin
              background-image url("../image/home/wechat.png")
            .bds_linkedin

              background-image url("../image/home/insta.png")
  
            .bds_twi

              background-image url("../image/home/twitter.png")
    
            .bds_fbook

              background-image url("../image/home/facebook.png")
   
        .headerBottom
          display flex
          justify-content flex-end
          padding-right 20%
          height 70px
          align-items center
  main
    padding-top 70px
    z-index 1
    position relative
    .home
      position relative
      .homeSwiper
        .homeSwiperSlide
          height 600px
          background-size cover
          background-position center center
          .homeSwiperText
            color #ffffff
            width 360px
            position absolute
            top 120px
            left 18%
            .homeTitle
              font-size 18px
              width 100px
              height 26px
              line-height 26px
              background-color #ff8b47
              text-align center
              margin-bottom 30px
            .homeTextContent
              font-size 60px
              line-height 60px
            .camBox
              display flex
              align-items center
              margin-top 30px
              .camImg
                padding-right 10px
            .homeMore
              width 90px
              height 34px
              
              position relative
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
      .newTeam
        display flex
        justify-content center
        height 580px
        background-color #080f21
        text-align center
        color #fff
        position relative
        z-index 12
        .teamCenter
          display flex
          justify-content center
          position relative
          .team
            width (100/3)%
            max-width 500px
            height 580px
            position relative
            display flex
            align-items flex-start
            padding-top 170px
            .teamPosition
              .teamImgBox
                display flex
                justify-content space-between
                align-items center
                padding 20px 80px
                .vs
                  font-size 40px
                  padding 0 40px
                .teamImg
                  .teamImgImg
                    width 100px
                    height 100px
                    img
                      width auto
                      height auto 
                      max-width 100%
                      max-height 100%
                  >p
                    padding-top 10px
              .teamTime
                padding-top 10px
            &:nth-of-type(2)
              background-color #091932
          .newTeamLeft
            position absolute
            left 60px
            top 60px
            font-size 40px
        .smallNew
          top -80px
          display flex
          justify-content center
          position absolute
          right 0
          .samllBox
            width 520px
            height 250px
            display flex
            justify-content center
            margin-right 30px
            .smallNewImg
              width 228px
              height 250px
              overflow hidden
              text-align center
              line-height 250px
              background-size cover
              background-position center center
              img
                min-width 100%
                min-height 100%
                width auto
                height auto
                margin 0 auto
            .smallNewText
              width 292px
              height 100%
              background-color #ff8b47
              padding 20px 50px 0 40px
              .ft30
                font-size 30px
                margin 20px 0
                text-align left
                height 120px
                overflow hidden
                text-overflow: ellipsis
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
                  stroke: #ffffff
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
                    animation: draw1 0.5s linear forwards
    .newVideoBox
      background url("../image/bg_01.png") no-repeat
      background-size cover
      background-position top center          
</style>
<style lang="stylus">
@keyframes draw
  0% 
    stroke-dasharray: 60,188
    stroke-dashoffset: -143
    stroke-width: 2px
  100% 
    stroke-dasharray:248
    stroke-dashoffset: 0
    stroke-width: 1px
    stroke: #ff8b47
@keyframes draw1
  0% 
    stroke-dasharray: 60,188;
    stroke-dashoffset: -143;
    stroke-width: 2px;
  100% 
    stroke-dasharray:248
    stroke-dashoffset: 0;
    stroke-width: 1px;
    stroke: #ffffff;
  
#home
  min-width 1500px
  .homeSwiper
    .home-swiper-pagination
      position absolute
      bottom 80px
      left 20%
      z-index 10
      .swiper-pagination-bullet
        width 40px
        height 4px
        background-color #8b98a0
        border-radius 0
        opacity 1
        &.swiper-pagination-bullet-active
          background-color #ff8b47
</style>



