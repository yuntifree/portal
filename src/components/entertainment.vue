<template>
  <div class="news top176">
    <download></download>
    <tab :selidx="tabIdx" @tab-change="tabChange"></tab>
    <newsenter :type="tabIdx"></newsenter>
  </div>
</template>

<script>
import newsenter from './lib/newsenter.vue'
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
    newsenter
  },
  activated() {
    this.tabIdx = 2;
  },
  methods: {
    tabChange(list, idx, len) {
      if (idx !== len) {
        this.tabIdx = idx;
      }
      CGI.tabChange(this.$router, list, false, uid, token)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
