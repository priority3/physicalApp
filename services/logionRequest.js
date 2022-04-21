import {get,post} from "./http.js"

/**
 * 用户登录
 * @param {用户名，密码} param0 
 */
const postLogin = ({userName,password}) => {
  return new Promise((reslove,reject) => {
    post("/user/login",{userName,password}).then((res) => {
      reslove(res)
    }).catch((err) => {
      reject(err.msg)
    })
  })
}

/**
 * 获取用户的信息
 */
const getUserInfo = () => {
  return get("/user/userInfo")
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