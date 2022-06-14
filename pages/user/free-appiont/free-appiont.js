// pages/user/free-appiont/free-appiont.js
import { Dialog, handleOwnNotify, validForm, dateFormater } from "../../../utils/util"
import { handleApplyFree, handleGetSemeter } from "../../../services/appiontList"
// import {FREE_APPROVE} from "../../../config/keys"
// 提交表达锁
const isChangeFlag = true

const approveTypeMap = {
    "普通免测申请": 0,
    "缓测申请": 1,
    "其他免测申请": 2
}
// 时间戳的最小值 为当前事件的50年前，转换为时间戳：24*60*60*1000*50*365
const minusDate = 24 * 60 * 60 * 1000 * 40 * 365

Page({
    /**
     * 页面的初始数据
     */
    data: {
        formData: {},
        reason: '',
        // 申请学期
        semester: '',
        // 申请得备注
        remark: '',
        fileList: [],
        // 远端保存图片链接 
        handleList: [],
        // 免测类型
        approveType: "",
        currentDate: new Date().getTime(),
        minDate: new Date().getTime() - minusDate,
        maxDate: new Date().getTime(),
        birthDailogShow: false,
        formatter(type, value) {
            type === 'year' && (value += '年')
            type === 'month' && (value += '月')
            type === 'day' && (value += '日')
            return value;
        },
        formBirthDate: "",
        formData: ''
    },
    // 获取学期列表
    handleGetSemester() {
        handleGetSemeter().then((res) => {
            this.computedList(res)
        })
    },
    // 对结果得重新处理
    computedList(data) {
        let selectOption = data?.map((item, index) => {
            return {
                text: item,
                value: index
            }
        }) ?? []
        this.setData({
            selectOption,
            semester: selectOption[0].text
        })
    },
    // 收集输入框内容
    colReason(e) {
        const { value } = e.detail
        let str = value
        if (value.length > 200) {
            str = value.substring(0, 200)
        }
        this.setData({
            reason: str
        })
    },
    // 收集备注
    colRemark(e) {
        const { value } = e.detail
        let str = value
        if (value.length > 50) {
            str = value.substring(0, 50)
        }
        this.setData({
            remark: str
        })
    },
    // 获取申请得免测类型
    changeFreeType(e) {
        const type = e.detail
        this.setData({
            type
        })
    },
    // 获取选择得学期列表
    changeShowInfo(e) {
        const ind = e.detail
        let semester = this.data.selectOption[ind].text
        this.setData({
            semester,
        })
    },

    handleFixedInfo(formInfo) {
        const formData = this.data.formData
        const isAuth = wx.getStorageItem('isAuth')
        if (!formData && isAuth) {
            this.setData({
                formData:JSON.parse(isAuth)
            })
        }
        Dialog.confirm({
            title: "提示",
            message: "将收集你的信息提交到后台，是否确定提交",
        }).then(async () => {
            const { reason, semester, handleList, approveType, remark } = this.data
            const type = approveTypeMap[approveType]
            const { valid, errMsg } = this.handleValid(formInfo)
            if (!valid) {
                handleOwnNotify(errMsg[0])
                return
            }
            let params = type !== 2 ? { reason, semester, handleList, type } : { reason, semester, handleList, remark, type }
            await this.batchUpload(params)
        }).catch(() => {

        })
    },
    // 校验
    handleValid(formInfo) {
        let valid = true
        const errMsg = []
        const { reason, remark, approveType,formBirthDate } = this.data
        if (!reason.trim() || (approveType === '2' && !remark.trim())) {
            errMsg.push("申请理由不能为空🙄")
            valid = false
        }
        const list = formInfo.detail.value
        let validValue = Object.values(list)
        for (let i = 0; i < validValue.length; i++) {
            if (!validValue[i] || !validValue[i].trim()) {
                errMsg.push("请填写完整的信息~")
                valid = false
                break
            }
        }
        let res = validForm(Object.assign(list, { 'birth': formBirthDate }))
        if (res) {
            errMsg.push(`请填写正确的${res}`)
            valid = false
        }
        let form = Object.create({})
        form['birth'] = formBirthDate
        Object.keys(list).map((item) => {
            if (item !== '1' && item !== '2') {
                if (item === 'sex') {
                    form[item] = list[item] === '1' ? "男" : "女"
                } else {
                    form[item] = list[item]
                }
            }
        })
        if (valid) {
            wx.setStorageItem({ 'isAuth': JSON.stringify(form) })
            this.setData({
                formData: form
            })
        }
        console.log(form);
        return { valid, errMsg }
    },
    // 封装 提交图片操作
    batchUpload({ reason, semester, handleList, type, remark }) {
        const formData = this.data.formData
        handleApplyFree(Object.assign({ reason, semester, images: handleList, type, remark }, formData)).then((res) => {
            handleOwnNotify('提交申请成功', 'success')
            setTimeout(() => {
                wx.router.pop(1)
            }, 1000)
        }).catch((err) => {
            handleOwnNotify((typeof (err.msg) && err.msg) || '提交申请失败')
        })
    },
    //   出生日期框可见
    changeBirthDailogStatus() {
        let status = !this.data.birthDailogShow
        this.setData({
            birthDailogShow: status
        })
    },
    // 得到出生日期
    handleGetBirth(e) {
        const date = dateFormater(e.detail)
        this.setData({
            currentDate: e.detail,
            formBirthDate: date
        })
        console.log(date);
        this.changeBirthDailogStatus()
    },
    handleGetBirth(e) {
        const date = dateFormater(e.detail)
        this.setData({
            currentDate: e.detail,
            formBirthDate: date
        })
        this.changeBirthDailogStatus()
    },
    afterRead(event) {
        const { file } = event.detail;
        const token = wx.getStorageItem("token")
        const _this = this
        let handleList = []
        let fileList = [...this.data.fileList]
        const len = fileList.length
        file.forEach((item, ind) => {
            fileList.push({
                ...item,
            })
        })
        file.forEach((item, ind) => {
            wx.uploadFile({
                filePath: item.url,
                name: 'file',
                url: 'https://physicaltest.weilylab.com:8282/freeTest/uploadImg',
                header: {
                    token
                },
                formData: {

                },
                success(res) {
                    // token 过期 
                    const getData = JSON.parse(res.data)
                    if (getData.code === 10001) {
                        wx.clearStorageSync()
                        wx.router.replace("/pages/login/login", { msg: getData.msg })
                    }
                    if (getData.code !== 200) {
                        _this.setData({
                            [`fileList[${len + ind}]`]: {
                                ...item,
                                status: 'failed',
                                message: '上传失败',
                            }
                        })
                    } else {
                        handleList.push(getData.data)
                        _this.setData({
                            [`fileList[${len + ind}]`]: {
                                ...item,
                                status: '',
                                message: '',
                            }
                        })
                    }
                },
                fail(err) {
                    _this.setData({
                        [`fileList[${len + ind}]`]: {
                            ...item,
                            status: 'failed',
                            message: '上传失败',
                        }
                    })
                    handleOwnNotify('上传图片失败，请稍后重试！！')
                },
                complete() {

                }
            })
        })
        this.setData({
            fileList,
            handleList
        })

    },
    deleteFile(e) {
        const { index } = e.detail
        let fileList = this.data.fileList.filter((item, ind) => {
            return ind !== index
        })
        this.setData({
            fileList
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        const isAuth = wx.getStorageItem('isAuth')
        const formData = isAuth ? JSON.parse(isAuth) : ""
        const { birth } = formData
        const curDate = new Date(birth).getTime()
        if (formData) {
            this.setData({
                list: formData,
                currentDate: curDate,
                formBirthDate: dateFormater(curDate),
                approveType: options.normal_approve
            })
        } else {
            this.setData({
                approveType: options.normal_approve
            })
        }

        this.handleGetSemester()
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