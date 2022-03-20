// components/physicalCard/physicalCard.js

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 是否预约 在已预约列表数据当中权威true 
    isAppintment:{
      type:Boolean,
      value:false
    },
    // 自定义样式
    customStyle:{
      type:String,
      value:''
    },
    // 详细信息
    cardInfo:{
      type:Object,
      value:{}
    },
    // 根据index 触发 查看预约条件
    index:{
      type:Number,
      value:-1
    },
    btnLoading:{
      type:Boolean,
      value:false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isShow:false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 体测预约点击 
    btnClick(e){
      // this.triggerEvent("")
      const {index} = this.properties
      if(this.properties.isAppintment){
        return
      }else{
        this.triggerEvent("appiontInfo",{index})
      }
    },
    // 展示详细信息
    showDetail(){
      this.setData({
        isShow:true
      })
    },
    confirmClick(){
      const {index} = this.properties
      if(this.properties.isAppintment){
        return
      }
      this.triggerEvent("appiontInfo",{index})
    }
  
  },
  
  // 支持多个slot
  options:{
    multipleSlots:true
  }
})
