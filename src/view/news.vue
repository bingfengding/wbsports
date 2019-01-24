<template>
  <div id="news">
    <div class="header" :style="'backgroundImage:url('+domain+baseBanner+')'">
      <div class="headerCen">
        <div class="headerText">
          <p class="title">新闻资讯</p>
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
      <swiper class="newsSwiper" ref="newsSwiper" :options="newsOption">
      <swiper-slide class="newsSwiperSlide" :style="
      'backgroundImage:url('+domain+item.image+')'
      " v-cloak v-for="item in homeSwiper" :key="item.id">
        <div class="newsSwiperText">
          <div class="newsTitle">
            {{item.mark}}
          </div>
          <div class="newsTextContent">
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
              <div class="hover-text" @click="toArticle(item.id,'banner')">查看更多</div>
            </div>
          </div>
        </div>
      </swiper-slide>
      <div class="news-swiper-pagination" slot="pagination">
      </div>
    </swiper>
    </div>
    <div class="itemBox" ref="itemBox">
      <div class="center">
        <div class="items">
          <div class="item" v-for="(item,index) in items" :key="index">
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
                  <img src="../image/cam.png" alt="">
              </div>
              <div class="samllUrl">
                <svg viewBox="0 0 90 34" version="1.1" xmlns="http://www.w3.org/2000/svg">
                  <rect class="shape" height="34" width="90"></rect>
                </svg>
                <div class="hover-text" @click="toArticle(item.id,'news')">查看更多</div>
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
              layout="prev, pager, next, jumper"
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
  </div>
</template>

<script>
import {swiper,swiperSlide} from "vue-awesome-swiper"
import {newsmenu,news,banner,ad} from "@/api/home/home"
export default {
  data () {
    return {
      show:false,
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
      newsOption:{
        // loop:true,
        // autoplay:true,
        // observer:true,
        // observeParents:true,
        // loopAdditionalSlides:1,
        pagination: {
          el: '.news-swiper-pagination',
          clickable :true,
        },
      },
      meuns:[{
          cn_name:"全部",
          descriptoncn:"",
          id:1,     
          image: require("../image/news/swiper.jpg"),    
        }
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
     
       
        items:[
          {
            image:require("../image/news/1.jpg"),
            cn_title:"本来以为是个青铜 结果却是王者",
            cn_name:"曼联",
            startdate:"15.09.2018",
            id:1,
          },{
            image:require("../image/news/1.jpg"),
            cn_title:"本来以为是个青铜 结果却是王者",
            cn_name:"曼联",
            startdate:"15.09.2018",
            id:2,
          },{
            image:require("../image/news/1.jpg"),
            cn_title:"本来以为是个青铜 结果却是王者",
            cn_name:"曼联",
            startdate:"15.09.2018",
            id:3,
          },{
            image:require("../image/news/1.jpg"),
            cn_title:"本来以为是个青铜 结果却是王者",
            cn_name:"曼联",
            startdate:"15.09.2018",
            id:4,
          },{
            image:require("../image/news/1.jpg"),
            cn_title:"本来以为是个青铜 结果却是王者",
            cn_name:"曼联",
            startdate:"15.09.2018",
            id:5,
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
  },
  methods:{
    goUrl(url){
      window.top.open(url)
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
    toArticle(id,type){
      let _obj = {
        id,
        type
      };
      this.$store.commit('setNewsDetail',{..._obj})
      let _url = "/article?type=" + type +"&id=" +id
      this.$router.push(_url)
    },
    // 每页条数改变
    sizeChange(val){
      console.log(value)
    },
    changePageItem(){
      news(
        {
          w:'l',
          type:this.activeIndex,
          page:this.meunIndex
        }
        
      ).then(res=>{
        if(res.status===200){
          this.domain = res.data.data.domain
          let _base = res.data.data
          this.items = _base.news.rows
          this.total = _base.news.total
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

  }
}
</script>

<style lang='stylus' scoped>
#news
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
    .newsSwiper
      width 1386px
      .newsSwiperSlide
        width 1386px
        height 600px
        background-size cover
        background-position center center
        .newsSwiperText
          color #ffffff
          width 480px
          position absolute
          top 120px
          left 100px
          .newsTitle
            font-size 18px
            width 100px
            height 26px
            line-height 26px
            background-color #ff8b47
            text-align center
            margin-bottom 30px
          .newsTextContent
            font-size 60px
            line-height 60px
            font-weight 600
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
  .itemBox             
    display flex
    justify-content center
    .center
      width 1400px
      display flex
      justify-content center 
      flex-wrap wrap
      .items
        width 1400px
        padding-top 30px
        display flex
        justify-content flex-start
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
          font-size 36px
          margin 20px 0
          font-weight 600
          height 94px
          overflow hidden
          color #505050
          text-overflow ellipsis
          display -webkit-box
          -webkit-line-clamp 2
          -webkit-box-orient vertical
          word-wrap break-word
          word-break break-all
        .slideText
          width 440px
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


 
</style>
<style lang="stylus">
#news
  .newsSwiper
    .news-swiper-pagination
      position absolute
      bottom 80px
      left 100px
      z-index 10
      .swiper-pagination-bullet
        width 40px
        height 4px
        background-color #8b98a0
        border-radius 0
        opacity 1
        &.swiper-pagination-bullet-active
          background-color #ff8b47
  .el-pager
    li
      &.active
        color #ff8b47
      &:hover
        color #ff8b47
  .el-pagination 
    button
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
