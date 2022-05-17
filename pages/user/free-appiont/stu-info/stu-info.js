// pages/user/free-appiont/stu-info/stu-info.js
import {dateFormater,handleOwnNotify,validForm} from "../../../../utils/util"
Page({

    /**
     * 页面的初始数据
     */
    data: {
        currentDate: new Date().getTime(),
        birthDailogShow:false,
        formatter(type, value) {
            type === 'year' && (value+='年')
            type === 'month' && (value+='月')
            type === 'day' && (value+='日')
            return value;
        },
        formBirthDate:""
    },
    handleFixedInfo(e){
        const date = this.data.formBirthDate
        const list = e.detail.value 
        let validValue = Object.values(list)
        for(let i = 0 ; i < validValue.length ; i++){
            if(!validValue[i] || !validValue[i].trim()|| !date){
                handleOwnNotify("请填写完整的信息~")
                return
            }
        }
        let res = validForm(Object.assign(list,{'birth':date}))
        if(res) {
            handleOwnNotify(`请填写正确的${res}`)
            return
        }
        let form = Object.create({})
        form['birth'] = date
        Object.keys(list).map((item) => {
            if(item !== '1' && item !== '2'){
                if(item === 'sex'){
                    form[item] = list[item] === '1' ? "男" : "女"
                }else{
                    
                    form[item] = list[item]
                }
            }
        })
        wx.setStorageItem({'isAuth':JSON.stringify(form)})
        wx.router.pop(-1)
    },
    changeBirthDailogStatus(){
        let status = !this.data.birthDailogShow
        this.setData({
            birthDailogShow:status
        })
    },
    handleGetBirth(e){
        const date = dateFormater(e.detail)
        this.setData({
            currentDate:e.detail,
            formBirthDate:date
        })
        this.changeBirthDailogStatus()
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        // 可能存在修改信息
        const formData = JSON.parse(wx.getStorageItem('isAuth'))
        const {birth} = formData
        const curDate = new Date(birth).getTime()
        if(formData){
            this.setData({
                list:formData,
                currentDate:curDate,
                formBirthDate:dateFormater(curDate)
            })
        }
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})