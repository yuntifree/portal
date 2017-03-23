<style lang="scss">
@import '../assets/css/common.scss';
.info {
  @include containerSize(100%, auto);
  background-color: #fff;
}
.info-top {
  @include containerSize(100%, 3.36rem);
  background-color: $baseColor;
  position: relative;
  padding-top: 0.3rem;
}
.info-logo {
  @include containerSize(0.98rem, auto);
  display: block;
  position: absolute;
  top: 0.2rem;
  left: 0.24rem;
}
.info-weather {
  position: absolute;
  top: 0.2rem;
  right: 0.24rem;
  color: #fff;
}
.weacher-icon {
  @include containerSize(0.36rem, 0.36rem);
  display: block;
}
.weather-temp {
  line-height: 0.36rem;
  margin: 0 0.1rem;
}
.weather-info,
.weather-temp{
  line-height: 0.36rem;
}
.circle-link {
  @include containerSize(2.4rem, 2.4rem);
  margin: 0 auto;
  position: relative;
  padding-top: 0.2rem;
}
.circle-link span,
.circle-link .oval-copy-3 {
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  -moz-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  -o-transform: translate(-50%, -50%);
  border-radius: 50%;
  -webkit-border-radius: 50%;
  -ms-border-radius: 50%;
  -o-border-radius: 50%;
  -moz-border-radius: 50%;
}
.oval {
  @include containerSize(100%, 100%);
  border: solid 1px rgba(255,255,255,0.2);
}
.oval-copy-1,
.oval-around {
  @include containerSize(2rem, 2rem);
}
.oval-around {
  display: block;
  margin: 0 auto;
}
.oval-copy-1 {
  border: solid 1px rgba(255,255,255,0.2);
}
.oval-copy-2 {
  @include containerSize(1.44rem, 1.44rem);
  background-color: rgba(255,255,255,0.8);
  color: $baseColor;
  font-size: 0.4rem;
  line-height: 1.44rem;
}
.oval-copy-2 i {
  font-size: 0.24rem;
}
.oval-copy-3 {
  @include containerSize(0.58rem, 0.58rem);
}
.oval-animate {
  animation:mymove linear 3s infinite;
  -webkit-animation:mymove linear 3s infinite;
  -ms-animation:mymove linear 3s infinite;
  -o-animation:mymove linear 3s infinite;
  -moz-animation:mymove linear 3s infinite;
  transform-origin: 0 0;
  -webkit-transform-origin: 0 0;
  -moz-transform-origin: 0 0;
  -o-transform-origin: 0 0;
  -ms-transform-origin: 0 0;
}

@keyframes mymove{
  0% {
    transform: rotate(0deg); transform-origin: 50% 50%;}
  100% {transform: rotate(360deg);transform-origin: 50% 50%;}
}

@-webkit-keyframes mymove {
  0% {-webkit-transform: rotate(0deg);-webkit-transform-origin: 50% 50%;}
  100% {-webkit-transform: rotate(360deg);-webkit-transform-origin: 50% 50%;}
}
@-moz-keyframes mymove{
  0% {
    -moz-transform: rotate(0deg); -moz-transform-origin: 50% 50%;}
  100% {-moztransform: rotate(360deg);-moz-transform-origin: 50% 50%;}
}
@-ms-keyframes mymove{
  0% {
    -ms-transform: rotate(0deg); -ms-transform-origin: 50% 50%;}
  100% {-ms-transform: rotate(360deg);-ms-transform-origin: 50% 50%;}
}
@-o-keyframes mymove{
  0% {
    -o-transform: rotate(0deg); -o-transform-origin: 50% 50%;}
  100% {-o-transform: rotate(360deg);-o-transform-origin: 50% 50%;}
}

