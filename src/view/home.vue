<template>
  <div id="home" class="d_jump">
    
    <main>
      <ul>
        <li  class="list-group schedule" ref="listGroup">
          <div class="home">
            <swiper class="homeSwiper" ref="homeSwiper" :options="homeOption" v-if="show">
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
                <div class="allTeam" @click="goto('/event')">查看全部赛事</div>
              </div>
              
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
        </li>
      </ul>
    </main>
  </div>
</template>

<script>
import posed from 'vue-pose'
import {swiper,swiperSlide} from "vue-awesome-swiper"
import newsListBox from "./home/news"
import videos from "./home/videos"
import photos from "./home/photos"
import place from "./home/place"
import {banner, competition, hot,newslist} from "@/api/home/home"
 export default {
   data () {
      return {
        domain:"",
        show:false,
        homeOption:{
          // loop:true,
          // autoplay:true,
          // loopAdditionalSlides:1,
          // observer:true,
          // observeParents:true,
          pagination: {
            el: '.home-swiper-pagination',
            clickable :true,
          },
        },
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
      ],
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
  
    // banner
     banner().then(
        res=>{
          if(res.status ===200){
            let _base = res.data.data
            this.domain  = _base.domain
            this.homeSwiper = _base.banner
            this.show = true
          }else{
            this.$message.error(res.data.error)
          }
        }
     )
      newslist().then(res=>{
       if(res.status ===200){
         let _base = res.data.data
         this.domain = _base.domain
         this.textList = _base.threeNews
       }
     })
   },
  mounted(){
    
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
    },
  },
    components: {
      swiper,
      swiperSlide,
      newsListBox,
      photos,
      place,
      videos,
      
    }
 }
</script>

<style lang="stylus" scoped>
#home
  z-index 1
  main
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
            width 480px
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
          width 100%
          display flex
          justify-content center
          position relative
          .team
            width (100/3)%
            max-width 466px
            height 580px
            position relative
            display flex
            align-items flex-start
            padding-top 170px
            .teamPosition
              width 100%
              .teamImgBox
                display flex
                justify-content space-between
                align-items center
                padding 20px 60px
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
          .allTeam
            width 220px
            height 50px
            position absolute
            transform translateX(-50%)
            cursor pointer
            left 50%
            bottom 60px
            background-color #ff8b47
            color #fff
            font-size 24px
            line-height 50px

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
      padding-bottom 40px
    .placeText
      display flex
      justify-content center
      padding-top 60px
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
</style>
<style lang="stylus">

  
#home

  min-width 1400px
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



