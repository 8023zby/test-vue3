/*
 * @Author: your name
 * @Date: 2022-02-22 16:48:39
 * @LastEditTime: 2022-02-22 17:33:38
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \test-vue3\src\api\http.js
 */
//引入 axios
import axios from "axios";
import { ElMessage } from "element-plus";

const http = axios.create({
  baseURL: "/",
  timeout: 50000,
  responseType: "json",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
  },
});

// 数据请求拦截
http.interceptors.request.use(
  (config) => {
    config.headers.Authorization = "sdfsf56s5df65s6f43s45gsada5sd6fsdAds";
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 返回响应数据拦截
http.interceptors.response.use(
  (res) => {
    const data = res.data;
    // 状态码为 2xx 范围时都会调用该函数，处理响应数据
    if (res.status === 200) {
      // const code = data.code;
      return Promise.resolve(data);
    }
  },
  (error) => {
    if (error.response.status) {
      // 状态码超过 2xx 范围时都会调用该函数，处理错误响应
      switch (error.response.status) {
        case 404:
          ElMessage({
            type: "error",
            message: "请求路径找不到！",
            showClose: true,
          });
          break;
        case 502:
          ElMessage({
            type: "error",
            message: "服务器内部报错！",
            showClose: true,
          });
          break;
        default:
          break;
      }
    }
    return Promise.reject(error);
  }
);
export default http;

// get
export const _get = (req) => {
  return axios.get(req.url, { params: req.data });
};

// post
export const _post = (req) => {
  return axios({
    headers: {
      "Content-Type": "application/json",
    },
    transformRequest: [
      (data) => {
        return JSON.stringify(data);
      },
    ],
    method: "post",
    url: `${req.url}`,
    data: req.data,
  });
};