.link-text {
  font-size: 0.24rem;
  color: #fff;
  margin-top: 0.18rem;
}
.menu-title {
  position: relative;
  padding: 0.42rem 0 0;
}
.menu-line {
  display: block;
  @include containerSize(100%, 1px);
  background-color: #dcdcdc;
}
.menu-text {
  padding: 0 0.22rem;
  background-color: #fff;
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  -moz-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  -o-transform: translate(-50%, -50%);
}
.toutiao-text {
  top: 50%;
}
.menu-text img{
  display: block;
  @include containerSize(1.24rem, 0.24rem);
}
.menu-list {
  @include containerSize(100%, auto);
  padding: 0.32rem 0.32rem 0;
}
.title-toutiao {
  padding: 0.12rem 0 0.18rem 0;
}
.list-item {
  @include containerSize(0.84rem, auto);
  margin-bottom: 0.3rem;
}
@media only screen and (max-width: 768px) {
    .list-item {
        margin-left: 9%;
    }
}
@media only screen and (min-width: 769px){
    .list-item {
        margin-left: 11%;
    }
}
.list-item:nth-child(5n+1) {
  margin-left: 0;
}
.list-item img {
  display: block;
  @include containerSize(0.84rem, 0.84rem);
}
.title-name {
  display: block;
  width: 100%;
  margin-top: 0.06rem;
  font-size: 0.28rem;
  color: #3c3c3c;
}
.check-internet {
  @include containerSize(3.2rem, 3.4rem);
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -1.6rem;
  margin-left: -1.7rem;
}
.check-internet img{
  @include containerSize(2.04rem, 2.04rem);
  display: block;
  margin: 0 auto;
}
.check-internet p {
  font-size: 0.32rem;
  color: #9b9b9b;
}

//news
.item-container {
  width: 94%;
  margin: 0 auto;
  border-bottom: 1px solid #e6e6e6;
  padding: 0.24rem 0;
}
.item-title {
  line-height: 150%;
  font-size: 0.32rem;
  color: $color43;
  margin-bottom: 0.2rem;
}
.item-imgs {
  margin: 0.15rem 0;
}
.item-imgs li{
  overflow: hidden;
}
.list-img3 li {
  @include containerSize(32%,1.48rem);
  margin-right: 2%;
}
.item-imgs li:last-child {
  margin-right: 0;
}
.img-list {
  @include containerSize(100%, auto);
  min-height: 1.5rem;
  background-color: #f0f0f0;
}
.list1-info {
  width: 68%;
  max-width: 4.54rem;
  padding-right: 0.16rem;
  text-align: justify;
}
.list-img1 {
  @include containerSize(32%, 1.5rem);
  max-width: 2.28rem;
  overflow: hidden;
}
.list-img1 img{
  @include containerSize(100%, auto);
  min-height: 1.5rem;
}
.item-desc {
  font-size: 0.24rem;
  color: $color84;
}
.item-visited {
  color: $color84;
}
.item-desc span:first-child {
  margin-right: 0.4rem;
}
.list1-item-title {
  line-height: 0.46rem;
}
.adv-img {
  @include containerSize(100%, auto);
  max-height: 312rem;
  overflow: hidden;
}
.adv-img img {
  @include containerSize(100%, auto);
}
.adv-text {
  padding: 0.02rem 0.12rem;
  color: #f6c042;
  border: 1px solid #f6c042;
  border-radius: 0.08rem;
}
.more-desc {
  line-height: 0.8rem;
}

