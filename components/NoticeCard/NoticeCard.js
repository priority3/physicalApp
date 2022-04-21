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
    // 是否通过
    isPass:{
      type:String,
      value:'pass'
    },
    // 申请理由
    reason:{
      type:String,
      value:'无'
    },
    // 申请学期
    semester:{
      type:String,
      value:''
    },
    // 审核时间
    auditTime:{
      type:String,
      value:''
    },
    // 是否已读
    isRead:{
      type:String,
      value:''
    },
    // 审批人
    handler:{
      type:String,
      value:"教师"
    },
    // 审批结果
    auditMessage:{
      type:String,
      value:'无'
    },
    // 免测人id
    index:{
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
      // 点击了详细信息
      const {index} = this.properties
      this.triggerEvent("showDetail",{id:index})
    }
  },
  lifetimes:{
    
  }
})
