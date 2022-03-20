// pages/user/info-appiont/info-appiont.js
import {getUsedAppiontInfo} from "../../../services/appiontList"
import {handleOwnNotify} from "../../../utils/util"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    option1:[
      { text: '全部学期', value: 0 },
      { text: '大一学期', value: 1 },
      { text: '大二学期', value: 2 },
      { text: '大三学期', value: 3 },
      { text: '大四学期', value: 4 }
    ],
    dataList:[],
    // 加载状态
    isLoading:true,
    // 数据是否为空
    isInfo:false
  },
  changeShowInfo(e){
    let ind = e.detail
  },
  // 获取列表数据
  handleGetUsedInfo(){
    this.setData({
      isLoading:true,
      isInfo:false
    })
    getUsedAppiontInfo().then((res) => {
      // console.log(res);
      if(res.code === 200){
        this.setData({
          dataList:res.data,
          isLoading:false,
          isInfo:res.data.length === 0
        })
      }else{
        handleOwnNotify("获取列表数据失败🙄")
        this.setData({
          isLoading:false,
          isInfo:true 
        })
      }
    }).catch((err) => {
      this.setData({
        isLoading:false,
        isInfo:true
      })
      handleOwnNotify("获取列表数据失败🙄")
    })
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.handleGetUsedInfo()
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