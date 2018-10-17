<template>
  <div class="left-steps">
    <el-steps :space="30" direction="vertical" :active="steps.active" process-status="finish" finish-status="wait">
      <el-step v-for="(item, index) in steps.step" :key="index" :title="item.title" @click.native="jump(index)"><i slot="icon"></i></el-step>
    </el-steps>
  </div>
  
</template>
<script>
  export default {
    name: '',
    data () {
      return {

      }
    },
    mounted () {
      
    },
    props: ['steps', 'top'],
    methods: {
      jump (index) {
        // 用 class="d_jump" 添加锚点
        let jump = document.querySelectorAll('.d_jump')
        let total = jump[index].offsetTop
        console.log('纵坐标', total)
        let distance = document.documentElement.scrollTop || document.body.scrollTop
        // 平滑滚动，时长500ms，每10ms一跳，共50跳
        let step = total / 50
        if (total > distance) {
          smoothDown()
        } else {
          let newTotal = distance - total + 100
          step = newTotal / 50
          smoothUp()
        }
        function smoothDown () {
          if (distance < total) {
            
            distance += step
            // Firefox
            document.documentElement.scrollTop = distance
            // Chrome
            document.body.scrollTop = distance
            setTimeout(smoothDown, 10)
          } else {
            document.documentElement.scrollTop = total
            document.body.scrollTop = total
            window.pageYOffset = total
          }
        }
        function smoothUp () {
          //console.log(step,distance,total)
          if (distance > total+step) {
            //console.log(distance,total)
            distance -= step
            // Firefox
            document.documentElement.scrollTop = distance
            // Chrome
            document.body.scrollTop = distance
            setTimeout(smoothUp, 10)
          } else {
            document.documentElement.scrollTop = total
            document.body.scrollTop = total
            window.pageYOffset = total
          }
        }
      }
    }
  }
</script>

<style lang="stylus">
.left-steps
  .speed
    text-align center
  .el-step__head 
    width: 20px;
    height: 20px;
    cursor: pointer;
  .el-step__title 
    line-height: 0;
  .el-step__icon 
    line-height: 0;
    border: 0;
    background-color: transparent;
    width:20px;
    height:20px;
    i
      width:20px;
      height:20px;
      border-radius: 50%
  .el-steps
    display flex
    justify-content flex-start
    flex-flow row nowrap
    .el-step
      height 40px
      flex-basis auto !important
      cursor pointer
      .el-step__head
        display none 
      .el-step__main
        height 40px
        text-align center
        padding 0
        .el-step__description
          display none
        .el-step__title
          display inline-block
          padding 0 20px
          height 40px
          line-height 40px
          font-size 18px
          color #868995
          
        .el-step__title.is-finish
          color #fff
    &:last-of-type
      .el-step__main
        .el-step__title
          padding-right 0    
</style>
