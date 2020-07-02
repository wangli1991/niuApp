/*
 * @Author: shenqz
 * @Date: 2020-04-28 14:32:57
 * @LastEditTime: 2020-04-30 08:24:04
 * @Description: 所有业务相关请求拦截、响应拦截、公共参数配置写在这里，不要污染HttpRequest类
 */
import HttpRequest from "./httpRequest";
import commonParameters from "./commonParameters";
import baseConfig from "@/config";

const baseUrl = baseConfig.baseUrl;
let http = HttpRequest.create({
  baseUrl,
  header: {
    Authorization: "Bearer",
  },
  transformRequest(config) {
    config.header.test = "sdfasdf";
    return config;
  },
});

http.interceptors.request.use((config) => {
  config.url = commonParameters(config);
  // if (config.method === "post") {
  //   config.data = {
  //     InParam: JSON.stringify(config.data),
  //   };
  // }
  return config;
});

http.interceptors.response.use((res) => {
  return res.data;
});

export default http;
