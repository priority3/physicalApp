// pages/user/free-appiont/free-appiont.js
import {Dialog,handleOwnNotify} from "../../../utils/util"
import {handleApplyFree} from "../../../services/appiontList"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    reason:'',
    semester:'大一学期',
    fileList: [],
    option1:[
      { text: '大一学期', value: 0 },
      { text: '大二学期', value: 1 },
      { text: '大三学期', value: 2 },
      { text: '大四学期', value: 3 }
    ]
  },
  // 收集输入框内容
  colInfo(e){
    
    const {value} = e.detail
    
    this.setData({
      reason : value
    })
  },
  // 获取选择得学期列表
  changeShowInfo(e){
    const ind = e.detail
    let semester = this.data.option1[ind].text
    this.setData({
      semester
    })
  },
  submit(){
    Dialog.confirm({
      title:"提示",
      message:"是否确定提交",
    }).then(() => {
      const {reason,semester} = this.data
      if(reason.trim() === ''){
        handleOwnNotify( "申请理由不能为空🙄")
        return
      }
      handleApplyFree({reason,semester}).then((res) => {
        console.log(res);
        if(res.code === 200){
          wx.showToast({
            title: '提交成功',
          })
        }
      }).catch((err) => {
        handleOwnNotify(err || "提交失败🙄,请稍后重试")
      })
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