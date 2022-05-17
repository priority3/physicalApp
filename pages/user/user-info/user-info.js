// pages/user/user-info/user-info.js
import {getUserInfo} from "../../../services/logionRequest"
import {updateStuPwd} from "../../../services/user"
// Notify弹出
import {handleOwnNotify,pasReg,isAuthToInfo,debounceInp} from "../../../utils/util"

Page({
  /**
   * 页面的初始数据
   */
  data: {
    list:{
      name:"zhang"
    },
    prePassword:'',
    newPassword:'',
    rePassword:'',
    btnLoading:false,
    avatarImg:"",
    dialogShow:false,
    isSubmit:true,
    isMessage:false,
    isAuth:false,
    // 修改信息dailog
    mesDailog:false,
    // 修改信息placeholder
    mesPlaceholder:"",
    // 当前修改的
    mesProperty:"",
    radio:'1'
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
    const {newPassword,rePassword,prePassword} = this.data
    if(newPassword !== rePassword){
      return
    }
    if(pasReg(newPassword)){
      updateStuPwd({prePassword,newPassword}).then((res) => {
        const {code,msg} = res
        handleOwnNotify(msg)
      }).catch(err => console.log(err))
    }else{
      handleOwnNotify("新密码必须为6-20位数字和英文🙄")
    }
  
    
  },

  // 退出登录
  handleLoginout(){
    wx.clearStorageSync()
    wx.router.reLaunch('/pages/login/login')
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    isAuthToInfo() && getUserInfo().then((res) => {
      if(res.code === 200){
        this.setData({
          list:res.data
        })
      }else{
        console.log(res);
        handleOwnNotify('用户信息获取失败🙄')
      }
    }).catch((err) => {
      handleOwnNotify('用户信息获取失败🙄')
      console.log(err);
    })
  },

//   重新计算data
  computedList(data){
    if(Array.isArray(data)){
        return data.map((item) => {
            return {

            }
        })
    }else{
        return data
    }
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

  handleSaveInfo(e){
    console.info('表单提交携带数据', e.detail.value)
  }

})