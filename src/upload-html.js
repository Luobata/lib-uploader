var hex_sha1 = require('./md5.js');
var lib = require('./lib/lib');
var ajax = require('./lib/ajax');
var time;
var min;
var max;
var types;

var lint = function (file, conf) {
    var result = {
        error: ''
    };
    var type = result.type = file.name.split('.').pop().toLowerCase();
    var name = result.name = lib.getRandomString(32) + '.' + type;

    if (types === '*') {
        return result;
    }

    if (types.indexOf(type) === -1) {
        result.error = '图片类型错误!';
        return result;
    }
    if (file.size < min || file.size > max) {
        result.error = '图片大小不符合要求!';
        return result;
    }

    return result;
};

var uploadAjax = function (file, name, conf) {
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

var beforeUpload = function (dom, conf) {
    if (lib.css(dom, 'position') === 'static' || lib.css(dom, 'position') === '') {
        lib.css(dom, 'position', 'relative');
    }
    var input = '<input type="file" style="position: absolute; width: 100%; height: 100%; opacity: 0; filter: alpha(opacity=0); cursor: pointer; top: 0; left: 0; z-index: 100;" name="" />';
    lib.prepend(dom, input);
    var uploadDom = dom.querySelector('input');
    min = conf.min;
    max = conf.max;
    types = conf.type;
    dom.addEventListener('change', function (e) {
		var file = e.target.files;
		var i;
		var item;
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
			}());
			if (lintFile.error) {
				conf.fn(lintFile);
				return;
			}
			conf.beforeUpload && conf.beforeUpload(item);
			uploadAjax(item, lintFile.name, lib.clone(conf));
		}
    });
};

module.exports = beforeUpload;
