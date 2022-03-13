
function HttpInstance (url,data,method,option){
  const BASEURL = "http://192.168.31.200:8282"
  const authorization = wx.getStorageItem(wx.KEYS["TOKEN"])
  const refreshToken = wx.getStorageItem(wx.KEYS["REFRESH_TOKEN"]);

  let header = {}
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
        console.log(res,"http");
        return resolve(res.data)
       },
       fail(err){
         console.log(err,"http");
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
const post = (url,params,options={}) => {
  return HttpInstance(url, params, "POST", options);
}

export {
  get,
  post
}