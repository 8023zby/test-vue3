/*
 * @Author: your name
 * @Date: 2022-02-22 17:06:07
 * @LastEditTime: 2022-05-18 17:07:07
 * @LastEditors: zhangbinyan 1733674157@qq.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \test-vue3\src\api\index.js
 */
import { _post, _get, _put } from "./http.js";
export const loginApi = {
  login: (params = null) => {
    return _post({ url: "/passport/web-rbac/logins/login", data: params });
  },
  logout: () => {
    return _get({ url: "/passport/web-rbac/logins/loginOut" });
  },
  getLandingEndId: () => {
    return _get({ url: "/passport/web-rbac/logins/selectLandingEndId" });
  },
  getDeptId: () => {
    return _get({ url: "passport/web-rbac/logins/selectDataDeptID" });
  },
  selectDept: (params = null) => {
    return _post({
      url: `/passport/web-rbac/logins/selectDataDeptID/${params}`,
    });
  },
  getAuth: (params = null) => {
    return _get({
      url: `/passport/web-rbac/logins/auth/${params}`,
    });
  },
  checkDeptLanding: (params = null) => {
    return _get({
      url: `/omms/web-rbac/logins/checkDeptLanding`,
      data: params,
    });
  },
  // 保存护理单元
  saveDept: (params = null) => {
    return _post({
      url: `/passport/web-rbac/logins/selectDataDeptID/${params}`,
    });
  },
  changePassword: (params = null) => {
    return _put({
      url: `/passport/web-rbac/logins/userPwd`,
      data: params,
    });
  }
};
