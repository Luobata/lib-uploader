export let config = {
    uploadUrl: '',
    selecter: '',
    domain: '',
    type: ['png', 'jpg', 'jpeg'],
    method: 'POST',
    fileName: 'image',
    min: 50 * 1024,
    max: 2.5 * 1024 * 1024,
    credentials: true,
    isMultiple: false,
    beforeUpload: function () {
    },
    fn: function (res) {
    },
    progress: function (res) {
    }
};

export const setConfig = (conf) => {
    config = Object.assign(config, conf);
};
