var ajax = require('./ajax')

module.exports = {
    //HOST: __DEV__ ? '' : 'http://120.76.236.185/',
    HOST: __DEV__ ? '' : (__DEP__ ? 'https://wx.yunxingzh.com/' : 'https://api.yunxingzh.com/'),
    CGI: '/',

    /**
     * HTTP Get for cgi
     */

    get: function(action, param, callback) {
        //var url = this.HOST + this.CGI + action + '?' + this.makeParam(param);
        var opt = {
            type: 'GET',
            url: action,
            contentType: 'application/json',
            cache: false,
            timeout: 2000,
            dataType: 'jsonp',
            jsonp: 'callback',
            success: function(data) {
                callback(data);
            },
            error: function(req, text) {
                callback({
                    errno: 99,
                    desc: '网络有些慢，请稍后重试:' + text
                });
            }
        };
        // call ajax
        try {
            ajax(opt);
        } catch(e) {
            console.log(JSON.stringify(e));
        }
    },

    /**
     * HTTP Post
     */

    post: function(action, param, callback) {
        var p = {
            data: param,
            term: 2,
            version: 1
        };

        var url = this.CGI + action;

        try {
            ajax({
                type: 'POST',
                url: url,
                contentType: 'application/json',
                dataType: 'json',
                timeout: 5000,
                data: JSON.stringify(p),
                success: function(data) {
                    callback(data);
                },
                error: function() {
                    callback({
                        errno: 99,
                        desc: '网络有些慢，请稍后重试~'
                    });
                }
            });
        } catch(e) {
            console.log(JSON.stringify(e));
        }
    },

    /**
     * make get param
     */

    makeParam: function(param) {
        var ret = [];
        for (var idx in param) {
            ret.push(idx + '=' + encodeURIComponent(param[idx]));
        }
        return ret.join('&');
    },
    setData: function(key, val) {
        key += '_yctv';
        localStorage.setItem(key, JSON.stringify(val));
    },

    //读取cookie
    getData: function(name) {
        name += '_yctv';
        var ret;
        try {
            ret = JSON.parse(localStorage.getItem(name));
        } catch (e) {
            console.log('JSON parse error');
        }
        return ret;
    },

    removeData: function(name) {
        name += '_yctv';
        localStorage.removeItem(name);
    },
    Myload: function(B, A) {
      this.done = false;
      B.onload = B.onreadystatechange = function() {
        if (!this.done && (!this.readyState || this.readyState === "loaded" || this.readyState === "complete")) {
          this.done = true;
          A();
          B.onload = B.onreadystatechange = null;
        }
      };
    },
    loadScript: function(A, id, C) {
      var B = function() {};
      if (C !== undefined) {
        B = C;
      }
      if (!document.getElementById(id)) {
        var D = document.createElement("script");
        D.setAttribute("src", A);
        D.setAttribute("id", id);
        document.body.appendChild(D);
        this.Myload(D, B);
      } else {
        B();
      }
    },
    dateFormat: function(date, fmt) {
        var d = new Date(date);
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
    },
    query: function() {
        //var url = window.document.location.search.toString().substr(1);
        var url = window.document.location.href.toString();
        url = url.substr(url.indexOf('?')+1);
        if (typeof(url) === 'string') {
            var u = url.split('&');
            var get = {};
            for (var i in u) {
                if (typeof(u[i]) === 'string') {
                    var j = u[i].split('=');
                    get[j[0]] = j[1];
                }
            }
            return get;
        } else {
            return {};
        }
    },
    setCookie: function(key, val, day) {
      var t = new Date();
      t.setTime(t.getTime() + day * 86400 * 1000);
      document.cookie = key + "=" + escape(val) + ";path=/" + (day === 0 ? "" : ";expires=" + t.toGMTString());
    },
    checkTel: function(tel) {
      //var isPhone = /^([0-9]{3,4})?[0-9]{7,8}$/;
      var isMob = /^((\+?86)|(\(\+86\)))?(1[0-9]{10})$/;
      //var isNum=/^\+?[1-9][0-9]||isNum.test(tel)*$/;
      var ret = isMob.test(tel);
      return ret;
    },
    tabChange: function(router, list, type, uid,token) {
        if (list.routername) {
            router.push({name: list.routername});
        } else {
            location.href = list.url;
        }
        var param = {
            name: list.name,
            uid: uid,
            token: token
        }
        if (type) {
            param.type = 8
        } else {
            param.type = 7
        }
        this.reportClick(param);
    },
    reportClick: function(p) {
        this.post('report_click', p, function(resp) {
            if (resp.errno === 0) {
            }else {}
        })
    }
};
