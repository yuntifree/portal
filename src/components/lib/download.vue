<style lang="scss" scoped>
@import '../../assets/css/reset.css','../../assets/css/common.scss';
.download {
	@include containerSize(100%, 0.88rem);
  max-width: 750px;
	position: fixed;
	top: 0;
  left: 50%;
  transform:translateX(-50%);
  -webkit-transform:translateX(-50%);
  -ms-transform:translateX(-50%);
  -moz-transform:translateX(-50%);
  -o-transform:translateX(-50%);
	background: $baseColor;
	padding:0.14rem 0.24rem;
  z-index: 5;
}

.down-logo {
  @include containerSize(2.24rem, 0.44rem);
  margin-top: 0.08rem;
}
.down-logo img {
  @include containerSize(100%, auto);
}

.app-download {
  display: block;
  @include containerSize(1.5rem, 0.6rem);
  line-height: 0.6rem;
  border-radius: 0.16rem;
  -webkit-border-radius: 0.16rem;
  -moz-border-radius: 0.16rem;
  -ms-border-radius: 0.16rem;
  -o-border-radius: 0.16rem;
  background-color: #ffffff;
  border: solid 1px #008de3;
  color: $baseColor;
}
</style>
<template>
	<div class="download g-clearfix">
		<div class="g-fl down-logo">
      <img src="http://img.yunxingzh.com/1921f3f5-9c69-4eea-a055-bc65ab3078fa.png">
    </div>
		<a class="app-download g-fr g-tac" href="http://a.app.qq.com/o/simple.jsp?pkgname=com.yunxingzh.wireless">下载App</a>
	</div>
</template>
<script>
	export default {
    methods: {
      download() {
        var ua = (navigator.userAgent || navigator.vendor || window.opera);
        var isIOS = /ip(hone|od|ad)/i.test(ua);
        var isAndroid = /android/i.test(ua);
        function inWeixin() {
          var ua = navigator.userAgent.toLowerCase();
          return ua.match(/MicroMessenger/i) == "micromessenger";
        }
          location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.fungo.loveshow'
      },
    }
	}
</script>
