import lib from '../lib/lib';
import ajax from '../lib/ajax';
import { validateSize, validateType } from './validate';
let time;

const lint = function (file) {
    let result = {
        error: '',
        errorType: 0
    };
    const type = result.type = file.name.split('.').pop().toLowerCase();
    const name = result.name = lib.getRandomString(32) + '.' + type;

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

const uploadAjax = (file, name, conf) => {
    let formData = new FormData();
    const uploadData = {
        name: conf.fileName,
        file: file
    };
    conf.file = file;
    formData.append(conf.fileName, file);
    conf.data = formData;
    ajax(conf);
};

const beforeUpload = function (dom, conf) {
const beforeUpload = function (upload) {
    upload.init();
    dom.addEventListener('change', function (e) {
		const file = e.target.files;
		let i;
		let item;
        let errors = [];
        let error = '';

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
            conf.fn({error: error});
            return;
        }
		for (i = 0; i < file.length; i++) {
			item = file[i];
			const lintFile = lint(item);
			// hack onchange
			(function () {
				var success = conf.fn;
				conf.fn = function (res, file) {
					success.call(this, res, file);
					uploadDom.value = '';
				};
			}());
			conf.beforeUpload && conf.beforeUpload(item);
			uploadAjax(item, lintFile.name, Object.assign({}, conf));
		}
    });
};

export default beforeUpload;
