import upload from '../src/index';
// var upload = require('../dist/bundle.js');
upload.config({
    uploadUrl: 'http://10.16.39.69:3000/demo/upload',
    fileName: 'file',
    min: 0,
    max: null,
    isMultiple: true
})


upload.upload({
    id: '#upload',
    // uploadUrl: '//adv.focus-dev.cn/api/upload/image/qualification',
    // uploadUrl: '//mp.focus-dev.cn/common/image/upload?type=1',
    // uploadUrl: 'http://10.0.76.115:3000/demo/upload',
    // fileName: 'image',
    fn: function (res) {
        console.log(res);
    }
});
upload.upload({
    id: '#upload2',
    uploadUrl: '//adv.focus-dev.cn/api/upload/image/qualification',
    uploadUrl: '//mp.focus-dev.cn/common/image/upload?type=1',
    uploadUrl: 'http://10.0.76.115:3000/demo/upload',
    uploadUrl: 'http://10.16.39.69:3000/demo/upload',
    fileName: 'image',
    fileName: 'file',
    min: 0,
    max: 10 * 10 * 1024,
    type: '*',
    fn: function (res) {
        console.log(1);
        console.log(res);
    }
});
