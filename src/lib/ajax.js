const lint = function (conf) {
    var lintFile = {};
    if (conf.url) {
        lintFile.error = '缺少参数url';
    }
    return lintFile;
};

export default (conf) => {
    var lintFile = lint(conf);
    var xhr = new XMLHttpRequest();
    if (lint.error && conf.fn && typeof conf.fn === 'function') {
        conf.fn(lintFile);
        return;
    }
    if (xhr.upload) {
        if (conf.progress && typeof conf.progress === 'function') {
            (function (conf) {
                xhr.upload.onprogress = function (event) {
                    if (event.lengthComputable) {
                        var percentComplete = event.loaded / event.total;
                        conf.progress(conf.file, percentComplete);
                    }
                };
            })(conf)
        }


        // 开始上传
        xhr.open(conf.method, conf.uploadUrl, true);
        xhr.setRequestHeader('Accept', '*/*');
        xhr.withCredentials = conf.credentials;
        xhr.onreadystatechange = function (e) {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    typeof conf.fn === 'function' && conf.fn(JSON.parse(xhr.response), conf.file);
                } else {
                    conf.fn({
                        error: '上传失败' + xhr.responseText
                    });
                }
            }
        };
        xhr.send(conf.data);
    }
};
