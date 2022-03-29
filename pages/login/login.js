// pages/login/login.js
import {postLogin} from "../../services/logionRequest"

import {idReg,handleOwnNotify} from "../../utils/util"
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userName:"",
    password:"",
    isLoading:false
  },
  
  
  loginClick(){
    
    const {userName,password} = this.data
    // 检验
    if(idReg(userName)){
      this.setData({
        isLoading:true
      })
      return postLogin({userName,password}).then((res) => {
        if(res.code === 500){
          handleOwnNotify(res.msg)
          return
        }
        wx.setStorageItem({
          ...res.data
        })
        this.handleRedirect()
      }).catch(err => {
        
        handleOwnNotify(err || "登录失败，请重试🙄")
      }).finally(() => {
        this.setData({
          isLoading:false
        })
      })
    }else{
      // 抛出 提出校验不通过
      handleOwnNotify("账号不能为空🙄")

    }
    // wx.router.switchTab('/pages/index/index')
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    let token = wx.getStorageItem("token")
    if(token){
      this.handleRedirect()
      return
    }
    
    if(options.msg){
      handleOwnNotify(options.msg.replace('token','登录') || "登录失败，请重试🙄")
    }
  },
  handleRedirect() {
    return wx.router.switchTab("/pages/index/index");
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})