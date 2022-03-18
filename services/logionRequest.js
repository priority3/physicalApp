import {get,post} from "./http.js"


const postLogin = ({userName,password}) => {
  return post("/user/login",{userName,password})
}

const getUserInfo = () => {
  return get("/student/stuInfo")
}


export {
  postLogin,
  getUserInfo
}