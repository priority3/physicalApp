// pages/user/user.js
import {handleGetMessage} from "../../services/appiontList"
import {isAuthToInfo} from "../../utils/util"
import {FREE_APPROVE} from "../../config/keys"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},
    avatarImg:"",
    messageDot:false,
    urlList:{
        normal_approve:`/pages/user/free-appiont/free-appiont?normal_approve=${FREE_APPROVE['normal_approve']}`,
        slow_approve:`/pages/user/free-appiont/free-appiont?normal_approve=${FREE_APPROVE['slow_approve']}`,
        other_approve:`/pages/user/free-appiont/free-appiont?normal_approve=${FREE_APPROVE['other_approve']}`
    },
    token:wx.getStorageItem(wx.KEYS['TOKEN'])
  },
  // 获取通知消息
  handleGetMessage(){
    isAuthToInfo() && handleGetMessage().then((res) => {
      if(res){
        this.setData({
          messageDot:true
        })
      }else{
        this.setData({
          messageDot:false
        })
      }
    }).catch(err => {
      console.log(err);
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
    // 获取头像链接
    // this.handleGetMessage()
    const avatarImg = wx.getStorageItem("avatar")
    if(avatarImg){
      this.setData({
        avatarImg
      })
    }
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