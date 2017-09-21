/*
 * @description lib-upload 通用的上传组件
 * @author luobata
 * @date 2017年1月7日14:46:03
 * */

import lib from '.lib/lib';
import lint from './lib/lint';
import hack from './hack';
import uploadHtml from './upload-html';
var uploadSwf = require('./upload-swf');

const upload = function (config) {
    const conf = {
        uploadUrl: '',
        type: ['png', 'jpg', 'jpeg'],
        method: 'POST',
        id: '#upload',
        fileName: 'image',
        min: 50 * 1024,
        max: 2.5 * 1024 * 1024,
        credentials: true,
        isMultiple: false,
        beforeUpload: function () {
        },
        fn: function (res) {
            console.log('upload success');
        },
        progress: function (res) {
        }
    };
    lib.extends(conf, config);
    var dom = document.querySelector(conf.id);
    if (!lint(conf)) {
        console.log('缺少必要参数!');
        return;
    }
    if (window.File) {
        uploadHtml(dom, conf);
    } else {
        hack(conf);
        uploadSwf(dom, conf);
    }
};

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = upload;
} else {
    window.upload = upload;
}
