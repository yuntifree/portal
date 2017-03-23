// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')
var online = env.BUILD_ENV == 'deploy';
// 这里改工程名
var distPath = online ? 'portal'+dateFormat(new Date(), 'yyyyMMddhhmm') : 'portaltest'+dateFormat(new Date(), 'yyyyMMddhhmm');
function dateFormat(date, fmt) {
    //var d = new Date(date);
    var d = date;
    var o = {
        'M+': d.getMonth() + 1, //月份
        'd+': d.getDate(), //日
        'h+': d.getHours(), //小时
        'm+': d.getMinutes(), //分
        's+': d.getSeconds(), //秒
        'q+': Math.floor((d.getMonth() + 3) / 3), //季度
        //'S': d.getMilliseconds() //毫秒
    };

    //o['S'] = ('000' + o['S']).substr(('' + o['S']).length);

    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (d.getFullYear() + '').substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp('(' + k + ')').test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
    return fmt;
}
module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../'+ distPath +'/index.html'),
    wifilink: path.resolve(__dirname, '../'+ distPath +'/wifilink.html'),
    assetsRoot: path.resolve(__dirname, '../' + distPath),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/'+ distPath + '/',
    productionSourceMap: false,
    deploy: online,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css']
  },
  dev: {
    env: require('./dev.env'),
    port: 8080,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {},
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}
