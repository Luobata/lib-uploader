/*
 * @description lib-upload 通用的上传组件
 * @author luobata
 * @date 2017年1月7日14:46:03
 * */

import lib from './lib/lib';
import hack from './upload/hack';
import { setConfig, config } from './upload/config';
import { validateConf } from './upload/validate';
import uploadHtml from './upload/upload-html';
import uploadSwf from './upload/upload-swf';
import './lib/polyfill';

const upload = {
    config (conf) {
        setConfig(conf);
    },
    upload (conf) {
        const con = Object.assign(config, conf);
        const upload = new Upload(con);

        if (window.File) {
            uploadHtml(upload);
        } else {
            //hack(con);
            //uploadSwf(dom, con);
        }

        return upload;
    }
};

//module.exports = upload;
export default upload;
