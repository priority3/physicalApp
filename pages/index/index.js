// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    // 加载状态
    isLoading:true,
    // 是否预约？？？
    isAppintment:false
  },
  
  onShow() {
    setTimeout(()=>{
      this.setData({
        isLoading:false
      })
    },1000)
  },
  onHide(){
    this.setData({
      isLoading:true
    })
  },
  
  getUserProfile(e) {
    
    
      
  },
  // 点击卡片预约
  clickAppoint(){
    wx.showModal({
      title: '预约',
      content:"是否确定预约？预约成功后若修改请联系管理员！",
      success:(res)=>{
        if(res.confirm){
          this.setData({
            isAppintment:true
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
    console.log("上拉刷新");
  },
  // 监听下拉加载
  onReachBottom(){
    console.log("下拉加载");
  }
})
