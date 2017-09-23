const lib = {
    extends: function (source, target) {
        for (var k in target) {
            if (lib.isObject(target[k]) && lib.isObject(source[k])) {
                lib.extends(source[k], target[k]);
            } else {
                source[k] = target[k];
            }
        }
        return source;
    },
    clone: function (obj) {
        var o;
        if (typeof obj === "object") {
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
    isObject: function (obj) {
        return typeof obj === 'object' && !(obj instanceof Array);
    },
    queryString: function (object) {
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
    getRandomString: function (len) {
        len = len || 32;
        var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
        var maxPos = $chars.length;
        var pwd = '';
        for (var i = 0; i < len; i++) {
            pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
        }
        return pwd;
    },
    getWidth: function (dom) {
        return dom.offsetWidth;
    },
    getHeight: function (dom) {
        return dom.offsetHeight;
    },
    prepend: function (dom, html) {
        dom.innerHTML = html + dom.innerHTML;
    },
    css: function (dom, sty, newSty) {
        if (!newSty) {
            return dom.style[sty];
        } else {
            dom.style[sty] = newSty;
            return dom;
        }
    }
};

export default lib;
