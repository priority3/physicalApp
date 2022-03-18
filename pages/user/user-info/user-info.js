// pages/user/user-info/user-info.js
import {getUserInfo} from "../../../services/logionRequest"

// Notify弹出
import {Notify,pasReg} from "../../../utils/util"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:{
      
    },
    oldPassword:'',
    newPassword:'',
    rePassword:'',
    btnLoading:false,
    avatarImg:"",
    dialogShow:false,
    isSubmit:true,
    isMessage:false
  },
  handleOwnNotify(message, type = "warning") {
    // let top = app.globalData.statusBarHeight;
    Notify({
      type,
      message,
      // top
    });
  },
  
  
  // 关闭弹出层
  onClose() {
    this.setData({ 
      popShow: false 
    });
  },
  
 
  // 更换头像
  selectAvatar(){
    wx.chooseImage({
      count: 1,
      success:(res)=>{
        if(res.tempFilePaths){
          this.setData({
            avatarImg:res.tempFilePaths[0]
          })
          wx.setStorageItem({
            avatar:res.tempFilePaths[0]
          })
        }
      },
      fail(err){
        console.log(err);
      }
    })
  },
  // 点击弹出 更换密码 弹窗
  changePassword(){
    this.setData({
      dialogShow:true
    })
  },
  
  // 修改密码 确定之后回调
  fixedPassword(){
    const {newPassword,rePassword} = this.data
    if(newPassword !== rePassword){
      return
    }
    console.log("ok 更改密码");
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    getUserInfo().then((res) => {
      if(res.statusCode === 200){
        this.setData({
          list:res.data
        })
      }else{
        this.handleOwnNotify('用户信息获取失败🙄')
      }
    }).catch((err) => {
      this.handleOwnNotify('用户信息获取失败🙄')
      console.log(err);
    })
    
    
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