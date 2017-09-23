(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(factory());
}(this, (function () { 'use strict';

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

var config = {
    uploadUrl: '',
    domain: '',
    type: ['png', 'jpg', 'jpeg'],
    method: 'POST',
    selecter: '#upload',
    fileName: 'image',
    min: 50 * 1024,
    max: 2.5 * 1024 * 1024,
    credentials: true,
    isMultiple: false,
    beforeUpload: function beforeUpload() {},
    fn: function fn(res) {},
    progress: function progress(res) {}
};

var setConfig = function setConfig(conf) {
    config = Object.assign(config, conf);
};

var _this = undefined;

// 返回true 代表合法 false代表不合法
// 校验conf是否合法

// 校验类型
var validateType = function validateType(type) {
    if (_this.conf.type === '*') {
        return true;
    }

    return !!(_this.conf.type.indexOf(type) !== -1);
};
// 校验尺寸
var validateSize = function validateSize(size) {
    return size >= _this.conf.min && (!_this.conf.max || size <= _this.conf.max);
};
// 校验文件大小

var lint$1 = function lint(conf) {
    var lintFile = {};
    if (conf.url) {
        lintFile.error = '缺少参数url';
    }
    return lintFile;
};

var ajax = (function (conf) {
    var lintFile = lint$1(conf);
    var xhr = new XMLHttpRequest();
    if (lint$1.error && conf.fn && typeof conf.fn === 'function') {
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
});

var lint = function lint(file) {
    var result = {
        error: '',
        errorType: 0
    };
    var type = result.type = file.name.split('.').pop().toLowerCase();
    var name = result.name = lib.getRandomString(32) + '.' + type;

    if (!validateSize(file.size)) {
        result.error = '图片大小不符合要求!';
        result.errorType = 1;
    }

    //if (conf.type === '*') {
    //    return result;
    //}

    if (!validateType(type)) {
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
    if (lib.css(dom, 'position') === 'static' || lib.css(dom, 'position') === '') {
        lib.css(dom, 'position', 'relative');
    }
    var isMulti = conf.isMultiple ? 'multiple' : '';
    var input = '<input type="file"' + isMulti + ' style="position: absolute; width: 100%; height: 100%; opacity: 0; filter: alpha(opacity=0); cursor: pointer; top: 0; left: 0; z-index: 100;" name="" />';
    lib.prepend(dom, input);
    var uploadDom = dom.querySelector('input');
    dom.addEventListener('change', function (e) {
        var file = e.target.files;
        var i = void 0;
        var item = void 0;
        var errors = [];
        var error = '';

        for (i = 0; i < file.length; i++) {
            item = file[i];
            errors[i] = lint(item).errorType;
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
            var lintFile = lint(item);
            // hack onchange
            (function () {
                var success = conf.fn;
                conf.fn = function (res, file) {
                    success.call(this, res, file);
                    uploadDom.value = '';
                };
            })();
            conf.beforeUpload && conf.beforeUpload(item);
            uploadAjax(item, lintFile.name, Object.assign({}, conf));
        }
    });
};

(function () {
	if (typeof Object.assign != 'function') {
		Object.assign = function (target, varArgs) {
			// .length of function is 2
			'use strict';

			if (target == null) {
				// TypeError if undefined or null
				throw new TypeError('Cannot convert undefined or null to object');
			}

			var to = Object(target);

			for (var index = 1; index < arguments.length; index++) {
				var nextSource = arguments[index];

				if (nextSource != null) {
					// Skip over if undefined or null
					for (var nextKey in nextSource) {
						// Avoid bugs when hasOwnProperty is shadowed
						if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
							to[nextKey] = nextSource[nextKey];
						}
					}
				}
			}
			return to;
		};
	}
})();

/*
 * @description lib-upload 通用的上传组件
 * @author luobata
 * @date 2017年1月7日14:46:03
 * */

var upload = {
    config: function config$$1(conf) {
        setConfig(conf);
    },
    upload: function upload(conf) {
        var con = Object.assign(config, conf);
        var upload = new Upload(con);

        if (window.File) {
            beforeUpload(upload);
        } else {
            //hack(con);
            //uploadSwf(dom, con);
        }

        return upload;
    }
};

var _upload$upload;

upload.config({
    uploadUrl: 'http://10.16.39.69:3000/demo/upload',
    fileName: 'file',
    min: 0,
    max: null,
    isMultiple: true
});

upload.upload({
    id: '#upload',
    // uploadUrl: '//adv.focus-dev.cn/api/upload/image/qualification',
    // uploadUrl: '//mp.focus-dev.cn/common/image/upload?type=1',
    // uploadUrl: 'http://10.0.76.115:3000/demo/upload',
    // fileName: 'image',
    fn: function fn(res) {
        console.log(res);
    }
});
upload.upload((_upload$upload = {
    id: '#upload2',
    uploadUrl: '//adv.focus-dev.cn/api/upload/image/qualification'
}, defineProperty(_upload$upload, 'uploadUrl', '//mp.focus-dev.cn/common/image/upload?type=1'), defineProperty(_upload$upload, 'uploadUrl', 'http://10.0.76.115:3000/demo/upload'), defineProperty(_upload$upload, 'uploadUrl', 'http://10.16.39.69:3000/demo/upload'), defineProperty(_upload$upload, 'fileName', 'image'), defineProperty(_upload$upload, 'fileName', 'file'), defineProperty(_upload$upload, 'min', 0), defineProperty(_upload$upload, 'max', 10 * 10 * 1024), defineProperty(_upload$upload, 'type', '*'), defineProperty(_upload$upload, 'fn', function fn(res) {
    console.log(1);
    console.log(res);
}), _upload$upload));

})));
//# sourceMappingURL=upload.js.map
