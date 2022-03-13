import {get,post} from "./http.js"


const postLogin = ({userName,password}) => {
  return post("/user/login",{userName,password})
}


export {
  postLogin
}