// pages/user/user-info/user-info.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mockData:{
      username:"张三",
      userid:"13131",
      tel:"1313",
      grade:"2018",
      major:"jisuanji"
    },
    selectColumns: [],
    selectTile:"",
    gradeColumns:["2018级","2019级","2020级","2021级"],
    majorColumns:["计算机与软件工程学院","材料学院","美术学院","体育学院","经济学院"],
    majorTitle:"请选择学院",
    popShow:false,
    isDisabled:true,
    editText:"编辑",
    btnTypeInfo:"info",
    btnLoading:false,
    avatarImg:""
  },
  // 弹出层选择年级
  selectGrade(){
    const {gradeColumns,isDisabled} = this.data
    if(isDisabled){
      return
    }
    this.setData(({
      popShow:true,
      selectColumns:gradeColumns,
      selectTile:"请选择年级"
    }))
  },
  // 弹出层选择学院
  selectMajor(){
    const {majorColumns,isDisabled} = this.data
    if(isDisabled){
      return
    }
    this.setData(({
      popShow:true,
      selectColumns:majorColumns,
      selectTile:"请选择学院"
    }))
  },
  // 关闭弹出层
  onClose() {
    this.setData({ 
      popShow: false 
    });
  },
  onConfirm(e){
    // 逻辑处理
    const {selectTile,mockData} = this.data
    if(selectTile === "请选择学院"){
      const value = e.dttail
    }
    this.onClose()
  },
  editAndSave(){
    const {isDisabled} = this.data
    this.setData({
      isDisabled:!isDisabled,
      editText:isDisabled?"保存":"编辑",
      btnTypeInfo:isDisabled?"danger":"info",
    }) 
  },
  // 更换头像
  selectAvatar(){
    wx.chooseImage({
      count: 1,
      success:(res)=>{
        if(res.tempFilePaths){
          this.setData({
            avatarImg:res.tempFilePaths[0]
          })
          wx.setStorageItem({
            avatar:res.tempFilePaths[0]
          })
        }
      },
      fail(err){
        console.log(err);
      }
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
    const avatarImg = wx.getStorageItem("avatar")
    if(avatarImg){
      this.setData({
        avatarImg
      })
    }
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