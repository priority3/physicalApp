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
      size:2,
      // 总共的条数 
      total:0
    },
    // 列表数据
    infoList:[],
    // 列表是否数据为空
    isInfo:false,
    // 下拉加载loading
    bottomLoading:false,
    // 数据是否全部加载完毕,
    isInfoFull:false,
    
  },
  // 获取列表数据
  handleGetInfoList(isRefresh = false){
    const {current,size} = this.data.pagination
    const _this = this
    this.setData({
      isLoading:true,
      infoList:[],
      isInfo:false,
      bottomLoading:true
    }) 
    getAppiontList({current,size}).then((res) => {
      const {records,total,size} = res.data
      let isInfo = records?.length === 0
      let isInfoFull = records?.length < size || records?.length === total
      _this.setData({
        infoList:records,
        isLoading:false,
        isInfo,
        ['pagination.total']:total,
        ['pagination.size']:size,
        bottomLoading:false,
         isInfoFull
      })
    }).catch((err) => {
      handleOwnNotify( (typeof(err) === 'string'  && err) || "出错啦~🙄")
      _this.setData({
        isLoading:false, 
        isInfo:true,
        bottomLoading:false,
        isInfoFull:true
      })
      console.log(err);
    }).finally(() => {
      // 停止刷新
      if(isRefresh){
        wx.stopPullDownRefresh()
      }
    })
  },

  // 上拉加载获取数据
  handleGetBottomList(){
    const {isInfoFull} = this.data
    if(isInfoFull) return
    let {current,size} = this.data.pagination
    current += 1
    this.setData({
      bottomLoading:true,
      ['pagination.current']:current
    })
    getAppiontList({current,size}).then((res) => {
      const {records,total,size} = res.data
      // 上拉已经到底 
      if(records.length === 0){
        this.setData({
          isInfoFull:true,
          // isBottomHttp:true
        })
        return
      }
      let infoList = this.data.infoList.concat(records)
      this.setData({
        infoList
      })
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
  clickAppoint(data){
    const {index} = data.detail
    let {current,size} = this.data.pagination
    wx.showModal({
      title: '预约',
      content:"是否确定预约？预约成功后若修改请联系管理员！",
      success:(res)=>{
        if(res.confirm){
          handleaAppoint({testId:index}).then((res) => {
            wx.showToast({
              title: res || '预约成功',
            })
          }).catch((err) => {
            handleOwnNotify(err || "本学期已经预约🙄")
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
        size:2,
        total:0,
        
      },
      isInfoFull:false,
    })

    this.handleGetInfoList(true)
  },
  // 监听下拉加载
  onReachBottom(){
    
    this.handleGetBottomList()
  }
})
