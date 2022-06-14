// components/deBounceButton/deBounceButton.js
Component({
  behaviors: ['wx://form-field-button'],
  /**
   * 组件的属性列表
   */
  properties: {
    type:{
      type:String,
      value:"info"
    },
    size:{
      type:String,
      value:"normal"
    },
    disabled:{
      type:Boolean,
      value:false
    },
    loading:{
      type:Boolean,
      value:false
    },
    customStyle:{
      type:String,
      value:""
    },
    isLoading:{
      type:Boolean,
      value:false
    },
    formType:{
        type:String,
        value:""
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
    btnClick(e){
      this.triggerEvent('debouncetap', e);
    }
  },
  lifetimes:{
    attached(){
    }
  }
})
