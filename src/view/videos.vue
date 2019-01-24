<template>
  <div id="videos">
    <div class="header" :style="'backgroundImage:url('+domain+baseBanner+')'">
      <div class="headerCen">
        <div class="headerText">
          <p class="title">精彩视频</p>
           <swiper class="eventSwiper meunList" :options="eventOption" >
              <swiper-slide v-for="(item,index) in meuns" :key="index"  class="itemHeader" :class="item.id===activeIndex?'activeItem':''">
                <p @click="changeMeun(index)">
                  {{item.cn_name}}
                </p>
                <div class="line"></div>
              </swiper-slide>
            </swiper>


        </div>
      </div>
    </div>
    <div class="swiperBox" v-if="show">
      <swiper class="videosSwiper" ref="videosSwiper" :options="videosOption">
      <swiper-slide class="videosSwiperSlide" :style="
      'backgroundImage:url('+domain+item.image+')'
      " v-cloak v-for="(item,index) in videosSwiper" :key="index">
        <div class="videosSwiperText">
          <div class="slideText">
            <div class="ft18">
              <span class="colorOrange">{{item.cn_name}} </span>
            / {{item.createtime}}
            </div> 
            <div class="slideTitle">
              {{item.cn_title}}  
            </div>  
          </div>
        </div>
        <div class="videosSwiperShare">
          <div class="shareTitle">
            分享:
          </div>
          <div class="shareItem">
            <div class="item">
              <a class="itemIconA" :href="'http://service.weibo.com/share/share.php?appkey=&title='+item.cn_title+'&url=http://www.wanbosports.com/#/videos'" target="_blank">
                <div class="icon weibo">
                </div>
              </a>
            </div>
            <div class="item">
              <a class="itemIconA" href="" target="_blank">
                <div class="icon wechat">
                </div>
              </a>
            </div>
            <div class="item">
              <a class="itemIconA" href="" target="_blank">
                <div class="icon insta">
                </div>
              </a>
            </div>
            <div class="item">
              <a class="itemIconA" :href="'https://twitter.com/share?text='+item.cn_title+'&url=http://www.wanbosports.com/#/videos'" target="_blank">
                <div class="icon twitter">
                </div>
              </a>
            </div>
            <div class="item">
              <a class="itemIconA" :href="'https://www.facebook.com/sharer.php?title='+item.cn_title+'&u=http://www.wanbosports.com/#/videos'" target="_blank">
                <div class="icon facebook">
                </div>
              </a>
            </div>
            
          </div>
        </div>
        
        <div class="swiperModel">
          <div class="textBox" @click="openVideo(index,'banner')">
              <div class="textImg">
                <img src="../image/home/videos/playButton.png" alt="">
              </div>
          </div>
        </div>  
      <div class="videos-swiper-button-prev swiper-button-prev"></div><!--左箭头-->
      <div class="videos-swiper-button-next swiper-button-next"></div><!--右箭头-->  
      </swiper-slide>
      

      <div class="videos-swiper-pagination" slot="pagination">
      </div>
    </swiper>
    </div>
    <wfocus></wfocus>
    <div class="itemBox" ref="itemBox">
      <div class="center">
        <div class="items">
          <div class="item" :style="'backgroundImage:url('+domain+item.image+')'" v-for="(item,index) in items" :key="index">
            <div class="videosItemText">
              <div class="itemText">
                <div class="ft18">
                  <span class="colorOrange">{{item.cn_name}} </span>
                / {{item.createtime}}
                </div> 
                <div class="itemTitle">
                  {{item.cn_title}}  
                </div>  
              </div>
            </div>

            <div class="itemShare">
              <div class="shareTitle">
                分享:
              </div>
              <div class="shareItem">
                <div class="item">
                  <a class="itemIconA" href="http://service.weibo.com/share/share.php?appkey=&title=填上你的标题&url=http://example.com&searchPic=false&style=simple" target="_blank">
                    <div class="icon weibo">
                    </div>
                  </a>
                </div>
                <div class="item">
                  <a class="itemIconA" href="" target="_blank">
                    <div class="icon wechat">
                    </div>
                  </a>
                </div>
                <div class="item">
                  <a class="itemIconA" href="" target="_blank">
                    <div class="icon insta">
                    </div>
                  </a>
                </div>
                <div class="item">
                  <a class="itemIconA" href="https://twitter.com/share?text=填上你的标题&url=http://example.com" target="_blank">
                    <div class="icon twitter">
                    </div>
                  </a>
                </div>
                <div class="item">
                  <a class="itemIconA" href="https://www.facebook.com/sharer.php?title=填上你的标题&u=http://example.com" target="_blank">
                    <div class="icon facebook">
                    </div>
                  </a>
                </div>
                
              </div>
            </div>
            

            <div class="itemModel">
              <div class="textBox" @click="openVideo(index,'item')">
                  <div class="textImgBox">
                    <img class="textImg" src="../image/home/videos/playButton.png" alt="">
                  </div>
              </div>
            </div>  

          </div>
        </div>
        <div class="paginationBox">
          <div class="block">
            <el-pagination
              @current-change="currentChange"
              :current-page.sync="currentPage"
              :page-size="basePageSize"
              layout="prev, pager, next"
              :total="total">
            </el-pagination>
          </div>
        </div>
      </div>
    </div>
    <div class="adBox">
      <div class="center" v-if="item.pin" v-for="(item,index) in adBox" :key="index" @click="goUrl(item.url)" :style="'backgroundImage:url('+domain+item.image+')'">
        <!-- <img :src="domain + item.image" alt=""> -->
      </div>
    </div>

   <transition name="el-fade-in">
    <div class="model" v-show="ifShowVideo" @click="modelClick">
      <div class="videoBox" @click.stop>
        <player :video-url = "baseVideo" :state = "state" class="player" ></player>
      </div>
    </div>
   </transition>

  </div>
