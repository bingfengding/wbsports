<template>
  <div id="header">
    <header>
      <hbox class="header" :pose="headerShow?'show':'hide'">
        <div class="headerLeft" :class="headerShow?'':'hideBorder'">
          <div class="svgBox1">
            <hbox-left class="svgBox" :pose="headerShow?'show':'hide'"
          @click.native="goto('/home')"
          ></hbox-left>
          </div>
          
        </div>
        <div  class="headerRight"  :pose="headerShow?'show':'hide'">
          <hbox-right  class="headerTop">
            <div class="fenBox">
              <div class="fenxiangBox">
                <a href="https://twitter.com/wanbosports?lang=en" target="_blank">
                  <div class="instagram fenItem"></div>
                </a>
                <a href="https://www.facebook.com/wanbosports/" target="_blank">
                <div class="facebook fenItem"></div>
                </a>
                <a href="https://twitter.com/wanbosports?lang=en" target="_blank">
                <div class="twitter fenItem"></div>
                </a>
              </div>
            </div>
          </hbox-right>
          <div class="headerBottom">
            <div class="list-shortcut">
              <div class="step">
                <div class="rlBox" v-for="(item,index) in steps" :key="index" @click="changeIndex(index)">
                  <router-link :to="item.url" :class="activeIndex === index?'active':''">{{item.title}}</router-link>
                </div>
                
              </div>
            </div>
          </div>
        </div>

      </hbox>
    </header>
  </div>
</template>

<script>
import posed from 'vue-pose'
export default {
  data () {
    return {
      headerShow:true,
      activeIndex:0,
        steps:[
          {
            title:"首页",
            url:"/home"
          },
          {title:"最新赛事",
            url:"/event"
          },
          {title:"新闻资讯",
            url:"/news"
          },
        ],
      }
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
      if(scrolled===0){
        this.headerShow = true
      }else{
        this.headerShow = false
      }
    },
    changeIndex(index){
      if(this.activeIndex != index){
        this.activeIndex =index
      }
    },
    goto(url){
      this.$router.push(url)
    }
  },
  watch:{
    $route(to,from){
      if(to.name === 'home'){
        this.activeIndex = 0
      }else if(to.name ==="event"){
        this.activeIndex =1
      }else if(to.name === 'news'){
         this.activeIndex =2
      }else {
        this.activeIndex =2
      }
    }
  },
  components: {
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

<style lang='stylus' scoped>
#header
  height 150px
  background-color #080f21
  //background-color red
  header
    z-index 99
    position fixed
    top 0
    left 0
    width 100%
    // min-width 1400px
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
        .svgBox1
          width 240px
          display flex
          justify-content flex-start
        .svgBox
          width 120px
          height 40px
          background url("../image/home/logo_05.svg") no-repeat
          background-size 100% auto
          background-position: 0 0
          cursor pointer
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
          .fenxiangBox
            display flex
            align-items center
            a
              margin-left 30px
            .fenItem
              height 30px
              width 30px
              cursor pointer
             
              &.instagram
                background url("../image/home/insta.png") no-repeat
                background-size 100% 100%
              &.facebook
                background url("../image/home/facebook.png") no-repeat
                background-size 100% 100%
              &.twitter
                background url("../image/home/twitter.png") no-repeat
                background-size 100% 100%
   
        .headerBottom
          display flex
          justify-content flex-end
          padding-right 20%
          height 70px
          align-items center
          .list-shortcut
            .step
              display flex
              justify-content flex-end
              .rlBox
                margin-left 40px
                a
                  color #868686
                  display inline-block
                  height 100%
                  width 100%
                  &.active
                    color #fff
 
</style>
