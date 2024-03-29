
function HttpInstance (url,data,method,option){
  // const BASEURL = "http://192.168.31.200:8282"
  const BASEURL = "https://physicaltest.weilylab.com:8282"
  const authorization = wx.getStorageItem(wx.KEYS["TOKEN"])
  const refreshToken = wx.getStorageItem(wx.KEYS["REFRESH_TOKEN"]);
  let header = {
    token:authorization
  }
   option = option || {}

   if(authorization && refreshToken){
     header = {
       ...header,
       authorization,
       refreshToken
     }
   }
   let params = {
     ...data
   }
   return new Promise((resolve,reject) => {
     wx.request({
       url: `${BASEURL}${url}`,
       method,
       timeout:10000,
       data:params,
       header:{
         ...header
       },
       success(res){
        // token过期处理
        if(res.data.code === 10001){
          wx.clearStorageSync()
          wx.router.replace("/pages/login/login",{msg:res.data.msg})
          reject(res.data)
        }
        if(res.data.code !== 200){
          reject(res.data)
        }
        // wx.router.replace("/pages/login/login")
        return resolve(res.data)
       },
       fail(){
         const err = "出问题啦~，请检查网络后重试"
         return reject(err)
       }
     })
   })


}


const get = (url,params = [] ,options = {} ) => {
  
  return HttpInstance(
    url,{
      ...params
    },
    "GET",
    options
  )
}
const post = (url,params,options = {}) => {
  return HttpInstance(url, params, "POST", options);
}

const put = (url,params,options = {}) => {
  return HttpInstance(url,params,"PUT",options)
}

export {
  get,
  post,
  put
}