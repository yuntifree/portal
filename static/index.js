var ads = {
  img: 'static/images/act_banner.png',
  url: 'http://a.app.qq.com/o/simple.jsp?pkgname=com.yunxingzh.wireless'
}

//倒计时
var timer;

var query = CGI.query();
var wlanacname = query.wlanacname || ''; //'2043.0769.200.00';
var wlanuserip = query.wlanuserip || ''; //'10.96.72.28';
var wlanacip = query.wlanacip || ''; //'120.197.159.10';
var wlanusermac = query.wlanusermac || '';
var firsturl = query.alanuserfirsturl || 'http://www.baidu.com';
var autologin = 0;

//判断浏览器类型
var JPlaceHolder = {
  //检测
  _check: function() {
    return 'placeholder' in document.createElement('input');
  },
  //初始化
  init: function() {
    if (!this._check()) {
      this.fix();
    }
  },
  //修复
  fix: function() {
    jQuery(':input[placeholder]').each(function(index, element) {
      var self = $(this),
        txt = self.attr('placeholder');
      self.wrap($('<div></div>').css({
        position: 'relative',
        zoom: '1',
        border: 'none',
        background: 'none',
        padding: 'none',
        margin: 'none'
      }));
      var pos = self.position(),
        h = self.outerHeight(true),
        paddingleft = self.css('padding-left');
      var holder = $('<span></span>').text(txt).css({
        position: 'absolute',
        left: pos.left,
        top: pos.top,
        height: h,
        lienHeight: h + 'px',
        paddingLeft: paddingleft,
        paddingTop: 5 + 'px',
        color: '#c8c8c8'
      }).appendTo(self.parent());
      self.focusin(function(e) {
        holder.hide();
      }).focusout(function(e) {
        if (!self.val()) {
          holder.show();
        }
      });
      holder.click(function(e) {
        holder.hide();
        self.focus();
      });
    });
  }

};

(function() {
  String.prototype.trim = function() {
    return this.replace(/(^\s*)|(\s*$)/g, "");
  }
  var param = {
    wlanusermac: wlanusermac,
    wlanacname: wlanacname
  };

  CGI.post('check_login', param, function(resp) {
    if (resp.errno == 0) {
      var data = resp.data;
      autologin = data.autologin;
      if (isPC()) {
        var height = $(window).height();
        $('html').css('height', height);
        if (autologin) {
          $('.login').append(template('tplPcone', {}));
        } else {
          $('.login').append(template('tplPc', {}));
        }
      } else {
        var height = window.screen.availHeight-60;
        $('html').css('height', height);
        if (autologin) {
          $('.login').append(template('tplOnelogin', {}));
          $('.login').append(template('tplBottom', ads));
        } else {
          $('.login').append(template('tplIptlogin', {}));
          $('.login').after(template('tplBottom', ads));
        }
      }
      initUI();
    } else {
      tipShow(resp.desc);
    }
  });
})()


function initUI() {
  font(true);
  $('.ipt-phone').focus();
  JPlaceHolder.init();
  $('.query-code').click(getCode);
  $('.app-ads').click(appDownload)
  if (isPC()) {
    $('.pc-btn').click(tripEnd);
  } else {
    $('.mob-btn').get(0).addEventListener('touchstart', tripStart, false);
    $('.mob-btn').get(0).addEventListener('touchend', tripEnd, false);
  }
}

function font(bFont) {
  if (document && window) {
    // init font
    if (bFont) {
      var docEl = document.documentElement;
      var isIOS = navigator.userAgent.match(/iphone|ipod|ipad/gi);
      var dpr = isIOS ? Math.min(window.devicePixelRatio, 3) : 1;
      dpr = window.top === window.self ? dpr : 1; //被iframe引用时，禁止缩放
      var scale = 1 / dpr;
      var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';

      $(docEl).data('dpr', dpr);
      var recalc = function() {
        var width = docEl.clientWidth;
        if (width / dpr > 640) {
          width = 640 * dpr;
        }
        docEl.style.fontSize = 100 * (width / 750) + 'px';
      };
      recalc();
      if (!document.addEventListener) return;
      window.addEventListener(resizeEvt, recalc, false);
    }
  }
}

function isPC() {
  var userAgentInfo = navigator.userAgent;
  var Agents = ["Android", "iPhone",
    "SymbianOS", "Windows Phone",
    "iPad", "iPod"
  ];
  var flag = true;
  for (var v = 0; v < Agents.length; v++) {
    if (userAgentInfo.indexOf(Agents[v]) > 0) {
      flag = false;
      break;
    }
  }
  return flag;
}

function tipShow(val) {
  $('.tip-info').text(val);
  $('.tip-info').show();
  setTimeout(function() {
    $('.tip-info').hide();
  }, 1500);
}

function checkPhone(phone) {
  var ret = false;
  if (phone.length <= 0) {
    tipShow('请先输入手机号');
  } else {
    ret = CGI.checkTel(phone);
    if (!ret) {
      tipShow('请输入正确的手机号');
    }
  }
  return ret;
}

//获取手机验证码
function getCode() {
  //alert('验证码')
  var phone = $('.ipt-phone').val().trim();
  if (!checkPhone(phone)) return;
  var param = {
    phone: phone,
    wlanacname: wlanacname
  };
  CGI.post('get_check_code', param, function(resp) {
    if (resp.errno === 0) {
      tipShow('获取成功');
      var seconds = 60;
      timer = setInterval(function() {
        seconds--;
        var timeTxt = ((seconds < 10) ? "0" + seconds : seconds) + "s"
        $('.query-code').text(timeTxt);
        if (seconds == 0) {
          $('.query-code').text('获取验证码');
          clearInterval(timer);
        };
      }, 1000)
    } else {
      tipShow(resp.desc);
    }
  });
}

function tripStart(e) {
  $('.btn').css('backgroundColor', '#0187ee');
}

function tripEnd(e) {
  $('.btn').css('backgroundColor', '#00a0fb');
  var param = {
    wlanacname: wlanacname,
    wlanuserip: wlanuserip,
    wlanacip: wlanacip,
    wlanusermac: wlanusermac
  };

  if (autologin) {
    oneClickLogin(param);
  } else {
    var phone = $('.ipt-phone').val().trim();
    var code = $('.ipt-code').val().trim();
    if (checkPhone(phone)) {
      param.phone = phone;
      if (code.length <= 0) {
        tipShow('请输入验证码');
      } else {
        param.code = code;
        portalLogin(param);
      }
    }
  }
}

function portalLogin(param) {
  CGI.post('portal_login', param, function(resp) {
    if (resp.errno === 0) {
      loginDone(resp.data);
    } else {
      tipShow(resp.desc);
      $('.ipt-code').val('');
      $('.query-code').text('获取验证码');
      clearInterval(timer);
    }
  })
}

function oneClickLogin(param) {
  CGI.post('one_click_login', param, function(resp) {
    if (resp.errno === 0) {
      loginDone(resp.data);
    } else {
      tipShow(resp.desc);
    }
  })
}

function loginDone(info) {
  var url = "http://yunxingzh.com/dist/wifilink.html?uid=" + info.uid + '&token=' + info.token + '&ts=' + ~~((new Date()).getTime()/1000)
  $('.ipt-phone').val('');
  $('.ipt-code').val('');
  if (CGI.isIE()) {
    location.href = firsturl;
  } else {
    location.href = url;
  }
}

function appDownload() {
  location.href = ads.url;
}
