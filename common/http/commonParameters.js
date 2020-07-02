/*
 * @Author: shenqz
 * @Date: 2020-04-29 14:52:14
 * @LastEditTime: 2020-04-29 16:03:24
 * @Description: 业务请求公共参数，单独文件返回，公共参数拼接到url上
 */

import md5 from "js-md5";
import moment from "moment";
import { connectUrl } from "./util";

const secretKey = "abcdefghijklmnopqrstuvwxyz123456";

export default (config) => {
  let url = config.url;
  let params = {
    vSign: "",
    _: Date.now(),
  };
  params.vSign = sign(params, config);
  url = getParam(params, url);
  return url;
};

function getParam(params, url) {
  url += url.indexOf("?") < 0 ? "?" : "";
  for (var k in params) {
    let value = params[k] !== undefined ? params[k] : "";
    url += `&${k}=${encodeURIComponent(value)}`;
  }
  return url;
}

function sign(params, config) {
  let signStr = "";
  let url = connectUrl(config.baseUrl, config.url);
  signStr += url + "_";
  signStr += "appkey=" + params.vAppKey + "_";
  signStr += JSON.stringify(config.data) + "_";
  signStr += secretKey + "_";
  signStr += moment(new Date()).format("YYYYMMDD") + "_";
  signStr += params.userid + "_";
  signStr += params.companyid;
  signStr = md5(signStr.toLowerCase());
  return signStr;
}
