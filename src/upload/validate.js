// 返回true 代表合法 false代表不合法
// 校验conf是否合法
// 通过call传递this 不能使用箭头函数
export const validateConf = function () {
    if (!this.conf.uploadUrl || !this.conf.selecter || !this.conf.fn) {
        return false;
    }

    return true;
};
// 校验类型
export const validateType = function (type) {
    if (this.conf.type === '*') {
        return true;
    }

    return !!(this.conf.type.indexOf(type) !== -1);
};
// 校验尺寸
export const validateSize = function (size) {
    return (!this.conf.min || size >= this.conf.min) && (!this.conf.max || size <= this.conf.max);
};
// 校验文件大小
export const validateCap = function (img) {
    return new Promise((resolve, reject) => {
        const val = (img) => {
            const width = img.width;
            const height = img.height;
            const cap = this.conf.cap;
            if ((cap.minWid && width < cap.minWid) ||
                (cap.maxWid && width > cap.maxWid) ||
                (cap.minHei && height < cap.minHei) ||
                (cap.maxHei && height > cap.maxHei)
            ) {
                reject({
                    error: '图片尺寸不符合要求!'
                });
            } else {
                resolve();
            }
        };
        if (img.complete) {
            return val(img);
        } else {
            img.onload = () => {
                return val(img);
            };
        }
    });
};

