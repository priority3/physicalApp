
/**
 * 对 wx.navigateTo 封装
 * @param {跳转路由} url  
 * @param {参数} params 
 * @param {事件} events 
 */
const push = (url,params,events) => {
  let query = ""
  for (const key in params) {
    // 防止hasOwnProperty覆盖
    if(Object.hasOwnProperty.call(params,key)){
      const element = params[key]
      query += `${key}=${element}&`
    }
    wx.navigateTo({
      url: url+`?${query}`,
      events,
      success(res){
        console.log(res);
      },
      fail(err){
        console.log(err);
      }
    })
  }
}
/**
 * 对wxwx.redirectTo 得封装
 * @param {路由} url 
 * @param {参数} params 
 * @param {事件} events 
 */
const replace = (url,params,events) => {
  let query = ""
  for (const key in params) {
    // 防止hasOwnProperty覆盖
    if(Object.hasOwnProperty.call(params,key)){
      const element = params[key]
      query += `${key}=${element}&`
    }
    wx.redirectTo({
      url: url+`?${query}`,
      events,
      success(res){
        console.log(res);
      },
      fail(err){
        console.log(err);
      }
    })
  }
}

/**
 * 对wxwx.navigateBack 封装
 * @param {返回得层级数} num 
 */
const pop = (num) => {
  wx.navigateBack({
    delta: num,
    success(res){
      console.log(res);
    },
    fail(err){
      console.log(err);
    }
  })
}

/**
 * 对relaunch 封装
 * @param {路由} url 
 */
const reLaunch = (url) => {
  wx.reLaunch({
    url: url,
    success(res){
      console.log(res);
    },
    fail(err){
      console.log(err);
    }
  })
}
/**
 * 对switchTab 封装
 * @param {路由} url 
 */
const switchTab = (url) => {
  wx.switchTab({
    url: url,
    success(res) {
      console.log(res);
    },
    fail(err){
      console.log(err);
    }
  })
}

module.exports = {
  push,
  pop,
  reLaunch,
  replace,
  switchTab
}