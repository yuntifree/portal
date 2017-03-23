module.exports = {


init: function(callback) {
        // check wx


if (window.wx === undefined || window.wx_cfg === undefined) {
            console.log('wx init failed');
            alert(window.wx+','+window.wx_cfg);
            return null;

}
            
        wx_cfg.debug = false;
        wx_cfg.jsApiList = [
            'checkJsApi',
            'onMenuShareTimeline',
            'onMenuShareAppMessage',
            'onMenuShareQQ',
            'getLocation',
            // 'onMenuShareWeibo',
            // 'onMenuShareQZone',
            // 'chooseImage',
            // 'previewImage',
            // 'uploadImage',
            // 'downloadImage',
            //'chooseWXPay'
        ];
        wx.config(wx_cfg);

        if (callback) {
            // 设置一个标记
            wx.ok = false;
            wx.ready(callback);
}

        wx.error(function(res) {
            if (wx_cfg.debug) {
                alert(res.errMsg);
            }
        });
        return this;


},

    
    bindShare: function(cfg) {
        var option = {
            title: cfg.title || '微信分享title',
            link: cfg.link || '微信分享link',
            imgUrl: cfg.imgUrl || '微信分享imgUrl',
            desc: cfg.desc || '微信分享desc',
            type: 'link',
            fail: function(res) {
                //alert(JSON.stringify(res));
                if (cfg.callback) {
                    cfg.callback('fail', res);
                }
            },
            trigger: function(res) {
                if (cfg.callback) {
                    cfg.callback('trigger', res);
                }
            },
            success: function(res) {
                if (cfg.callback) {
                    cfg.callback('success', res);
                }
            },
            cancel: function(res) {
                if (cfg.callback) {
                    cfg.callback('cancel', res);
                }
            }
        };
        wx.onMenuShareAppMessage(option);
        //wx.onMenuShareQQ(option);
        //wx.onMenuShareWeibo(option);

        // 朋友圈没有desc字段，用title代替
        wx.onMenuShareTimeline(option);
    }
};
