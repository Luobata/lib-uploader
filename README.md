# lib-upload

lib-upload ，一个兼容低版本浏览器的异步上传组件

# 综述

* 版本：1.0.0
* 作者: 罗比塔

# 特点

* 轻量，体积小。
* 可根据浏览器性能检测选择最合适的上传方式，高版本浏览器（Chrome，FireFox）会直接使用异步ajax上传，低版本浏览器（ie 9及以下），会使用falsh进行图片上传。
* 简单无依赖，唯一依赖的swf文件会在库文件中以cdn方式引入。

# 安装

* npm安装

```
npm install lib-uploader
```

# 快速上手

```
var upload = require('lib-uploader');

upload({
    id: '#upload',
    uploadUrl: '',
    fn: function (res) {
        console.log(res);
    }
});
// 需要创建一个id为upload的dom对象，实例化之后，会自动创建这个dom的事件监听，完成图片上传。
```

# Demo

本地demo:

```
git clone 
npm install
npm run test
访问 http://127.0.0.1:8888/test.html
```

在线demo:

# Arrtibute

| Arrtibute \(\* 代表必填\) | 含义 | 默认 | 回调参数（function特有） |
| :--- | :--- | :--- | :--- |
| id \(string\) \* | 上传按钮id（dom需要提前创建） | \#upload |  |
| min \(number\) | 上传的最小值（单位字节） | 50 \* 1024 |  |
| max \(number\) | 上传的最大值（单位字节） | 2.5 \* 1024 \* 1024 |  |
| type \(array/string\) | 上传图片的合法类型 | \['png', 'jpg', 'jpeg'\]\(暂时只支持这几种后缀格式，或使用通配符 '\*' 表示不限制格式\) |  |
| uploadUrl \(string\) \* | 上传图片的接口（不支持post传递参数，参数通过url传递） |  |  |
| fileName \(string\) | 上传图片的file name（模拟浏览器name） | image |  |
| credentials \(boolean\) | 请求是否需要携带cookie | true |  |
| beforeUpload \(function\) | 上传前执行函数 |  | function \(file\) {} file:文件对象 |
| fn \(function\) \* | 上传之后的回调 | function \(res\) { console.log\(res\); } | fn \(data, file\) {} data: 服务端返回值 file: 文件对象 |
| progress \(function\) | 上传进度方法 每次进度变化触发 | 无 | function \(file, percent, total\) {} file: 文件对象 percent:当前进度 total: 总进度 |
| isMulti \(boolean\)\ | 是否支持多文件上传 | false |  |

# 注意事项

id: 上传的dom对象，会自动在dom对象下创建input file对象或 swf对象，并进行事件监听，所以需要在使用前保证dom已经存在。

fn: 上传之后的回调不区分success与fail, 如果成功，会返回接口数据，如果失败，返回一个error对象。

uploadUrl: 接口接受一个文件流，可以约定文件的name（input 元素的name），其他参数通过url传递。

type: 接受一个后缀名数组或唯一字符串'\*'表示不限制格式。
