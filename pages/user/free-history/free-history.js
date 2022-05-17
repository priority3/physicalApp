// pages/user/freee-history/free-history.js
import {handleGetFreeHistoryList,handleUsedReady} from "../../../services/appiontList"
import {handleOwnNotify,isAuthToInfo} from "../../../utils/util"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 学生预约信息
    freeInfoList:[],
    isLoading:false,
    isInfo:false,
  },
  // 不渲染数据
  state:{
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {  
    if(isAuthToInfo()){
        
    }
     
    this.setData({
      isLoading:true
    })
    this.getList()

  },
  computedList(data){
    if(data.length === 0) {
      this.setData({
        isInfo:true
      })
      return
    }
    const getIsPass = (isPass) => {
      let returnPass = ''
      switch (isPass) {
        case '0':{
          returnPass = 'is_passing'
          break;
        }
        case '1':{
          returnPass = 'pass'
          break;
        }
        case '2':{
          returnPass = 'not_pass'
          break;
        }
        default:{
          returnPass = '有问题'
        }
      }
      return returnPass
    }
    let freeInfoList = data?.map((item) => {
      return {
        ...item['studentFreeTest'],
        images:item['images'],
        isPass: getIsPass(item['studentFreeTest']['isPass']),
        auditTime:item['studentFreeTest']['auditTime'],
      }
    }) ?? []
    this.setData({
      freeInfoList
    })
  },
  handleUsedReady({detail}){
    const {id} = detail;
    handleUsedReady({id}).then((res) => {
      if(res.code === 200){
        this.getList()
      }
    }).catch((err) => console.log(err))
  },

  getList(){
    handleGetFreeHistoryList().then((res) => {
      this.computedList(res)
    }).catch((err) => {
      this.setData({
        isInfo:true
      })
      handleOwnNotify((typeof(err) === 'string' && err) || '出错啦~🙄')
    }).finally(() => {
      this.setData({
        isLoading:false
      })
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