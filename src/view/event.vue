<template>
  <div id="event">
    <div class="header" :style="'backgroundImage:url('+domain+baseBanner+')'">
      <div class="headerCen">
        <div class="headerText">
          <p class="title">最新赛事</p>
          <ul class="meunList">
            <li v-for="(item,index) in meuns" :key="index" @click="changeMeun(index)" class="itemHeader" :class="item.id===activeIndex?'activeItem':''">
              <p>
                {{item.cn_name}}
              </p>
              <div class="line"></div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="main">
      <div class="mainCen">
        <div class="mainLeft">
          <div class="roundsBox">
            <div class="rounds">
              <ul class="animated" :class="showAllRounds?'showAllRounds':''">
                <li v-for="(item,index) in defaultList.roundlist" :key="index" class="roundsItem" :class="activeRounds===item.round?'activeRounds':''"
                @click="changeRounds(index)"
                >
                  {{item.round}}
                </li>
              </ul>
            </div>
            <div class="allRounds animated">
              <div class="btn" @click="showAllRoundsFn" >
                <span>{{showAllRounds?'隐藏部分':'展开全部'}}</span>
                <i :class="showAllRounds?'down':''"></i>
              </div>
            </div>
          </div>
          <div class="roundsList">
            <div class="roundsListItem" v-for="(item,index) in schedule" :key="index">
              <dir class="center">
                <div class="roundsListLeft">
                  <div class="teamData">
                    <div class="teamName">
                      <div class="teamDataImg">
                        <img :src="item.home_image" alt="">
                      </div>
                      <p>{{item.home_name}}</p>
                    </div>
                    <div class="teamScore">
                      {{item.home_scores}}
                    </div>
                  </div>
                  <div class="teamData">
                     <div class="teamName">
                      <div class="teamDataImg">
                        <img :src="item.away_image" alt="">
                      </div>
                      <p>{{item.away_name}}</p>
                    </div>
                    <div class="teamScore">
                      {{item.away_score}}
                    </div>
                  </div>
                </div>
                <div class="roundsListRight">
                  <p>{{item.time}}</p>
                  
                </div>
              </dir>
            </div>
          </div>
          <div class="adBox2">
            <div class="center" v-if="item.pin ==3" v-for="(item,index) in adBox" :key="index" @click="goUrl(item.url)" :style="'backgroundImage:url('+domain+item.image+')'">
              <!-- <img :src="domain + item.image" alt=""> -->
            </div>
          </div>
        </div>
        <div class="mainRight">
          <div class="adBox1">
            <div class="center" v-if="item.pin ==1" v-for="(item,index) in adBox" :key="index"  @click="goUrl(item.url)" :style="'backgroundImage:url('+domain+item.image+')'">
              <!-- <img :src="domain + item.image" alt=""> -->
            </div>
          </div>
          <p class="title">
            {{ranking.title}}
          </p>
          <div class="integralBox">
            <ul>
              <li class="integralItem">
                <p class="num">排名</p>
                <p class="team">球队</p>
                <p class="comparison">胜/平/负</p>
                <p class="fraction">积分</p>
              </li>
              <li class="integralItem" v-for="(item,index) in ranking.list" :key="index">
                <p class="num" :class="'num'+ (index+1)">{{item.sortorder}}</p>
                <div class="team">
                  <div class="teamImg"><img :src="item.image" alt=""></div>
                  <span>{{item.name}}</span>
                </div>
                <p class="comparison">{{item.win}}/{{item.level}}/{{item.lose}}</p>
                <p class="fraction">{{item.ranking}}</p>
              </li>
            </ul>
          </div>
          <div class="adBox1">
            <div class="center" v-if="item.pin ==2" v-for="(item,index) in adBox" :key="index" :style="'backgroundImage:url('+domain+item.image+')'">
              <!-- <img :src="domain + item.image" alt=""> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {newsmenu,schedule,schedulemenu,ad} from "@/api/home/home"
