// index.js
import {getAppiontList,handleaAppoint} from "../../services/appiontList"
import { handleOwnNotify } from "../../utils/util"
// 获取应用实例
const app = getApp()

Page({
  data: {
    // 页面加载状态
    isLoading:true,
    // 预约加载状态
    btnLoading:false,
    // 当前页数
    current:1,
    // 每一页显示的内容数
    size:5,
    // 列表数据
    infoList:[],
    // 列表是否数据为空
    isInfo:false
  },
  // 获取列表数据
  handleGetInfoList(){
    const {current,size} = this.data
    const _this = this
    this.setData({
      isLoading:true,
      infoList:[],
      isInfo:false
    })
    getAppiontList({current,size}).then((res) => {
      console.log(res,"res success");
      const {records} = res.data
      let isInfo = records.length === 0
      _this.setData({
        infoList:records,
        isLoading:false,
        isInfo
      })
    }).catch((err) => {
      handleOwnNotify( err || "出错啦~")
      _this.setData({
        isLoading:false, 
        isInfo:true
      })
      console.log(err);
    }).finally(() => {
    
    })
  },

  onLoad(){
    this.handleGetInfoList()
  },
  
  onShow() {
  },
  onHide(){
    
  },
  
  getUserProfile(e) {
     
  },
  // 点击卡片预约
  clickAppoint({index}){
    wx.showModal({
      title: '预约',
      content:"是否确定预约？预约成功后若修改请联系管理员！",
      success:(res)=>{
        if(res.confirm){
          handleaAppoint({testId:index}).then((res) => {
            if(res.code === 200){
              wx.showToast({
                title: '预约成功',
              })
              // 重新获取列表信息
              getAppiontList()
            }else{
              handleOwnNotify("预约失败🙄")
            }
          }).catch((err) => {
            handleOwnNotify(err || "预约失败，请稍后重试🙄")
          })
        }
      },
      fail(err){
        console.log(err);
      }
    })
  },
  getUserInfo(e) {
    console.log(e);
  },
  // 监听下拉刷新
  onPullDownRefresh(){
    this.handleGetInfoList()
  },
  // 监听下拉加载
  onReachBottom(){
    console.log("下拉加载");
  }
})
