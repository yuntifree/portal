import Vue from 'vue'
import wifilink from './wifilink.vue'
import VueRouter from 'vue-router'
import VueLazyload from 'vue-lazyload'

import store from './store.js'
Vue.use(VueLazyload)
Vue.use(VueRouter)


var initFont = require('./common/font.js')
initFont(true);
/* eslint-disable no-new */

import wifiinfo from './components/wifiinfo'
import service from './components/service'
import news from './components/news'
import hotspot from './components/hotspot.vue'
import live from './components/live.vue'
import entertainment from './components/entertainment.vue'

window.onerror =  function handleErr(msg,url,l) {
    var txt;
    txt="本页中存在错误。\n\n"
    txt+="错误：" + msg + "\n"
    txt+="URL: " + url + "\n"
    txt+="行：" + l + "\n\n"
    txt+="点击“确定”继续。\n\n"
    //alert(txt);
    return true
}
const router = new VueRouter({
  mode: 'hash',
  base: __public__,
  routes: [
    {
      path: '/home',
      name: 'home',
      component: wifiinfo,
    },{
      path: '/service',
      name: 'service',
      component: service,
    },{
      path: '/news',
      name: 'news',
      component: news,
    },{
      path: '/hotspot',
      name: 'hotspot',
      component: hotspot,
    },{
      path: '/live',
      name: 'live',
      component: live,
    },{
      path: '/entertainment',
      name: 'entertainment',
      component: entertainment,
    },{
      path: '*',
      redirect: 'home',
    }
  ]
})

new Vue({
  store,
  router,
  el: '#wifilink',
  template: '<wifilink/>',
  components: { wifilink },
  mounted() {
    this.$nextTick(()=> {
      //alert('wifilink'+3);
      //router.push({ name: 'default', params: { id: 'newest'}});
    })
  }
})
