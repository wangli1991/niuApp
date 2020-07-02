/*
 * @Author: shenqz
 * @Date: 2020-04-28 15:42:09
 * @LastEditTime: 2020-04-29 15:49:42
 * @Description: HttpRequest核心类
 */

import request from "./request";
import createResponse from "./response";
import Interceptors from "./interceptors";
import { assert, merge, clone, connectUrl } from "./util";
import defaultOptions from "./default";
class HttpRequest {
  constructor() {
    const _this = this;
    this.interceptors = {
      request: new Interceptors(),
      response: new Interceptors(),
    };
    return new Proxy(request, {
      get(data, name) {
        return _this[name];
      },
      set(data, name, val) {
        _this[name] = val;
        return true;
      },
      apply(fn, thisArg, args) {
        _this.request(args[0]);
      },
    });
  }
  /**
   * @description: request核心函数
   * @param {object} options 请求配置
   * @return: ajax promise
   */
  request(options) {
    let result = clone(this.default);
    merge(result, options);
    options = result;
    checkOptions(options);
    options.method = options.method.toLowerCase();
    if (options.isUseBaseUrl) {
      options.url = connectUrl(options.baseUrl, options.url);
    }
    const { transformRequest, transformResponse } = options;
    options = transformRequest(options);
    checkOptions(options);
    let list = this.interceptors.request.list();
    list.forEach((fn) => {
      options = fn(options);
      checkOptions(options);
    });
    return new Promise((resolve, reject) => {
      request(options).then(
        (res) => {
          let result = createResponse(res);
          res.data = transformResponse(result.data);
          let list = this.interceptors.response.list();
          list.forEach((fn) => {
            result = fn(result);
          });
          resolve(result);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  get(...args) {
    console.log("暂未开发", args);
  }

  post(...args) {
    console.log("暂未开发", args);
  }
}

HttpRequest.create = HttpRequest.prototype.create = function (options) {
  let httpRequest = new HttpRequest();
  let res = clone(defaultOptions);
  merge(res, options);
  httpRequest.default = res;
  return httpRequest;
};

function checkOptions(options) {
  assert(options, "options is required");
  assert(options.method, "method is required");
  assert(typeof options.method == "string", "method must be string");
  assert(options.url, "url is required");
  assert(typeof options.url == "string", "url must be string");
}

export default HttpRequest.create();
