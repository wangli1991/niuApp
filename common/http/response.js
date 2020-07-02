/*
 * @Author: shenqz
 * @Date: 2020-04-29 10:51:14
 * @LastEditTime: 2020-04-29 12:11:05
 */
export default function (res) {
  let ok = res.statusCode >= 200 && res.statusCode < 300;
  return {
    ok,
    statusCode: res.statusCode,
    data: res.data,
    header: res.header,
    errMsg: res.errMsg,
  };
}
