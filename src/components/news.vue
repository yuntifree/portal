<template>
  <div class="news top176">
    <download></download>
    <tab :selidx="tabIdx" @tab-change="tabChange"></tab>
    <newslist :type="tabIdx"></newslist>
  </div>
</template>

<script>
import newslist from './lib/newslist.vue'
import tab from './lib/tab.vue'
import download from './lib/download.vue'
import CGI from '../lib/cgi.js'
var query = CGI.query();
var uid = ~~(query.uid) || 0;
var token = query.token || '';

export default {
  data() {
    return {
      tabIdx: -1,
    }
  },
  components: {
    download,
    tab,
    newslist
  },
  activated() {
    this.tabIdx = 0;
  },
  methods: {
    tabChange(list,idx,len) {
      if (idx !== len) {
        this.tabIdx = idx;
      }
      CGI.tabChange(this.$router, list, false, uid,token)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