</template>

<script>
import {swiper,swiperSlide} from "vue-awesome-swiper"
import {newsmenu,videosPage,focusVideos,ad} from "@/api/home/home"
import player from '@/components/player'
import wfocus from './home/wfocus'
export default {
  data () {
    return {
      show:false,
      ifShowVideo:false,
      state:false,
      baseVideo:require("../image/home/videos/1.mp4"),
      itemBaseVideo:require("../image/home/videos/1.mp4"),
      baseHeight:0,
      total:1,
      activeIndex:null,
      meunIndex:1,
      domain:"",
      basePageSize:12,
      currentPage:1,
      eventOption:{
        slidesPerView: 'auto'
      },
      baseBanner:require("../image/news/swiper.jpg"),
      adBox:[
        {
          id:1,
          image:require("../image/home/ad1.png"),
          pin:null,
          title:"",
          url:""
        }
      ],
      videosOption:{
        // loop:true,
        // autoplay:true,
        // observer:true,
        // observeParents:true,
        // loopAdditionalSlides:1,
        pagination: {
          el: '.videos-swiper-pagination',
          clickable :true,
        },
        navigation:{
          nextEl:'.videos-swiper-button-next',
          prevEl:".videos-swiper-button-prev"
        }
      },
      meuns:[{
          cn_name:"全部",
          descriptoncn:"",
          id:1,     
          image: require("../image/news/swiper.jpg"),    
        }
      ],
      videosSwiper:[
        {
          cn_name:"英超",
          image:require("../image/home/banner_01.png"),
          cn_title:"曼城VS狼队",
          createtime: "15.09.2018",
          url:"https://ks3-cn-beijing.ksyun.com/wbs/epl/0115/manc_wolves.mp4",
          id:1,
          status:1,
        },
        {
          cn_name:"亚洲杯",
          image:require("../image/home/banner_01.png"),
          cn_title:"印度VS巴林",
          createtime: "15.09.2018",
          url:"https://ks3-cn-beijing.ksyun.com/wbs/afc/0114/india_bahrain.mp4",
          id:1,
          status:1,
        },
        {
          cn_name:"意甲",
          image:require("../image/home/banner_01.png"),
          cn_title:"黎巴嫩VS沙特阿拉伯",
          createtime: "15.09.2018",
          url:"https://ks3-cn-beijing.ksyun.com/wbs/afc/0113/lebanon_saudi.mp4",
          id:1,
          status:1,
        }
      ],
      
        items:[
          {
            cn_name:"意甲",
            image:require("../image/home/banner_01.png"),
            cn_title:"罗马VS恩特拉",
            createtime: "15.09.2018",
            url:"https://ks3-cn-beijing.ksyun.com/wbs/copa%20italia/0115/roma_entella.mp4",
            id:1,
            status:1,
          },{
            cn_name:"德甲",
            image:require("../image/home/banner_01.png"),
            cn_title:"博洛尼亚VS尤文图斯",
            createtime: "15.09.2018",
            url:"https://ks3-cn-beijing.ksyun.com/wbs/copa%20italia/0113/bologna_juventus.mp4",
            id:1,
            status:1,
          },{
            cn_name:"亚洲杯",
            image:require("../image/home/banner_01.png"),
            cn_title:"国际米兰VS贝内文托",
            createtime: "15.09.2018",
            url:"https://ks3-cn-beijing.ksyun.com/wbs/copa%20italia/0114/inter_benevento.mp4",
            id:1,
            status:1,
          },{
            cn_name:"欧冠",
            image:require("../image/home/banner_01.png"),
            cn_title:"森多利亞VSAC米兰",
            createtime: "15.09.2018",
            url:"https://ks3-cn-beijing.ksyun.com/wbs/afc/0113/n.korea_qatar.mp4",
            id:1,
            status:1,
          },{
            cn_name:"英超",
            image:require("../image/home/banner_01.png"),
            cn_title:"西汉姆VS阿森纳",
            createtime: "15.09.2018",
            url:"https://ks3-cn-beijing.ksyun.com/wbs/epl/0113/westham_arsenal.mp4",
            id:1,
            status:1,
          },
        ]
      
    }
  },
  created(){
    newsmenu().then(res=>{
      if(res.status===200){
        this.domain = res.data.data.domain
        let _base =res.data.data
        this.meuns= _base.menu
        this.activeIndex = this.meuns[0].id
        this.baseBanner = this.meuns[0].image
      }
    }).then(res=>{
      this.changePageItem()
    })
    focusVideos({focus:"banner"}).then(
        res=>{
          if(res.status ===200){
          this.domain = res.data.data.domain
          let _base = res.data.data
          this.videosSwiper = _base.videosSwiper
          this.show = true
          }else{
            this.$message.error(res.data.error)
          }
        }
     )
     ad({type:"news"}).then(res=>{
        let _base = res.data.data
        this.adBox = _base.ad
     })
  },
  mounted(){
    this.$nextTick(()=>{
      window.addEventListener('scroll',this.scroll)
     this.baseHeight = this.$refs.itemBox.offsetTop
    })
    // this.$nextTick(()=>{
    //   this.baseVideo = this.videosSwiper[0].url
    //   // alert(this.baseVideo)
    // })

  },
  methods:{
    goUrl(url){
      window.top.open(url)
    },
     openVideo(index,value){
       this.ifShowVideo = true
       if(value == 'banner'){
         this.baseVideo = this.videosSwiper[index].url
        //  alert(this.baseVideo)
       }else if(value == 'item'){
         this.baseVideo = this.items[index].url
        //  alert(this.baseVideo)
       }
      //  alert(this.baseVideo)
       this.state = false
     },   
     modelClick(){
       this.ifShowVideo = false
       this.state = true
       this.baseVideo = ""     
     },
    scroll(){
      
    },
    // 改变菜单选项
    changeMeun(index){
      this.activeIndex = this.meuns[index].id
      this.baseBanner = this.meuns[index].image
      this.meunIndex = 1
      this.changePageItem()
    },
    // 跳转对应文章
    // toArticle(id,type){
    //   let _obj = {
    //     id,
    //     type
    //   };
    //   this.$store.commit('setNewsDetail',{..._obj})
    //   let _url = "/article?type=" + type +"&id=" +id
    //   this.$router.push(_url)
    // },
    // 每页条数改变
    sizeChange(val){
      console.log(value)
    },
    changePageItem(){
      videosPage(
        {
          w:'l',
          type:this.activeIndex,
          page:this.meunIndex
        }
        
      ).then(res=>{
        if(res.status===200){
          this.domain = res.data.data.domain
          let _base = res.data.data
          this.items = _base.videos.rows
          // alert(this.items)
          this.total = _base.videos.total
        }
      })
    },
    // 当前页改变
    currentChange(val) {
      this.meunIndex = val
      this.changePageItem()
      let distance = document.documentElement.scrollTop || document.body.scrollTop
      let total = this.baseHeight
      let step = total / 20
      function smoothUp(){
        if(total <= distance){
        distance -= step
        document.documentElement.scrollTop = distance
        document.body.scrollTop = distance
        setTimeout(smoothUp, 10)
      }else{
        document.documentElement.scrollTop = total
        document.body.scrollTop = total
      }
      }
      smoothUp()
    }
  },
  components: {
    player,
    wfocus
  }
}
</script>

