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

    pagination:{
      // 当前页数 始终为1
      current:1,
      // 每一页显示的内容数
      size:5,
      // 总共的条数 
      total:0
    },
    // 列表数据
    infoList:[],
    // 列表是否数据为空
    isInfo:false,
    // 下拉加载loading
    bottomLoading:false
  },
  // 获取列表数据
  handleGetInfoList(isRefresh = false){
    const {current,size} = this.data.pagination
    const _this = this
    this.setData({
      isLoading:true,
      infoList:[],
      isInfo:false
    }) 
    getAppiontList({current,size}).then((res) => {
      console.log(res,"res success");
      const {records,total,size} = res.data
      let isInfo = records.length === 0
      _this.setData({
        infoList:records,
        isLoading:false,
        isInfo,
        ['pagination.total']:total,
        ['pagination.size']:size,
        bottomLoading:false
      })
    }).catch((err) => {
      handleOwnNotify( err || "出错啦~")
      _this.setData({
        isLoading:false, 
        isInfo:true,
        bottomLoading:false
      })
      console.log(err);
    }).finally(() => {
      // 停止刷新
      if(isRefresh){
        wx.stopPullDownRefresh()
      }
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
            }else if(res.code === 500){
              handleOwnNotify("本学期已经预约🙄")
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
    // 初始化分页数据
    this.setData({
      pagination:{
        current:1,
        size:5,
        total:0
      }
    })

    this.handleGetInfoList(true)
  },
  // 监听下拉加载
  onReachBottom(){
    console.log("下拉加载");
    let {size} = this.data.pagination
    size *= 2
    this.setData({
      ['pagination.size']:size,
      bottomLoading:true
    })
    this.handleGetInfoList()
  }
})
