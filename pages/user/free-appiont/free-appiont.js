// pages/user/free-appiont/free-appiont.js
import {Dialog} from "../../../utils/util"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    textinfo:'',
    fileList: [],
  },
  // 收集输入框内容
  colInfo(e){
    const {value} = e.detail
    this.setData({
      textinfo : value
    })
  },
  submit(){
    Dialog.confirm({
      title:"提示",
      message:"是否确定提交",
    }).then(() => {
      const {textinfo} = this.data
      console.log(textinfo);
    }).catch(()=>{

    })
  },
  afterRead(event) {
    const { file } = event.detail;
    let fileList = [...this.data.fileList]
    file.forEach((item) => {
      fileList.push(item)
    })
    this.setData({
      fileList
    })
    
  },
  deleteFile(e) {
    const {index} = e.detail
    let fileList = this.data.fileList.filter((item,ind) => {
      return ind !== index
    })
    this.setData({
      fileList
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