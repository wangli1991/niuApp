/*
 * @Author: shenqz
 * @Date: 2020-04-28 16:25:32
 * @LastEditTime: 2020-04-29 16:48:26
 * @Description: HttpRequest基层函数，可以使用其他ajax
 */

//!uni.request(OBJECT)需要的参数，根据他过滤options
const uniRequest = {
  url: "",
  method: "",
  data: "",
  header: "",
  dataType: "",
  timeout: "",
  responseType: "",
  sslVerify: true,
  withCredentials: false,
};

//过滤参数
const filterOptions = (options) => {
  let _options = {};
  for (let key in uniRequest) {
    if (options[key] !== undefined) {
      _options[key] = options[key];
    }
  }
  return _options;
};

//! request核心函数，此处用的是uni.request(),但可以替换成任意ajax，如fetch、XML等，但参数要根据情况修改
export default function request(options) {
  const loading = options.loading;
  const loadingTitle = options.loadingTitle;
  options = filterOptions(options);
  return new Promise((resolve, reject) => {
    loading &&
      uni.showLoading({
        title: loadingTitle || "加载中...",
        mask: true,
      });
    uni.request({
      ...options,
      success(res) {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(res);
        } else {
          reject(res);
        }
      },
      fail(error) {
        console.log(error);
        reject(error);
      },
      complete() {
        loading && uni.hideLoading();
      },
    });
  });
}
