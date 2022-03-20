
/**
 * 保留当前页面，跳转到应用内的某个页面。但是不能跳到 tabbar 页面。使用 wx.navigateBack 可以返回到原页面。小程序中页面栈最多十层。
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
 * 关闭当前页面，跳转到应用内的某个页面。但是不允许跳转到 tabbar 页面。
 * 对wxwx.redirectTo 得封装
 * @param {路由} url 
 * @param {参数} params 
 * @param {事件} events 
 */
const replace = (url,params) => {
  let query = ""
  for (const key in params) {
    // 防止hasOwnProperty覆盖
    if(Object.hasOwnProperty.call(params,key)){
      const element = params[key]
      query += `${key}=${element}&`
    }
  }
  wx.redirectTo({
    url: url+`?${query}`,
    success(res){
      console.log(res);
    },
    fail(err){
      console.log(err);
    }
  })
  
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
 * 关闭所有页面，打开到应用内的某个页面
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
 * 对switchTab 封装 跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面
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