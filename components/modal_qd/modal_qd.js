// components/modal_qd.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    show: { // 属性名
      type: Boolean, // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
      value: false, // 属性初始值（可选），如果未指定则会根据类型选择一个
      observer: function (newVal, oldVal, changedPath) {
        // 属性被改变时执行的函数（可选），也可以写成在methods段中定义的方法名字符串, 如：'_propertyChange'
        // 通常 newVal 就是新设置的数据， oldVal 是旧数据
  
      }
    },
    score: String // 简化的定义方式
  },

  /**
   * 组件的初始数据
   */
  data: {
    _show:false,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    _closeModal(){
      this.setData({
        show: false
      })
    },
    // _closeModal() {
    //   var myEventDetail = {} // detail对象，提供给事件监听函数
    //   var myEventOption = {} // 触发事件的选项
    //   this.triggerEvent('closeModal', myEventDetail, myEventOption)
    // }
  }
})