/*
 * @description lib-upload 通用的上传组件
 * @author luobata
 * @date 2017年1月7日14:46:03
 * */

import lib from './lib/lib';
import hack from './hack';
import { setConfig, config } from './upload/config';
import { validateConf } from './upload/validate';
import uploadHtml from './upload-html';
var uploadSwf = require('./upload-swf');

const upload = {
    config (conf) {
        setConfig(conf);
    },
    upload (conf) {
        const con = Object.assign(config, conf);
        let dom;

        dom = document.querySelector(con.selecter);
        if (!validateConf(con)) {
            console.log('缺少必要参数!');
            return;
        }
        if (window.File) {
            uploadHtml(dom, conf);
        } else {
            hack(conf);
            uploadSwf(dom, conf);
        }
    }
};

module.exports = upload;
export default upload;
