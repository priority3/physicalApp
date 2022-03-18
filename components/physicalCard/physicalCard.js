// components/physicalCard/physicalCard.js

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isAppintment:{
      type:Boolean,
      value:false
    },
    customStyle:{
      type:String,
      value:''
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
    btnClick(){
      // this.triggerEvent("")
      if(this.properties.isAppintment){
        return
      }else{
        console.log("预约体测点击 physicalcard 24");
        this.triggerEvent("appiontInfo")
        
      }
    },
    // 展示详细信息
    showDetail(){
      this.setData({
        isShow:true
      })
    },
    confirmClick(){
      console.log("@");
      if(this.properties.isAppintment){
        return
      }
      this.triggerEvent("appiontInfo")
    }
  
  },
  
  // 支持多个slot
  options:{
    multipleSlots:true
  }
})