export default {
  data () {
    return {
      activeRounds:"",
      showAllRounds:false,
      // meunIndex:1,
      season:"",
      activeIndex:null,
      domain:"",
      baseBanner:require("../image/news/swiper.jpg"),
      adBox:[ {
          id:1,
          image:require("../image/home/ad1.png"),
          pin:null,
          title:"",
          url:""
        }],
      meuns:[{
        cn_name:"全部",
        descriptoncn:"",
        id:1,
        image: require("../image/news/swiper.jpg"),    
      }
      ],
    
        defaultList:{
          round:"",
          total:20,
          roundlist:[
            {
              round:"第一轮"
            }
          ]
        },
        schedule:[
          {
            away_image:require('../image/event/logo_1.jpg'),
            away_name:"曼城",
            away_score:"-",
            home_image:require('../image/event/logo_1.jpg'),
            home_name:"曼城",
            home_scores:"-",
            id:1,
            round:"第一轮",
            season:"123",
            time:"2018-09-01",
            wanbo_league:"英超"
          }
        ],
        ranking:{
          title:"英超积分榜",
          list:[
            {
              name:"曼城",
              win:10,
              ranking:2,
              level:3,
              id:1,
              sortorder:1,
              lose:20,
              image:require("../image/event/logo_1.jpg")
            }
          ]
        }
    }
  },
  created(){
    schedulemenu().then(res=>{
      if(res.status===200){
        this.domain = res.data.data.domain
        let _base =res.data.data
        this.meuns= _base.menu
        this.activeIndex = this.meuns[0].id
        this.baseBanner = this.meuns[0].image
        this.chooseMenu(this.activeIndex)
      }
    })
    ad({type:"event"}).then(res=>{
      if(res.status===200){
  
        let _base =res.data.data
        this.adBox = _base.ad
      }
    })
    
  },
  methods:{
    // 变更赛事数据
    chooseMenu(id){
      schedule({id}).then(res=>{
        if(res.status===200){
          let _base = res.data.data
          this.domain = _base.domain
          this.activeRounds = _base.default.round
          this.defaultList = _base.default
          this.schedule = _base.schedule
          this.ranking = _base.ranking
          this.season = _base.default.season
        }
      })
    },
    // 改变菜单选项
    changeMeun(index){
      this.activeIndex = this.meuns[index].id
      this.baseBanner = this.meuns[index].image
      this.showAllRounds = false
      this.chooseMenu(this.activeIndex)
    },
    // 显示全部轮次
    showAllRoundsFn(){
      if(this.showAllRounds){
        this.showAllRounds = false
      }else{
        this.showAllRounds = true
      }
    },
    //切换轮次
    changeRounds(index){
      this.activeRounds = this.defaultList.roundlist[index].round
      schedule({
        id:this.activeIndex,
        season:this.season,
        round:this.activeRounds
        }).then(res=>{
        if(res.status===200){
          let _base = res.data.data
          // this.defaultList = _base.default
          this.schedule = _base.schedule
          // this.ranking = _base.ranking
  
        }
      })
    },
    goUrl(url){
      window.top.open(url)
    }
  },
  components: {

  }
}
</script>

<style lang='stylus' scoped>
#event
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
          display flex
          justify-content flex-start
          .itemHeader
            margin-right 40px
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
  .main
    padding-top 40px
    display flex
    justify-content center
    .mainCen
      width 1400px
      display flex
      justify-content space-between
      padding-bottom 40px
      .mainLeft
        min-width 920px
        .roundsBox
          .rounds
            ul
              display flex
              justify-content flex-start
              flex-wrap wrap
              height 140px
              overflow hidden
              &.showAllRounds
                height auto
              li
                width 140px
                height 50px
                border 2px solid #ff8b47
                color #ff8b47
                text-align center
                line-height 50px
                font-size 24px
                margin-right 54px
                cursor pointer
                margin-bottom 20px
                &:nth-of-type(5n)
                  margin-right 0
                &.activeRounds
                  background-color #ff8b47
                  color #fff
          .allRounds
            display flex
            justify-content center
            padding-top 20px
            
            .btn
              width 220px
              height 50px
              line-height 50px
              color #fff
              font-size 24px
              text-align center
              background-color #ff8b47
              display flex
              justify-content center
              align-items center
              cursor pointer
              i
                margin-left 10px
                width 20px
                height 10px
                overflow hidden
                border-width 0 10px 10px 10px
                border-style solid
                border-color transparent transparent #fff transparent
                transition all 0.2s ease
                &.down
                  transform rotate(180deg)
        .adBox2
          .center
            max-width 920px
            height 200px
            cursor pointer
            background-position center center
            background-size cover
            img
              width 100%
              height 100%
        .roundsList
          display flex
          justify-content flex-start
          flex-wrap wrap
          width 920px
          padding 40px 0
          .roundsListItem
            width 50%
            height 140px
            display flex
            justify-content center
            align-items center
            border 1px solid #e8e8e8
            .center
              height 90px
              width 100%
              display flex
              justify-content center
              .roundsListLeft
                min-width 67%
                border-right 2px solid #f1f1f1
                padding-left 30px
                display flex
                align-items center
                justify-content flex-start
                flex-wrap wrap
                .teamData
                  display flex
                  justify-content space-between
                  width 100%
                  padding-right 20px
                  &:first-of-type
                    margin-bottom 10px
                  .teamName
                    display flex
                    justify-content flex-start
                    .teamDataImg
                      width 30px
                      height 30px
                      margin-right 20px
                      img
                        max-width 100%
                        max-height 100%
                        width auto
                        height auto
              .roundsListRight
                min-width 33%
                padding 0 30px
                text-align center
                line-height 30px
                display flex
                justify-content center
                align-items center
      .mainRight
        min-width 420px
        .adBox1
          display flex
          justify-content center
          .center
            width 410px
            height 330px
            cursor pointer
            background-position center center
            background-size cover
            img
              width 100%
              height 100%


        .title
          color #ff8b47
          font-size 48px
        .integralBox
          padding 30px 0
          ul
            li
              display flex
              justify-content space-between
              align-items center
              padding 0 10px
              height 50px
              &:nth-of-type(2n+1)
                background-color #f1f1f1
              .num
                min-width 40px
                text-align center
                &.num1
                  color #ff1915
                &.num2
                  color #ffa300
                &.num3
                  color #0fae32
              .team
                display flex
                justify-content flex-start
                align-items center
                min-width 140px
                span
                  line-height 50px
                .teamImg
                  width 30px
                  height 30px
                  margin-right 4px
                  img
                    max-width 30px
                    max-height 30px
                    width auto
                    height auto
              .comparison
                min-width 70px
              .fraction
                min-width 40px
                text-align center

</style>
