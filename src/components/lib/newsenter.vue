<style lang="scss">
</style>
<template>
<div class="newslist">
  <div>
    <div v-for="item in items"
        class="item-container"
        @click="link(item)">
      <!--新闻有3张图片-->
      <template v-if="item.images">
        <template v-if="item.images.length>2 && !item.stype">
          <div class="list-img3">
            <p class="item-title" :class="{'item-visited':item.visited}">{{item.title}}</p>
            <ul class="g-clearfix item-imgs">
              <li v-for="imgs in item.images"
                  class="g-fl"><img v-lazy="imgs" class="img-list">
              </li>
            </ul>
            <p class="item-desc"><span>{{item.source}}</span><span>{{formatTime(item.ctime)}}</span></p>
          </div>
        </template>
        <!--新闻有1、2张图片-->
        <template v-if="item.images.length==1 || item.images.length==2 && !item.stype">
          <dl class="g-clearfix">
           <dt class="g-fr list-img1"><img v-lazy="item.images[0]"></dt>
           <dd class="list1-info g-fl">
             <p class="item-title list1-item-title lines-ellipsis" :class="{'item-visited':item.visited}">{{item.title}}</p>
             <p class="item-desc"><span>{{item.source}}</span><span>{{formatTime(item.ctime)}}</span></p>
           </dd>
         </dl>
        </template>
        <!--广告-->
        <template  v-if="item.stype">
          <div>
            <p class="item-title g-ellipsis" :class="{'item-visited':item.visited}">{{item.title}}</p>
            <div class="adv-img"><img v-lazy="item.images[0]"></div>
            <p class="item-desc"><span class="adv-text">广告</span><span>{{item.source}}</span></p>
          </div>
        </template>
      </template>

      <!--无图片新闻-->
      <template v-if="!item.images">
        <div>
          <p class="item-title g-ellipsis" :class="{'item-visited':item.visited}">{{item.title}}</p>
          <p class="item-desc"><span>{{item.source}}</span><span>{{formatTime(item.ctime)}}</span></p>
        </div>
      </template>
    </div>
  </div>
  <tip :tipinfo="tips" @tip-show="tips.show=false"></tip>
  <p class="item-desc more-desc g-tac" v-show="!loading" @click="loadMore">{{nomore ? '全都在这没有更多了' : '点击加载更多'}}</p>
  <p class=" item-desc more-desc g-tac" v-show="loading">加载中<img src="../../assets/images/loading.gif" height="12" width="12" alt=""></p>
</div>
</template>
<script>
import tip from './tip.vue'
import CGI from '../../lib/cgi'
var query = CGI.query();
var uid = ~~(query.uid) || 0;
var token = query.token || '';
export default {
  data() {
    return {
      tips: {
        show: false,
        msg: '',
        duration: 1500,
      },
      items: [],
      ready: false,
      loading: false,
      nomore: false,
      useCache: false
    }
  },
  props: {
    type: Number
  },
  components: {
    tip,
  },
  mounted() {
    this.$nextTick(()=>{
      // 存下union
      var scrollY = sessionStorage.getItem('scrollY_'+this.type);
      if (scrollY != null) {
        var cache = sessionStorage.getItem('cache_'+this.type);
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
    getData(seq) {
      var param = {
        uid: uid,
        token: token,
        seq:seq || 0,
        type: 5
      }
      CGI.post('hot', param, (resp)=>{
        if (resp.errno === 0) {
          this.pageCount++;
          resp.data.infos.forEach((item)=>{
            this.$set(item, "visited", false);
          })
          if (param.seq==0) {
            this.ready = true;
            this.items = resp.data.infos;
          } else {
            this.items = this.items.concat(resp.data.infos);
          }
          this.nomore = resp.data.hasmore ? false : true;
          this.loading = false;
          this.$store.state.type = param.type;
        } else {
          this.tipBox(resp.desc);
        }
      });
    },
    loadMore() {
      if (this.useCache) {
        this.useCache = false;
        return;
      }
      if (this.nomore) {
        this.alertInfo('全都在这没有更多了');
      } else {
        var len = this.items.length-1;
        if (!this.nomore && len >= 0) {
          this.loading = true;
          setTimeout(()=>{
            this.getData(this.items[len].seq);
          },1000)
        }
      }
    },
    link(item) {
      item.visited = true;
      console.log(JSON.stringify(item));
      var scrollY = window.scrollY;
      var pageHeight = document.documentElement.clientHeight;
      var delta = scrollY % pageHeight;
      scrollY = scrollY < pageHeight ? delta : delta + pageHeight;
      if (sessionStorage) {
        try {
          sessionStorage.setItem('scrollY_'+this.type, scrollY);
          sessionStorage.setItem('cache_'+this.type, JSON.stringify(this.items));
        } catch(e) {
        }
      }
      var param = {
        type: 1,
        id: item.id,
        uid: uid,
        token: token
      }
      CGI.reportClick(param);
      location.href = item.dst;
    },
    tipBox(val) {
      this.tips.msg = val;
      this.tips.show = true;
    i},
    formatTime(ctime) {
      return ctime.substr(0, ctime.length - 3)
    }
  }
}
</script>
