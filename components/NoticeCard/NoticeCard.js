// components/NoticeCard/NoticeCard.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    cardTag:{
      type:String,
      value:'success'
    },
    isPass:{
      type:String,
      value:'pass'
    },
    reason:{
      type:String,
      value:'无'
    },
    semester:{
      type:String,
      value:''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    // 详细信息展示
    isShow:false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    showDetail(){
      this.setData({
        isShow:true
      })
    }
  },
  lifetimes:{
    
  }
})
