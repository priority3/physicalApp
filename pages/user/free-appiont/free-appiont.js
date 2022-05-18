// pages/user/free-appiont/free-appiont.js
import {Dialog,handleOwnNotify,FormData}  from "../../../utils/util"
import {handleApplyFree,handleGetSemeter} from "../../../services/appiontList"
// import {FREE_APPROVE} from "../../../config/keys"
// 提交表达锁
const isChangeFlag = true

const approveTypeMap = {
    "普通免测申请":0,
    "缓测申请":1,
    "其他免测申请":2
}


Page({

  /**
   * 页面的初始数据
   */
  data: {
    formData:{},
    reason:'',
    // 申请学期
    semester:'',
    // 申请得备注
    remark:'',
    fileList: [],
    // 远端保存图片链接 
    handleList:[],
    // 免测类型
    approveType:""
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
      selectOption,
      semester:selectOption[0].text
    })
  },
  // 收集输入框内容
  colReason(e){
    const {value} = e.detail
    let str = value
    if(value.length > 200){
      str = value.substring(0,200)
    }
    this.setData({
      reason : str
    })
  },
  // 收集备注
  colRemark(e){
    const {value} = e.detail
    let str = value
    if(value.length > 50){
      str = value.substring(0,50)
    }
    this.setData({
      remark : str
    })
  },
  // 获取申请得免测类型
  changeFreeType(e){
    const type = e.detail
    this.setData({
      type
    })
  },
  // 获取选择得学期列表
  changeShowInfo(e){
    const ind = e.detail
    let semester = this.data.selectOption[ind].text
    this.setData({
      semester,
    })
  },
  
  submit(){
    const isAuth = wx.getStorageItem('isAuth')
    const formData = isAuth ? JSON.parse(isAuth) : ""
    if(formData){
        this.setData({
            formData
        })
    }else{
        wx.router.push("/pages/user/free-appiont/stu-info/stu-info")
        return
    }
    Dialog.confirm({
      title:"提示",
      message:"是否确定提交",
    }).then(async () => {
      const {reason,semester,handleList,approveType,remark} = this.data
      const type = approveTypeMap[approveType]
      if(reason.trim() === ''){
        handleOwnNotify( "申请理由不能为空🙄")
        return
      }
      let params = type !== 2 ? {reason,semester,handleList,type} : {reason,semester,handleList,remark,type}
      await this.batchUpload(params)
      // 返回上一级页面
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
  batchUpload({reason,semester,handleList,type,remark}){
    const formData = this.data.formData
    handleApplyFree(Object.assign({reason,semester,images:handleList,type,remark},formData)).then((res) => {
      handleOwnNotify('提交申请成功','success')
      setTimeout(() => {
        wx.router.pop(1)
      },1000)
    }).catch((err) => {
      handleOwnNotify((typeof(err.msg) && err.msg) || '提交申请失败')
    })
  },
  afterRead(event) {
    const { file } = event.detail;
    const token = wx.getStorageItem("token")
    const _this = this
    let handleList = []
    let fileList = [...this.data.fileList]
    const len = fileList.length
    file.forEach((item,ind) => {
      fileList.push({
        ...item,
      })
    })
    file.forEach((item,ind) => {
      wx.uploadFile({
        filePath: item.url,
        name: 'file',
        url: 'https://physicaltest.weilylab.com:8282/freeTest/uploadImg',
        header:{
          token
        },
        formData:{
          
        },
        success(res){
          // token 过期 
          const getData = JSON.parse(res.data)
          if(getData.code === 10001){
            wx.clearStorageSync()
            wx.router.replace("/pages/login/login",{msg:getData.msg})
          }
          if(getData.code !== 200){
            _this.setData({
              [`fileList[${len+ind}]`]:{
                ...item,
                status: 'failed',
                message: '上传失败',
              }
            })
          }else{
            handleList.push(getData.data)
            _this.setData({
              [`fileList[${len+ind}]`]:{
                ...item,
                status: '',
                message: '',
              }
            })
          }
        },
        fail(err){
          _this.setData({
            [`fileList[${len+ind}]`]:{
              ...item,
              status: 'failed',
              message: '上传失败',
            }
          })
          handleOwnNotify('上传图片失败，请稍后重试！！')
        },
        complete(){
          
        }
      })
    })
    this.setData({
      fileList,
      handleList
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
    this.setData({
        approveType:options.normal_approve
    })
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