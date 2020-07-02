import http from "@/common/http/index.js";

export const getAppVersionInfo = (data) => {
  return http.request({
    url: "/DMS_Mobile_TDS/SysCommon/GetAppVersionInfo",
    method: "post",
    loading: false,
    data,
  });
};
