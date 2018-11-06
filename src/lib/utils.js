import axios from 'axios';

axios.defaults.withCredentials = true;

/**
 * [ajax封装，包括环境域名判断，路径拼接]
 * @param  {[type]} options []
 * options.url
 * options.params
 * options.success
 * options.error
 * @return {[type]}[description]
 */
const header = {
    'Content-Type': 'application/json;charset=UTF-8',
};
/**
 * [getAjaxUrl description]
 * @param  {[type]} url       [description]
 * @param  {[type]} oldModule [ajax options中定义一个属性oldModule来标识请求老后端项目的接口，url规则和新项目不同]
 * @param  {[type]} exe       [ajax options中定义一个属性exe来标识请求exe的接口，url规则和ecom的不同]
 * @return {[type]}           [description]
 */
function getAjaxUrl(options) {
    if (/^https?:\/\/(([a-zA-Z0-9_-])+(\.)?)*(:\d+)?(\/((\.)?(\?)?=?&?[a-zA-Z0-9_-](\?)?)*)*$/i.test(options.url)) {
        return options.url;
    }
    return `http://10.4.226.82:8081/api/${options.url}`;
    // return `http://localhost:8081/api/${options.url}`;
}

function getUrlParam(paramName) {
    const paramList = {};
    if (location.search) {
        location.search.substr(1, location.search.length - 1).split('&').forEach((param) => {
            const p = param.split('=');
            paramList[p[0]] = p[1];
        });
    }
    return paramList[paramName] || '';
}

function dealResponse(result, options) {
    result.then((response) => {
        if (response && response.data) {
            if (options.success) {
                options.success(response.data);
            }
        } else if (options.error) {
            options.error(response);
        }
    })
        .catch((error) => {
            if (options.error) {
                options.error(error);
            }
        });
}
const Ajax = {
    get(options) {
        const result = axios.get(getAjaxUrl(options), {
            params: options.params,
        });
        dealResponse(result, options);
    },
    post(options) {
        const result = axios.post(getAjaxUrl(options), options.params, {
            headers: header,
        });
        dealResponse(result, options);
    },
    delete(options) {
        const result = axios.delete(getAjaxUrl(options), {
            params: options.params,
        });
        dealResponse(result, options);
    },
    put(options) {
        const result = axios.put(getAjaxUrl(options), options.params, {
            headers: header,
        });
        dealResponse(result, options);
    },
};

function getBrowserVersion() {
    const u = navigator.userAgent;
    return { // 移动终端浏览器版本信息
        trident: u.indexOf('Trident') > -1, // IE内核
        presto: u.indexOf('Presto') > -1, // opera内核
        webKit: u.indexOf('AppleWebKit') > -1, // 苹果、谷歌内核
        gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') === -1, // 火狐内核
        mobile: !!u.match(/AppleWebKit.*Mobile.*/), // 是否为移动终端
        ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // ios终端
        android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, // android终端或者uc浏览器
        iPhone: u.indexOf('iPhone') > -1, // 是否为iPhone或者QQHD浏览器
        iPad: u.indexOf('iPad') > -1, // 是否iPad
        webApp: u.indexOf('Safari') === -1, // 是否web应该程序，没有头部与底部
    };
}

export {
    Ajax,
    getUrlParam,
    getBrowserVersion,
};
