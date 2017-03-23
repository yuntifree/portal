<template>
  <div class="videos top176">
    <download></download>
    <tab :selidx="tabIdx" @tab-change="tabChange"></tab>
    <div class="live-body g-clearfix">
      <div class="liveBox-li"  v-for="item in items" @click="liveReport">
        <a :href="getLiveurl(item)">
          <span class="liveBox-li-head">
            <img :src="item.img" width="100%" :height="imgHeight">
            <em class="liveBox-li-status">{{item.live ? '直播':''}}</em>
          </span>
          <span class="liveBox-li-fun">
            <p class="liveBox-li-name liveBox-li-male" :class="{'item-visited':item.visited}">{{item.nickname ? item.nickname : '主播'}}</p>
            <p class="liveBox-li-city">{{item.location}}</p>
            <span class="liveBox-li-count">{{item.watches}}人</span>
          </span>
        </a>
      </div>
    </div>
    <p class="item-desc more-desc g-tac" v-show="!loading" @click="loadMorevideo">{{nomore ? '全都在这没有更多了' : '点击加载更多'}}</p>
    <p class="item-desc more-desc g-tac" v-show="loading">加载中<img src="../assets/images/loading.gif" height="12" width="12" alt=""></p>
    <tip :tipinfo="tips" @tip-show="tips.show=false">123</tip>
  </div>
</template>

<script>
import tip from './lib/tip.vue'
import download from './lib/download.vue'
import tab from './lib/tab.vue'
import CGI from '../lib/cgi'
var query = CGI.query();
var uid = ~~(query.uid) || 0;
var token = query.token || '';
var ua = navigator.userAgent.toLowerCase();
export default {
  name: 'videos',
  data () {
    return {
      items: [],
      loading: true,
      nomore: false,
      seq: 0,
      tips: {
        show: false,
        msg: '',
        duration: 1500,
      },
      tabIdx: -1,
      num: 0,
      imgHeight: 0,
    }
  },
  components: {
    tip,
    tab,
    download
  },
  activated() {
    this.tabIdx = 4;
  },
  mounted() {
    this.$nextTick(function () {
      //this.getData();
      if (window.screen.availWidth > 750) {
        if (window.screen.availHeight > window.screen.availWidth && !(/ipad/.test(ua))) {
          this.imgHeight = 187;
        } else {
          this.imgHeight = 375;
        }
      } else {
        this.imgHeight = (window.screen.availWidth) / 2;
      }

      var scrollY = sessionStorage.getItem('scrollY');
      if (scrollY != null) {
        var cache = sessionStorage.getItem('cache');
        if (cache && cache.length > 0) {
          var list = JSON.parse(cache);
          if (list) {
            this.items = list;
            this.useCache = true;
            this.$nextTick(function() {
              window.scroll(0, ~~scrollY);
            })
          }
        }
      }
      if (!this.useCache) {
        this.getData()
      }
    })
  },
  methods: {
    getData() {
      this.loading = false;
      var param = {
        uid: uid,
        token: token,
        seq: this.seq
      }
      CGI.post('get_live_info', param, (resp)=> {
        if (resp.errno == 0) {
          var list = resp.data.list
          if (list || list.length>0) {
            this.items = this.items.concat(resp.data.list);
            this.seq = this.items[this.items.length-1].seq;
          }
          this.loading = false;
          this.nomore = resp.data.hasmore ? false : true;
        } else {
          this.tipBox(resp.desc);
        }
      })
    },
    loadMorevideo() {
      if (!this.nomore) {
        this.getData();
      } else {
        this.tipBox('全都在这没有更多了');
      }
    },
    liveReport() {
      var param = {
        type: 8,
        name: 'livedetail',
        uid: uid,
        token: token
      }
      CGI.reportClick(param);
    },
    getLiveurl(item) {
      if (/iphone|ipad/.test(ua)) {
        return 'http://h.huajiao.com/l/index?liveid='+item.live_id;
      } else {
        return 'http://app.qq.com/#id=detail&appid=1105815909';
      }
    },
    liveLink(item) {
      location.href = 'http://h.huajiao.com/l/index?liveid='+item.live_id;
    },
    tabChange(list, idx, len) {
      if (idx !== len) {
        this.$store.state.tabidx = idx;
        this.tabIdx = idx;
      }
      CGI.tabChange(this.$router, list, false, uid, token);
    },
    tipBox(val) {
      this.tips.msg = val;
      this.tips.show = true;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.videos {
  width: 100%;
  margin: 0 auto;
  overflow: hidden;
}
.liveBox-li {
  background: #fff;
  border-bottom: 1px solid #000;
  border-right:1px solid #000;
  float: left;
  margin-left: -1px;
  padding-bottom: 6px;
  width: 50%;
  height: auto;
  box-sizing: content-box;
  -webkit-box-sizing: content-box;
}
.liveBox-li:nth-child(even) {
  margin-left: 0;
  border-right: 0 none;
}

.liveBox-li a {
  display: block;
  color: #222;
  text-decoration: none;
}
.liveBox-li-head {
    position: relative;
}
.liveBox-li-head,
.liveBox-li-status,
.liveBox-li-head img {
  display: block;
}
.liveBox-li-status {
  border: 1px solid #fff;
  -webkit-border-radius: 2px;
  border-radius: 2px;
  color: #fff;
  font-style: normal;
  font-size: 0.24rem;
  padding: 0.02rem 0.06rem;
  position: absolute;
  right: 0.14rem;
  top: 0.14rem;
}

.liveBox-li-fun {
  display: block;
  padding-top: 0.14rem;
  position: relative;
  width: 100%;
}
.liveBox-li-male {
  background: url(http://p4.qhmsg.com/t0153a4545649265ec4.png) no-repeat 9px center;
  background-size: 12px 12px;
}
.liveBox-li-name {
  font-size: 0.28rem;
  height: 0.48rem;
  line-height: 0.48rem;
  overflow: hidden;
  padding-left: 0.56rem;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 47%;
}
.liveBox-li-city {
  color: #aaabbb;
  font-size: 0.26rem;
  height: 0.44rem;
  line-height: 0.44rem;
  padding-left: 0.56rem;
}
.liveBox-li-count {
  color: #aaabbb;
  display: block;
  font-size: 0.24rem;
  height: 0.4rem;
  line-height: 0.4rem;
  position: absolute;
  right: 0.2rem;
  top: 0.2rem;
}
</style>
