// components/physicalCard/physicalCard.js

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isAppintment:{
      type:Boolean,
      value:false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    showDetail(){
      // this.triggerEvent("")
      console.log("预约体测点击 physicalcard 24");
      wx.showModal({
        title: '预约',
        content:"是否确定预约？预约成功后若修改请联系管理员！",
        success:(res)=>{
          console.log(res);
          if(res.confirm){
            _this.setData({
              isAppintment:true
            })
          }
        },
        fail(err){
          console.log(err);
        }
      })
    }
  },
  // 支持多个slot
  options:{
    multipleSlots:true
  }
})
