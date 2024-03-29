// app.js

import router from "./router/router"
import keys from "./config/keys"
import {
    getStorageItem,
    setStorageItem,
    removeStorageItem,
    clearStorageItem
} from "./utils/util"
App({
  onLaunch() {
    // // 展示本地存储能力
    // const logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    
    // wx.setStorageSync('logs', logs)
    // // 登录
    // wx.login({
    //   success: res => {
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //   }
    // })

    // 获取收集系统信息
    //  获取设备信息 
    wx.getSystemInfo({
      success: (e) => {
          let custom = wx.getMenuButtonBoundingClientRect(); //菜单按钮
          this.globalData.statusBarHeight = e.statusBarHeight; //状态栏高度
          this.globalData.custom = custom;
          this.globalData.pageHeight = e.windowHeight;
          this.globalData.customBarHeight =
              custom.bottom + custom.top - e.statusBarHeight;
      },
      
  });

    // 增加路由守卫
    wx.router = router
    // 添加常用变量
    wx.KEYS = keys

    // 存储
    wx.getStorageItem = getStorageItem
    wx.setStorageItem = setStorageItem
    wx.removeStorageItem = removeStorageItem
    wx.clearStorageItem = clearStorageItem
  },
  globalData: {
    custom: '',
    customBarHeight: '',
    statusBarHeight: '',
    pageHeight: '',
},
})
