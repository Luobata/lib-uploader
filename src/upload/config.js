export let config = {
    uploadUrl: '',
    selecter: '',
    type: ['png', 'jpg', 'jpeg'],
    method: 'POST',
    fileName: 'image',
    // min: 50 * 1024,
    // max: 2.5 * 1024 * 1024,
    credentials: true,
    isMultiple: false,
    cap: {
        minWid: 50,
        maxWid: 800,
        minHei: 60,
        maxHei: 900,
        validate (res) {
            const url = '//t-img.51f.com/' + res.data.url;
            const img = new Image();
            img.src = url;
            return img;
        }
    },
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