<style lang='stylus' scoped>
#videos
  padding 0px
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
  .adBox
    display flex
    justify-content center
    .center
      width 1365px
      height 200px
      cursor pointer
      margin 20px 0
      background-position center center
      background-size cover
      img
        width 100%
        height 100%
  .header
    height 380px
    display flex
    justify-content center
    background-position center center
    background-size cover
    .headerCen
      width 1386px
      height 100%
      position relative
      .headerText
        width 1386px
        position absolute
        left 0
        bottom 60px
        .title
          font-weight 600
          font-size 84px
          color #ff8b47
          padding-bottom 30px
        .meunList
          .itemHeader
            margin-right 60px
            cursor pointer
            .line
              width 100%
              height 7px
              background-color transparent
            p
              font-size 36px
              color #868686
              line-height 64px
            &.activeItem
              .line
                background-color #ff8b47
              p
                color #ff8b47
  .swiperBox
    display flex
    justify-content center
    padding-top 40px
    padding-bottom 40px
    .videosSwiper
      width 1386px
      .videosSwiperSlide
        width 1386px
        height 600px
        background-size cover
        background-position center center
        .videosSwiperText
          color #ffffff
          width 480px
          height 100px
          position absolute
          bottom 120px
          left 100px
          // background-color gray
          .slideText
            width 400px
            // background-color #ffffff
            height 100px
            overflow hidden
            .slideTitle
              line-height 100px
              font-size 48px
            .colorOrange
              color #ff8b47
        .videosSwiperShare
          width 226px
          position absolute
          right 56px
          top 60px
          .shareTitle
            font-size 30px
            display flex
            justify-content flex-end
            color #ffffff
            margin-bottom 10px
          .shareItem
            display flex
            justify-content center
            .item
              width 33px
              height 33px
              margin 0 8px
              .itemIconA
                color #ffffff
                width 33px
                height 33px
                .icon
                  width 33px
                  height 33px
                  background-size 100%
                .weibo
                  background-image url('../image/home/weibo.png')
                .wechat
                  background-image url('../image/home/wechat.png')
                .insta
                  background-image url('../image/home/insta.png')
                .twitter
                  background-image url('../image/home/twitter.png')
                .facebook
                  background-image url('../image/home/facebook.png')
          .colorOrange
            color #ff8b47
        .swiperModel
          display flex
          justify-content center
          align-items center
          text-align center
          width 100%
          height 100%
          background-color rgba(0,0,0,0.6)
          .textBox
            color #ffffff
            font-size 30px
            &:hover
              cursor pointer
  .itemBox             
    display flex
    justify-content center
    .center
      width 1386px
      display flex
      justify-content center 
      flex-wrap wrap
      .items
        width 1386px
        padding-top 30px
        display flex
        justify-content space-between
        flex-wrap wrap
        .item
          width 668px
          height 468px
          background-size cover
          background-position center center
          margin-bottom 30px
          position relative
          .videosItemText
            color #ffffff
            width 480px
            height 86px
            position absolute
            bottom 30px
            left 26px
            // background-color gray
            .itemText
              width 400px
              // background-color #ffffff
              height 86px
              overflow hidden
              .itemTitle
                line-height 86px
                font-size 36px
              .colorOrange
                color #ff8b47  
          .itemShare
            width 140px
            position absolute
            right 32px
            top 30px
            .shareTitle
              font-size 18px
              display flex
              justify-content flex-end
              color #ffffff
              margin-bottom 10px
            .shareItem
              display flex
              justify-content space-between
              .item
                width 22px
                height 22px
                .itemIconA
                  color #ffffff
                  width 22px
                  height 30px
                  .icon
                    height 22px
                    width 22px
                    background-size 100%
                  .weibo
                    background-image url('../image/home/weibo.png')
                  .wechat
                    background-image url('../image/home/wechat.png')
                  .insta
                    background-image url('../image/home/insta.png')
                  .twitter
                    background-image url('../image/home/twitter.png')
                  .facebook
                    background-image url('../image/home/facebook.png')

        .itemModel
          display flex
          justify-content center
          align-items center
          text-align center
          width 100%
          height 100%
          background-color rgba(0,0,0,0.6)
          .textBox
            color #ffffff
            font-size 30px
            &:hover
              cursor pointer
            .textImgBox
              .textImg
                height 100px
                width 100px
                
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
      fill transparent
      stroke-width 2px
      stroke #ff8b47
      stroke-dasharray 60 188
      stroke-dashoffset 110
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
        animation draw 0.5s linear forwards
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

 
</style>
<style lang="stylus">
#videos
  .videosSwiper
    .videos-swiper-pagination
      position absolute
      bottom 80px
      margin-left 100px
      z-index 10
      .swiper-pagination-bullet
        width 40px
        height 4px
        background-color #8b98a0
        border-radius 0
        opacity 1
        &.swiper-pagination-bullet-active
          background-color #ff8b47
    .videos-swiper-button-prev
      margin-left 54px
      background-image url("../image/home/left.png")
      &:focus
        outline-width 0px
    .videos-swiper-button-next
      margin-right 54px
      background-image url("../image/home/right.png")
      &:focus
        outline-width 0px

  .el-pager
    li
      color #dbdbdb
      font-size 26px
      &.active
        color #ff8b47
      &:hover
        color #ff8b47
  .el-pagination 
    button
      .el-icon
        font-size 26px
      &:hover
        color #ff8b47
    .el-input
      .el-input__inner
        &:focus
          border-color #ff8b47
  .itemHeader 
    width auto 
    height auto
</style>
