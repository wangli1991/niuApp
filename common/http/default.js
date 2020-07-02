/*
 * @Author: shenqz
 * @Date: 2020-04-28 20:42:09
 * @LastEditTime: 2020-04-29 16:38:31
 * @Description: request默认配置
 */
export default {
  baseUrl: "", //公用url
  method: "get", //请求方式
  isUseBaseUrl: true, //当前请求是否使用baseUrl
  loading: true, //是否使用默认加载提示
  header: {
    "X-Request-By": "uniRequest",
  },
  //!请求转换，默认不做任何修改，可以复写次方法做自己想做的
  transformRequest(config) {
    return config;
  },
  //!响应转化，默认不做任何修改，可以复写次方法做自己想做的
  transformResponse(data) {
    return data;
  },
};
