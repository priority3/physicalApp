// pages/user/freee-history/free-history.js
import {handleGetFreeHistoryList} from "../../../services/appiontList"
import {handleOwnNotify} from "../../../utils/util"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 学生预约信息
    freeInfoList:[],
    isLoading:false,
    isInfo:false
  },
  // 不渲染数据
  state:{
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {  
    this.setData({
      isLoading:true
    })
    handleGetFreeHistoryList().then((res) => {
      this.computedList(res)
    }).catch((err) => {
      this.setData({
        isInfo:true
      })
      handleOwnNotify(err)
    }).finally(() => {
      this.setData({
        isLoading:false
      })
    })

  },
  computedList(data){
    if(data.length === 0) {
      this.setData({
        isInfo:true
      })
      return
    }
    let freeInfoList = data?.map((item) => {
      return {
        ...item['studentFreeTest'],
        images:item['images'],
        isPass:item['isPass'] === 1 ? 'pass' : 'not_pass'
      }
    }) ?? []
    this.setData({
      freeInfoList
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