(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.libUpload = factory());
}(this, (function () { 'use strict';

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};



















var defineProperty = function (obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

var lib = {
    extends: function _extends$$1(source, target) {
        for (var k in target) {
            if (lib.isObject(target[k]) && lib.isObject(source[k])) {
                lib.extends(source[k], target[k]);
            } else {
                source[k] = target[k];
            }
        }
        return source;
    },
    clone: function clone(obj) {
        var o;
        if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === "object") {
            if (obj === null) {
                o = null;
            } else {
                if (obj instanceof Array) {
                    o = [];
                    for (var i = 0, len = obj.length; i < len; i++) {
                        o.push(this.clone(obj[i]));
                    }
                } else {
                    o = {};
                    for (var j in obj) {
                        o[j] = this.clone(obj[j]);
                    }
                }
            }
        } else {
            o = obj;
        }
        return o;
    },
    isObject: function isObject(obj) {
        return (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' && !(obj instanceof Array);
    },
    queryString: function queryString(object) {
        var data = [];
        var key, val;
        for (key in object) {
            if (object.hasOwnProperty(key)) {
                val = object[key];
                data.push(key + '=' + encodeURIComponent(val));
            }
        }
        return data.join('&');
    },
    getRandomString: function getRandomString(len) {
        len = len || 32;
        var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
        var maxPos = $chars.length;
        var pwd = '';
        for (var i = 0; i < len; i++) {
            pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
        }
        return pwd;
    },
    getWidth: function getWidth(dom) {
        return dom.offsetWidth;
    },
    getHeight: function getHeight(dom) {
        return dom.offsetHeight;
    },
    prepend: function prepend(dom, html) {
        dom.innerHTML = html + dom.innerHTML;
    },
    css: function css(dom, sty, newSty) {
        if (!newSty) {
            return dom.style[sty];
        } else {
            dom.style[sty] = newSty;
            return dom;
        }
    }
};

var lib_1 = lib;

var lint = function lint(conf) {
    if (!conf.uploadUrl || !conf.id || !conf.fn) {
        return false;
    }

    return true;
};

var hack = function hack(conf) {
    var success = conf.fn;
    conf.fn = function (res, file) {
        if (res === -110) {
            res = {
                error: '图片大小不符合要求'
            };
        }
        success.call(this, res, file);
    };
};

var hack_1 = hack;

/*   
 *   A   JavaScript   implementation   of   the   Secure   Hash   Algorithm,   SHA-1,   as   defined   
 *   in   FIPS   PUB   180-1   
 *   Version   2.1-BETA   Copyright   Paul   Johnston   2000   -   2002.   
 *   Other   contributors:   Greg   Holt,   Andrew   Kepert,   Ydnar,   Lostinet   
 *   Distributed   under   the   BSD   License   
 *   See   http://pajhome.org.uk/crypt/md5   for   details.   
 */
/*   
 *   Configurable   variables.   You   may   need   to   tweak   these   to   be   compatible   with   
 *   the   server-side,   but   the   defaults   work   in   most   cases.   
 */

var lint$3 = function lint(conf) {
    var lintFile = {};
    if (conf.url) {
        lintFile.error = '缺少参数url';
    }
    return lintFile;
};

var ajax = function ajax(conf) {
    var that = this;
    var lintFile = lint$3(conf);
    var xhr = new XMLHttpRequest();
    if (lint$3.error && conf.fn && typeof conf.fn === 'function') {
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
            })(conf);
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

var lint$2 = function lint(file, conf) {
    var result = {
        error: '',
        errorType: 0
    };
    var type = result.type = file.name.split('.').pop().toLowerCase();
    var name = result.name = lib_1.getRandomString(32) + '.' + type;

    if (file.size < conf.min || file.size > conf.max) {
        result.error = '图片大小不符合要求!';
        result.errorType = 1;
    }

    if (conf.type === '*') {
        return result;
    }

    if (conf.type.indexOf(type) === -1) {
        result.error = '图片类型错误!';
        result.errorType = result.errorType ? 3 : 2;
        return result;
    }

    return result;
};

var uploadAjax = function uploadAjax(file, name, conf) {
    var formData = new FormData();
    var uploadData = {
        name: conf.fileName,
        file: file
    };
    conf.file = file;
    formData.append(conf.fileName, file);
    conf.data = formData;
    ajax(conf);
};

var beforeUpload = function beforeUpload(dom, conf) {
    if (lib_1.css(dom, 'position') === 'static' || lib_1.css(dom, 'position') === '') {
        lib_1.css(dom, 'position', 'relative');
    }
    var isMulti = conf.isMultiple ? 'multiple' : '';
    var input = '<input type="file"' + isMulti + ' style="position: absolute; width: 100%; height: 100%; opacity: 0; filter: alpha(opacity=0); cursor: pointer; top: 0; left: 0; z-index: 100;" name="" />';
    lib_1.prepend(dom, input);
    var uploadDom = dom.querySelector('input');
    dom.addEventListener('change', function (e) {
        var file = e.target.files;
        var i;
        var item;
        var errors = [];
        var error = '';

        for (i = 0; i < file.length; i++) {
            item = file[i];
            errors[i] = lint$2(item, conf).errorType;
        }
        if (errors.indexOf(1) !== -1 || errors.indexOf(3) !== -1) {
            error += '图片大小不符合要求';
        }
        if (errors.indexOf(2) !== -1 || errors.indexOf(3) !== -1) {
            if (error) error += '、';
            error += '图片格式不符合要求';
        }
        if (error) {
            conf.fn({ error: error });
            return;
        }
        for (i = 0; i < file.length; i++) {
            item = file[i];
            var lintFile = lint$2(item, conf);
            // hack onchange
            (function () {
                var success = conf.fn;
                conf.fn = function (res, file) {
                    success.call(this, res, file);
                    uploadDom.value = '';
                };
            })();
            conf.beforeUpload && conf.beforeUpload(item);
            uploadAjax(item, lintFile.name, lib_1.clone(conf));
        }
    });
};

var uploadHtml = beforeUpload;

var format = {
    typeFormat: function typeFormat(typeArray) {
        if (typeArray === '*') return '*';
        if (!typeArray || !typeArray.length) return '';
        typeArray.forEach(function (item, index) {
            typeArray[index] = '*.' + item;
        });
        return typeArray.join(';');
    },
    sizeFormat: function sizeFormat(size) {
        if (!size || !parseFloat(size, 10)) return '0B';
        var unit = 'B';
        var hihgUnit = function hihgUnit(unit) {
            var unitUp = 'B';
            switch (unit) {
                case 'B':
                    unitUp = 'KB';
                    break;
                case 'KB':
                    unitUp = 'MB';
                    break;
                case 'MB':
                    unitUp = 'GB';
                    break;
                case 'GB':
                    unitUp = 'TB';
                    break;
            }
            return unitUp;
        };
        var size = parseInt(size, 10);
        while (size > 1024) {
            unit = hihgUnit(unit);
            size = parseFloat(size / 1024, 10);
        }
        return size + ' ' + unit;
    }
};

var loading = false;
var initList = [];
var resBase = 'http://changyan.itc.cn/mdevp/extensions/cui/002/swfupload.v2.2.0/';
var resBase = '//t.focus-res.cn/front-end/upload/';

var setting = {
    flash_url: resBase + 'swfupload.swf',
    prevent_swf_caching: false,
    file_size_limit: '1 MB',
    file_post_name: 'file',
    file_types: '*.jpg;*.png;*.gif;*.jpeg',
    button_text: '',
    button_image_url: resBase + 'swfupload.js?button_image_url'
};
var id = 0;

function upload(dom, conf) {
    if (dom) {
        var _uploader$config;

        uploader.config((_uploader$config = {
            file_size_limit: format.sizeFormat(conf.max)
        }, defineProperty(_uploader$config, 'file_size_limit', conf.max + 'B'), defineProperty(_uploader$config, 'file_post_name', conf.fileName), defineProperty(_uploader$config, 'file_types', format.typeFormat(conf.type)), defineProperty(_uploader$config, 'upload_progress_handler', conf.progress), defineProperty(_uploader$config, 'button_placeholder_id', 'selectFiles4'), _uploader$config));
        conf.id = id++;
        var fn = conf.fn;
        conf.fn = function (response, file) {
            if (typeof response === 'string') response = JSON.parse(response);
            fn.apply(this, arguments);
        };
        uploader.create(dom, conf);
    }
}
var fnLoadScript = function fnLoadScript(src, fun) {
    var head = document.getElementsByTagName('head')[0] || document.head || document.documentElement;

    var script = document.createElement('script');
    script.setAttribute('type', 'text/javascript');
    script.setAttribute('charset', 'UTF-8');
    script.setAttribute('src', src);

    if (typeof fun === 'function') {
        if (window.attachEvent) {
            script.onreadystatechange = function () {
                var r = script.readyState;
                if (r === 'loaded' || r === 'complete') {
                    script.onreadystatechange = null;
                    fun();
                }
            };
        } else {
            script.onload = fun;
        }
    }

    head.appendChild(script);
};
var fnInit = function fnInit($dom, conf) {
    var height = lib_1.getHeight($dom);
    var width = lib_1.getWidth($dom);

    if (lib_1.css($dom, 'position') === 'static' || lib_1.css($dom, 'position') === '') {
        lib_1.css($dom, 'position', 'relative');
    }
    var id = 'id-' + +new Date();
    var html = '\
            <span style="position: absolute; top: 0; left: 0; height: ' + height + 'px; width: ' + width + 'px; overflow: hidden; opacity: 0; filter:alpha(opacity=0); z-index: 100;">\
                <span  id="' + id + '"></span>\
            </span>\
        ';
    lib_1.prepend($dom, html);

    var _setting = lib_1.extends(setting, {
        upload_url: conf.uploadUrl,
        button_placeholder_id: id,
        button_width: width,
        button_height: height,
        button_cursor: SWFUpload.CURSOR.HAND,
        button_window_mode: SWFUpload.WINDOW_MODE.TRANSPARENT,
        conf: conf,
        upload_start_handler: function upload_start_handler() {
            this.settings.conf.beforeUpload();
        },
        file_dialog_complete_handler: function file_dialog_complete_handler() {
            this.startUpload();
        },
        file_queue_error_handler: function file_queue_error_handler(a, b, c) {
            this.settings.conf.fn(b, c);
        },
        upload_success_handler: function upload_success_handler(a, b, c) {
            this.settings.conf.fn(b, a);
        }
    });

    var tmp = new SWFUpload(lib_1.clone(_setting));
};
var uploader = {
    create: function create($dom, conf) {
        if (window.SWFUpload) {
            fnInit($dom, conf);
        } else {
            initList.push([$dom, conf]);

            if (loading) {
                return;
            }

            loading = true;
            // require.ensure(['./util/swfupload.js'], function () {
            fnLoadScript(resBase + 'swfupload.js', function () {
                // require('./util/swfupload.js');
                loading = false;

                var i, item;
                for (i = 0; i < initList.length; i++) {
                    item = initList[i];
                    fnInit(item[0], item[1]);
                }
                initList = [];
            });
        }
    },
    config: function config(paramsConfig) {
        lib_1.extends(setting, paramsConfig);
    }
};
var uploadSwf = upload;

var src = createCommonjsModule(function (module) {
    /*
     * @description lib-upload 通用的上传组件
     * @author luobata
     * @date 2017年1月7日14:46:03
     * */

    var upload = function upload(config) {
        var conf = {
            uploadUrl: '',
            type: ['png', 'jpg', 'jpeg'],
            method: 'POST',
            id: '#upload',
            fileName: 'image',
            min: 50 * 1024,
            max: 2.5 * 1024 * 1024,
            credentials: true,
            isMultiple: false,
            beforeUpload: function beforeUpload() {},
            fn: function fn(res) {
                console.log('upload success');
            },
            progress: function progress(res) {}
        };
        lib_1.extends(conf, config);
        var dom = document.querySelector(conf.id);
        if (!lint(conf)) {
            console.log('缺少必要参数!');
            return;
        }
        if (window.File) {
            uploadHtml(dom, conf);
        } else {
            hack_1(conf);
            uploadSwf(dom, conf);
        }
    };

    {
        module.exports = upload;
    }
});

var _upload;
var _upload2;

src((_upload = {
    id: '#upload',
    uploadUrl: '//adv.focus-dev.cn/api/upload/image/qualification'
}, defineProperty(_upload, 'uploadUrl', '//mp.focus-dev.cn/common/image/upload?type=1'), defineProperty(_upload, 'uploadUrl', 'http://10.0.76.115:3000/demo/upload'), defineProperty(_upload, 'uploadUrl', 'http://10.16.39.69:3000/demo/upload'), defineProperty(_upload, 'fileName', 'image'), defineProperty(_upload, 'fileName', 'file'), defineProperty(_upload, 'min', 100 * 1024), defineProperty(_upload, 'max', 10 * 1024 * 1024), defineProperty(_upload, 'isMultiple', true), defineProperty(_upload, 'fn', function fn(res) {
    console.log(res);
}), _upload));
src((_upload2 = {
    id: '#upload2',
    uploadUrl: '//adv.focus-dev.cn/api/upload/image/qualification'
}, defineProperty(_upload2, 'uploadUrl', '//mp.focus-dev.cn/common/image/upload?type=1'), defineProperty(_upload2, 'uploadUrl', 'http://10.0.76.115:3000/demo/upload'), defineProperty(_upload2, 'uploadUrl', 'http://10.16.39.69:3000/demo/upload'), defineProperty(_upload2, 'fileName', 'image'), defineProperty(_upload2, 'fileName', 'file'), defineProperty(_upload2, 'min', 0), defineProperty(_upload2, 'max', 10 * 10 * 1024), defineProperty(_upload2, 'type', '*'), defineProperty(_upload2, 'fn', function fn(res) {
    console.log(1);
    console.log(res);
}), _upload2));

var test = {};

return test;

})));
//# sourceMappingURL=upload.js.map
