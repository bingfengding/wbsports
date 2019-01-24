<template>
  <div id="wfocus" >
    <div class="wfoucusBox" v-if="show">
      <div class="items" v-for="(item,index) in items" :key="index">
        <div class="itemLeft">
          <div class="itemMain">
            每周焦点
          </div>
          <div class="itemTitle">
            {{item.cn_title}}
          </div>
          <div class="itemSummary">
            {{item.summary}}
          </div>
        </div>
        <div class="itemRight">
          <div class="item" :style="'backgroundImage:url('+domain+item.image+')'">
            <div class="itemShare">
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
            
            <div class="itemModel">
              <div class="textBox" @click="openVideo(index,'item')">
                  <div class="textImgBox">
                    <img class="textImg" src="../../image/home/videos/playButton.png" alt="">
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
        <player :video-url = "baseVideo" :state = "state" class="player" ></player>
      </div>
    </div>
   </transition>



  </div>
</template>
<script>
import player from '@/components/player'
import {focusVideos} from "@/api/home/home"
export default {
  name :'wfocus',
  data(){
    return{
      domain:"",
      show:false,
      ifShowVideo:false,
      state:false,
      baseVideo:require("../../image/home/videos/1.mp4"),
      items:[
        {
          cn_name:"英超",
          image:require("../../image/home/banner_01.png"),
          cn_title:"曼城VS狼队",
          summary:'特訴紀出是！的家星，家車重、有我科士子認名活少觀造人他經如生長，定超四自，設容時微夠影於失響隨……那我人品角死；集進日父。母遠清苦源記實也。顯心工時南念？無師火景市證、人是了光年資童國那的出求地百他已指最我部。事系小樣部做研。',
          createtime: "15.09.2018",
          url:"https://ks3-cn-beijing.ksyun.com/wbs/epl/0115/manc_wolves.mp4",
          id:1,
          status:1,
        }
      ]
    }
  },
  created(){
    focusVideos({focus:"wfocus"}).then(
        res=>{
          if(res.status ===200){
          this.domain = res.data.data.domain
          let _base = res.data.data
          this.items = _base.wFocusVideos
          // console.log(this.items)
          this.show = true
          }else{
            this.$message.error(res.data.error)
          }
        }
     )
  },
  methods:{
     openVideo(index){
      //  alert(index)
      this.ifShowVideo = true
      this.baseVideo = this.items[index].url
      this.state = false
     },   
     modelClick(){
       this.ifShowVideo = false
       this.state = true
       this.baseVideo = ""     
     },      
  },
  components:{
    player,
  }
}
</script>
<style lang="stylus" scoped>
#wfocus
  .wfoucusBox
    height 432px
    background-color #ff8b47
    display flex
    justify-content center
    align-items center
    .items
      width 1386px
      height 300px
      display flex
      justify-content space-between
      .itemLeft
        width 676px
        // background-color gray
        color #ffffff
        .itemMain
          font-size 48px
          padding 30px 0
        .itemTitle
          padding-bottom 16px
          font-size 30px
        .itemSummary
          line-height 30px
          height 88px
          overflow hidden

      .item
        width 552px
        height 300px
        background-size cover
        background-position center center
        margin-bottom 30px
        position relative

        .itemShare
          width 132px
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
              width 20px
              height 20px
              .itemIconA
                color #ffffff
                width 20px
                height 20px
                .icon
                  height 20px
                  width 20px
                  background-size 100%
                .weibo
                  background-image url('../../image/home/weibo.png')
                .wechat
                  background-image url('../../image/home/wechat.png')
                .insta
                  background-image url('../../image/home/insta.png')
                .twitter
                  background-image url('../../image/home/twitter.png')
                .facebook
                  background-image url('../../image/home/facebook.png')
    
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

