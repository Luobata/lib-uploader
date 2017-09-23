/*
 * @description lib-upload 通用的上传组件
 * @author luobata
 * @date 2017年1月7日14:46:03
 * */

import lib from 'LIB/lib';
import hack from 'UPLOAD/hack';
import { setConfig, config } from 'UPLOAD/config';
import { validateConf } from 'UPLOAD/validate';
import uploadSwf from 'UPLOAD/upload-swf';
import Upload from 'UPLOAD/upload';
import 'LIB/polyfill';

const upload = {
    config (conf) {
        setConfig(conf);
    },
    upload (conf) {
        const con = Object.assign({}, config);
        const upload = new Upload(Object.assign(con, conf));

        if (window.File) {
            upload.init();
        } else {
            //hack(con);
            //uploadSwf(dom, con);
        }

        return upload;
    }
};

//module.exports = upload;
export default upload;
