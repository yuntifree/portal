var images = {
    localId: [],
    serverId: []
};

module.exports = {
    init: function(callback) {
        if (window.wx === undefined) {
            alert('微信初始化未完成，无法上传');
            return;
        }

        wx.chooseImage({
            success: function(res) {
                images.localId = res.localIds;
                // 通知选择图片完成
                if (callback) callback('choose', images.localId);
                prepareUpload(callback);
            },
            fail: function(res) {
                alert(JSON.stringify(res));
            }
        });
    }
};

function prepareUpload(callback) {
    if (images.localId.length === 0) {
        console.log('请先使用 chooseImage 接口选择图片');
        return;
    }

    var i = 0, length = images.localId.length;
    images.serverId = [];
    upload(i, length, callback);
}

function upload(count, total, callback) {
    wx.uploadImage({
        localId: images.localId[count],
        success: function(res) {
            count++;
            images.serverId.push(res.serverId);
            if (count < total) {
                upload(count, total, callback);
            } else {
                if (callback) callback('upload', images.serverId);
            }
        },
        fail: function(res) {
            alert(JSON.stringify(res));
        }
    });
}
