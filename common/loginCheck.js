import http from "@/common/http";
export const loginCheck = () => {
  return http.request({
    url: "/user/loginCheck",
    method: "get",
    data: {},
  });
};
