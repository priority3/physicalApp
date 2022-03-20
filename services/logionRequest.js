import {get,post} from "./http.js"

/**
 * 用户登录
 * @param {用户名，密码} param0 
 */
const postLogin = ({userName,password}) => {
  return post("/user/login",{userName,password})
}

/**
 * 获取用户的信息
 */
const getUserInfo = () => {
  return get("/student/stuInfo")
}

/**
 * 重新获取token
 */
const refreshToken = () => {
  return get("/user/refreshToken") 
}


export {
  postLogin,
  getUserInfo,
  refreshToken
}