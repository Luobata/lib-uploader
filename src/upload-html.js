var hex_sha1 = require('./md5.js');
var lib = require('./lib/lib');
var ajax = require('./lib/ajax');
var time;

var lint = function (file, conf) {
    var result = {
        error: '',
        errorType: 0
    };
    var type = result.type = file.name.split('.').pop().toLowerCase();
    var name = result.name = lib.getRandomString(32) + '.' + type;

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
    var isMulti = conf.isMultiple ? 'multiple' : '';
    var input = '<input type="file"' + isMulti + ' style="position: absolute; width: 100%; height: 100%; opacity: 0; filter: alpha(opacity=0); cursor: pointer; top: 0; left: 0; z-index: 100;" name="" />';
    lib.prepend(dom, input);
    var uploadDom = dom.querySelector('input');
    dom.addEventListener('change', function (e) {
		var file = e.target.files;
		var i;
		var item;
        var errors = [];
        var error = '';

        for (i = 0; i < file.length; i++) {
            item = file[i];
            errors[i] = lint(item, conf).errorType;
        }
        if (errors.indexOf(1) !== -1 || errors.indexOf(3) !== -1) {
            error += '图片大小不符合要求';
        }
        if (errors.indexOf(2) !== -1 || errors.indexOf(3) !== -1) {
            if (error) error += '、';
            error += '图片格式不符合要求';
        }
        if (error) {
            conf.fn({error: error});
            return;
        }
		for (i = 0; i < file.length; i++) {
			item = file[i];
			var lintFile = lint(item, conf);
			// hack onchange
			(function () {
				var success = conf.fn;
				conf.fn = function (res, file) {
					success.call(this, res, file);
					uploadDom.value = '';
				};
			}());
			conf.beforeUpload && conf.beforeUpload(item);
			uploadAjax(item, lintFile.name, lib.clone(conf));
		}
    });
};

module.exports = beforeUpload;
