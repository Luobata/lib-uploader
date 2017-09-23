export default (conf) => {
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
