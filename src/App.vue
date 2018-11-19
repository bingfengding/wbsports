<template>
  <div id="app">
    <Bg-header></Bg-header>
    <keep-alive>
      <router-view/>
    </keep-alive>
    <weibo></weibo>
  </div>
</template>

<script>
import BgHeader from "./components/header"
import weibo from "./components/weibo"
export default {
  name: 'App',
  components:{
    BgHeader,
    weibo
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-width: 1400px;
}
</style>
