// pages/user/free-appiont/free-appiont.js
import {Dialog,handleOwnNotify,FormData}  from "../../../utils/util"
import {handleApplyFree,handleGetSemeter} from "../../../services/appiontList"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    reason:'',
    semester:'大一学期',
    fileList: [],
    // 远端保存图片链接 
    handleList:[],
    selectOption:[
      { text: '大一学期', value: 0 },
      { text: '大二学期', value: 1 },
      { text: '大三学期', value: 2 },
      { text: '大四学期', value: 3 }
    ]
  },
  // 获取学期列表
  handleGetSemester(){
    handleGetSemeter().then((res) => {
      this.computedList(res)
    })
  },
  // 对结果得重新处理
  computedList(data){
    let selectOption = data?.map((item,index) => {
      return {
        text:item,
        value:index
      }
    })??[]
    this.setData({
      selectOption
    })
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
    let semester = this.data.selectOption[ind].text
    this.setData({
      semester
    })
  },
  submit(){
    Dialog.confirm({
      title:"提示",
      message:"是否确定提交",
    }).then(async () => {
      const {reason,semester,fileList} = this.data
      if(reason.trim() === ''){
        handleOwnNotify( "申请理由不能为空🙄")
        return
      }
      await this.batchUpload({reason,semester,fileList})
      // handleApplyFree({reason,semester}).then((res) => {
      //   console.log(res);
      //   if(res.code === 200){
      //     wx.showToast({
      //       title: '提交成功',
      //     })
      //   }
      // }).catch((err) => {
      //   handleOwnNotify(err || "提交失败🙄,请稍后重试")
      // })
    }).catch(()=>{

    })
  },
  // 封装 提交图片操作
  batchUpload({reason,semester,fileList}){
    const token = wx.getStorageItem("token")
    fileList.forEach((item,ind) => {
      this.setData({
        [`fileList[${ind}]`]:{
          ...item,
          status: 'uploading',
          message: '上传中',
        }
      })
      const _this = this
      wx.uploadFile({
        filePath: item.url,
        name: 'file',
        url: 'http://114.55.254.24:8282/freeTest/uploadImg',
        header:{
          token
        },
        formData:{
          reason,
          semester
        },
        success(res){
          // token 过期 
          console.log(res);
          const getData = JSON.parse(res.data)
          if(getData.code === 10001){
            wx.clearStorageSync()
            wx.router.replace("/pages/login/login",{msg:getData.msg})
          }
          if(getData.code === 200){
            let handleList = [..._this.data.handleList,getData.data]
            _this.setData({
              handleList
            })
            if(handleList.length === fileList.length ){
              handleApplyFree({reason,semester,images:handleList}).then((res) => {
                handleOwnNotify('上传成功','success')
              }).catch((err) => {
                handleOwnNotify(err || '失败了噢~')
              })
            }
          }else{
            _this.setData({
              [`fileList[${ind}]`]:{
                ...item,
                status: 'failed',
                message: '上传失败',
              }
            })
          }
        },
        fail(err){
          console.log(err);
          _this.setData({
            [`fileList[${ind}]`]:{
              ...item,
              status: 'failed',
              message: '上传失败',
            }
          })
        },
        complete(){
          _this.setData({
            [`fileList[${ind}]`]:{
              ...item,
              status: '',
              message: '',
            }
          })
        }
      })
    })
    
  },



  afterRead(event) {
    const { file } = event.detail;
    let fileList = [...this.data.fileList]
    file.forEach((item,index) => {
      fileList.push({
        ...item,
        
      })
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
    this.handleGetSemester()
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