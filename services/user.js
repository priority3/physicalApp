// 学生信息请求管理
import {put} from "./http"

/**
 * 学生更改密码
 * @param {旧密码，新密码} param0 
 */
const updateStuPwd = ({prePassword,newPassword}) => {
  return put('/user/updatePwd',{prePassword,newPassword})
}

export {
  updateStuPwd
}