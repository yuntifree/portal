<template>
  <div class="videos top88">
    <download></download>
    <div class="video-list" v-for="item in items">
      <div class="video-inner" @click="videoLink(item)">
        <img class="video-img" v-lazy="item.images[0]">
        <div class="video-text g-clearfix">
          <p class="g-fl"><span class="video-text-source">{{item.source}}</span><span>{{item.ctime}}</span></p>
          <p class="g-fr">{{item.play}}次播放</p>
        </div>
        <img class="video-icon-play" src="../../static/play.png">
      </div>
      <p class="video-title ellipsis">{{item.title}}</p>
    </div>
    <p class="item-desc g-tac" v-show="!loading" @click="loadMorevideo">{{nomore ? '全都在这没有更多了' : '点击加载更多'}}</p>
    <p class="item-desc g-tac" v-show="loading">加载中<img src="../assets/images/loading.gif" height="12" width="12" alt=""></p>
  </div>
</template>

<script>
import tip from './lib/tip.vue'
import download from './lib/download.vue'
import CGI from '../lib/cgi'

export default {
  name: 'videos',
  data () {
    return {
      videoloading: false,
      items: [],
      tabs: [],
      useCache: false,
      loading: false,
      nomore: false,
      tips: {
        show: false,
        msg: '',
        duration: 1500,
        tooltip: false,
      },
    }
  },
  components: {
    tip,
    download
  },
  /*beforeRouteLeave(to, from, next) {
    this.videoloading = true;
    next(true);
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      // 通过 `vm` 访问组件实例
      vm.videoloading = false;
    })
  },*/
  mounted() {
    this.$nextTick(function () {
      // 存下union
      var scrollY = sessionStorage.getItem('scrollY');
      if (scrollY != null) {
        var cache = sessionStorage.getItem('cache');
        if (cache && cache.length > 0) {
          var list = JSON.parse(cache);
          if (list) {
            this.items = list;
            this.useCache = true;
            this.$nextTick(function() {
              window.scroll(0, scrollY);
            })
          }
        }
        sessionStorage.clear();
      }
      if (!this.useCache) {
        this.getData()
      }
    })
  },
  methods: {
    getData(seq) {
      this.loading = true;
      var param = {
        uid: this.$store.state.uid || ~~(sessionStorage.getItem('portal_uid')),
        token: this.$store.state.token || sessionStorage.getItem('portal_token'),
        seq: seq || 0,
        type: 1
      }
      CGI.post('hot', param, (resp)=> {
        if (resp.errno == 0) {
          resp.data.infos.forEach((item)=>{
            this.$set(item, "visited", false);
          })
          this.items = this.items.concat(resp.data.infos);
          this.loading = false;
          this.nomore = resp.data.hasmore ? false : true;
        } else {
          this.tipBox(resp.desc);
        }
      })
    },
    loadMorevideo() {
      if (this.useCache) {
        this.useCache = false;
        return;
      }
      if (!this.nomore) {
        this.$store.state.videoloading = true;
        var len = this.items.length-1;
        if (!this.nomore && len >= 0) {
          setTimeout(()=>{
            this.getData(this.items[len].seq);
            console.log('video loadMore')
          },1000)
        }
      } else {
        this.alertInfo('全都在这没有更多了');
      }   
    },
    videoLink(item) {
      item.visited = true;
      var scrollY = window.scrollY;
      var pageHeight = document.documentElement.clientHeight;
      var delta = scrollY % pageHeight;
      scrollY = scrollY < pageHeight ? delta : delta + pageHeight;
      sessionStorage.setItem('scrollY', scrollY);

      sessionStorage.setItem('cache', JSON.stringify(this.items));
      location.href = item.dst;
      console.log(item.dst);
    },
    tipBox(val) {
      this.tips.msg = val;
      this.tips.show = true;
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.videos {
  width: 94%;
  margin: 0 auto;
  border-bottom: 2px solid #e7e7e7;
}
.menu {
  flex: 1;
  text-align: center;
  font-size: 32rpx;
  line-height: 40rpx;
}
.cur {
  color: #4a90f2;
}
.video-list {
  width: 100%;
  height: auto;
  padding: 0.16rem;
  background-color: #fff;
  margin-top: 0.16rem;
}
.video-inner {
  width: 100%;
  height: auto;
  position: relative;
}
.video-img{
  width: 100%;
  height: 3.34rem;
}
.video-text {
  width: 100%;
  padding: 0.16rem;
  position: absolute;
  left: 0;
  bottom: 0;
  font-size: 0.32rem;
  color:  #fff;
}
.video-text-source {
  margin-right: 0.16rem;
  color: #fff;
}
.video-title {
  display: block;
  width: 100%;
  font-size: 0.32rem;
  line-height: 0.44rem;
  color:  #262626;
}
.video-container {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 5;
}
.video-container video {
  width: 100%;
  height: 100%;
}
.video-icon-play {
  width: 0.94rem;
  height: 0.94rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}</style>
