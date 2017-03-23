<template>
  <div class="tab">
    <div class="tab-menu">
      <ul class="tab-menu-list" v-if="dataReady" :style="{width: 1.24 * val.tablist.length +'rem'}">
        <li class="g-tac tab-list" v-for="(list,idx) in val.tablist" @click="tabClick(list,idx)"><span :class="{'span-bottom':selidx==idx}">{{list.text}}</span></li>
      </ul>
    </div>
  </div>
</template>

<script>
import CGI from '../../lib/cgi.js'

var query = CGI.query();
var uid = ~~(query.uid) || 0;
var token = query.token || '';
var live = query.live || '';
export default {
  name: 'tab',
  data() {
    return {
      //tablist: ['东莞','热点','查询','视频','更多'],
      val: [],
      live: live,
      dataReady: false
    }
  },
  props: {
    selidx: Number,
  },
  mounted() {
    this.$nextTick(()=> {
      this.getData();
    })
  },
  methods: {
    getData() {
      var param = {
        uid: uid,
        token: token,
        type: 1,
      }
      CGI.post('get_portal_menu', param, (resp)=> {
        if (resp.errno == 0) {
          this.val = resp.data;
          this.dataReady = true;
        }
      })
    },
    tabClick(list,idx) {
      var len = 0;
      if (this.val.tablist.length >0) {
        len = this.val.tablist.length - 1;
      }
      this.$emit('tab-change', list, idx, len);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.tab {
  width: 100%;
  height: 0.88rem;
  max-width: 750px;
  background-color: #fff;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
  -wekit-box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
  -moz-box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
  -ms-box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
  -o-box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
  position: fixed;
  top:  0.88rem;
  left: 50%;
  transform: translateX(-50%);
  -webkit-transform: translateX(-50%);
  -moz-transform: translateX(-50%);
  -ms-transform: translateX(-50%);
  -o-transform: translateX(-50%);
  overflow-x: auto;
  z-index: 5;
  text-align: center;
  overflow: hidden;
}
.tab-menu {
  width: 100%;
  overflow: hidden;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  white-space: nowrap;
}
.tab-menu-list {
  display: inline-block;
  width: auto;
  height: 0.88rem;
  margin: 0 auto; 
}
.tab-list{
  float: left;
  text-align: center;
  width: 1.24rem;
}
.tab-list span{
  display: inline-block;
  color: #6fc8ff;
  font-size: 0.36rem;
  line-height: 0.88rem;
}
.tab-list .span-bottom {
  border-bottom: 1px solid #009cfb;
  color: #009cfb;
}
.router-link-active {
  border-bottom: 1px solid #fff;
}
</style>
