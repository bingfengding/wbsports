import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
const home = r =>
  require.ensure([], () => r(require("@/view/home.vue")), "home")
const event = r =>
  require.ensure([], () => r(require("@/view/event.vue")), "event")
const article = r =>
  require.ensure([], () => r(require("@/view/article.vue")), "article")
const news = r =>
  require.ensure([], () => r(require("@/view/news.vue")), "news")
const videos = r =>
  require.ensure([], () => r(require("@/view/videos.vue")), "videos")
Vue.use(Router)

export const RouterMap = [
  {
    path: "",
    redirect: "home"
  },{
    path: '/home',
    name: 'home',
    component: home
  },
  {
    path: '/article',
    name: 'article',
    component: article
  },
  {
    path: '/event',
    name: 'event',
    component: event
  },
  {
    path: '/news',
    name: 'news',
    component: news
  },
  {
    path: '/videos',
    name: 'videos',
    component: videos
  },
];

const router = new Router({
   //mode: 'history', // require service support
  scrollBehavior: () => ({
    y: 0
  }),
  routes: RouterMap
});

router.beforeEach((to, from, next) => {
  // store.commit('setName',to.name)
  // window.sessionStorage.setItem('name',to.name)
  let locationA = window.location
  let hostname = window.location.hostname
  
  let re = /^www/
  let isH5 = re.test(hostname)
  function IsPC() {
    var userAgentInfo = navigator.userAgent;
    var Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone",
      "iPad", "iPod"
    ];
    var flag = true;
    for (var v = 0; v <
      Agents.length; v++) {
      if (userAgentInfo.indexOf(Agents[v]) > 0) {
        flag = false;
        break;
      }
    }
    return flag;
  }
  if(IsPC()){
    
    next()
  }else{
    window.location.href = "http://m.wanbosports.com"
    if(isH5){//手机端点击了电脑网站
  
      // let newName = hostname.replace(/www/,'m')
      
      // window.location.href = locationA.protocol +"//"+ newName
      
    }
    next()
  }
  
})
export default router;