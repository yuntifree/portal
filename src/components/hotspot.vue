<template>
  <div class="hotspot top176">
    <download></download>
    <tab :selidx="tabIdx" @tab-change="tabChange"></tab>
    <newshot :type="tabIdx"></newshot>
  </div>
</template>

<script>
import newshot  from './lib/newshot.vue'
import tab from './lib/tab.vue'
import download from './lib/download.vue'
import CGI from '../lib/cgi.js'
var query = CGI.query();
var uid = ~~(query.uid) || 0;
var token = query.token || '';

export default {
  data() {
    return {
      tabIdx: -1
    }
  },
  components: {
    download,
    tab,
    newshot,
  },
  activated() {
    this.tabIdx = 1;
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
