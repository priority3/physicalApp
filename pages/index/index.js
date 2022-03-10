// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    // 加载状态
    isLoading:true,
    // dialog 显示状态
    isShow:false 
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
  // 显示详细信息
  showCardDetail(){
    this.setData({
      isShow:true
    })
  },
  // 关掉dialog弹窗
  onClose(){
    this.setData({
      isShow:false
    })
  },
  getUserProfile(e) {
    
    
      
  },
  showCardDetail(){
    console.log("detail card show");
    this.setData({
      isShow:true
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