</style>
<template>
  <div class="info">
    <div>
      <div class="info-top">
        <img class="info-logo"　src="http://img.yunxingzh.com/91dc8c9f-1658-46a5-a9fd-52c2e66df151.png">
        <div class="info-weather g-clearfix">
          <img class="weacher-icon g-fl" :src="weatherImg">
          <span class="weather-temp g-fl">{{weather.temp}}&#176;C</span>
          <span class="weather-info g-fl">{{weather.info}}</span>
        </div>
        <div class="circle-link">
          <span class="oval"></span>
          <span class="oval-copy-1"></span>
          <img class="oval-around" v-show="showCfg" :class="{'oval-animate':showCfg}" src="http://img.yunxingzh.com/180afd13-7e6b-4006-9d00-d80e227c46fe.png">
          <span class="oval-copy-2 g-tac">
            <b v-if="showCfg">{{timeTxt}}<i>秒</i></b>
            <img v-else class="oval-copy-3"　src="http://img.yunxingzh.com/e04e6e9d-d24b-4e00-be57-1224efd426df.png">
          </span>
        </div>
        <p class="g-tac link-text">{{showCfg ? '正在连接免费WiFi...' : '已连接东莞无限免费WiFi'}}</p>
      </div>
      <!--p>{{queryParam}}</p-->
      <div>
        <div class="menu-title">
          <i class="menu-line"></i>
          <div class="menu-text">
            <img src="http://img.yunxingzh.com/0854372e-aff2-46da-b894-a4b82ff50520.png">
          </div>
        </div>
        <ul class="menu-list g-clearfix">
          <li class="g-fl list-item" v-for="(list,index) in menu.menulist">
            <a :href="getOpenLink(list,index)" :target="index < 5 ? '_blank' : ''">
            <img :src="list.icon">
            <span class="g-tac title-name" v-text="list.text"></span>
            </a>
          </li>
        </ul>
        <div class="menu-title title-toutiao">
          <i class="menu-line"></i>
          <div class="menu-text toutiao-text">
            <img src="http://img.yunxingzh.com/5bd91184-f4cb-40f1-9013-07fb636e288b.png">
          </div>
        </div>
        <newslist></newslist>
      </div>
    </div>
    <tip :tipinfo="tips" @tip-show="tips.show=false"></tip>
  </div>
</template>

<script>
import news from './news.vue'
import tip from './lib/tip.vue'
import newslist from './lib/newshot.vue'
import CGI from '../lib/cgi.js'

var query = CGI.query();
var uid = ~~(query.uid) || 0;
var token = query.token || '';
var live = query.live || '';

// 通过时间戳来判断是非第一次进入该页面
var ts = ~~(query.ts);
var now = ~~((new Date()).getTime()/1000)
export default {
  name: 'info',
  data() {
    return {
      showCfg: false,
      timeTxt: 5,
      tips: {
        show: false,
        msg: '',
        duration: 1500,
      },
      first: true,
      dataReady: false,
      weatherIcon: ['http://img.yunxingzh.com/c7f30e46-f5aa-4a16-a611-1c7b99f5ec01.png',
                    'http://img.yunxingzh.com/2c8898ab-78c2-4002-b8a7-ae0579e8bb66.png',
                    'http://img.yunxingzh.com/881bfc97-7849-44a2-b585-c197a6917e96.png',
                    'http://img.yunxingzh.com/3a961ff5-2530-4c10-b17c-aff36013b5db.png'],
      weather: {},
      weatherImg: '',
      menu: {},
    }
  },
  components: {
    tip,
    newslist,
  },
  created() {
    this.$store.state.uid = uid;
    this.$store.state.token = token;
  },
  mounted() {
    this.$nextTick(()=> {
      if (now - ts <= 2) {
        this.showCfg = true;
        this.countdown();
      }
      this.getData();
    })
  },
  methods: {
    getData() {
      var param = {
        uid: uid,
        token: token,
      }
      CGI.post('get_weather_news', param, (resp)=> {
        if (resp.errno === 0) {
          this.weather = resp.data.weather;
          var weatherType = this.weather.type || 0;
          this.weatherImg = this.weatherIcon[weatherType];
        } else {
          this.alertInfo(resp.desc);
        }
      })
      var p = {
        uid: uid,
        token: token,
        type: 0
      }
      CGI.post('get_portal_menu', p, (resp)=> {
        if (resp.errno == 0) {
          this.menu = resp.data;
        } else {
          this.alertInfo(resp.desc);
        }
      })
    },
    getOpenLink(list,idx) {
      var url = window.document.location.href.toString();
      var index = url.lastIndexOf("/");
      if (list.routername) {
        url  = url.substring(0, index + 1) + list.routername;
      } else {
        url = list.url;
      }
      return url
    },
    countdown() {
      this.timer = setInterval(()=> {
        this.timeTxt--;
        if (this.timeTxt == 0) {
          this.showCfg = false;
          clearInterval(this.timer);
        };
      }, 1000)
    },
    alertInfo(val) {
      this.tips.msg = val;
      this.tips.show = true;
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
