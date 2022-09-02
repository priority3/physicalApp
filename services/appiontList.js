import {get,post} from "./http.js"

/**
 * 获取体测列表
 * @param {当前页数，每一页显示得条数} param 
 */
const getAppiontList = ({current,size}) => {
  return get('/reserve/testList',{current,size})
}
/**
 * 获取已预约体测列表
 */
const getUsedAppiontInfo = () => {
  return get('/reserve/orderInfo')
}
/**
 * 申请免测
 * @param {申请原因，申请学期，图片} param0 
 */
const handleApplyFree = (formData) => {
    console.log(formData);
  return post('/freeTest/application',formData)
}

/**
 * 预约该条体测
 * @param {预约信息id} param0 
 */
const handleaAppoint = ({testId}) => {
  return new Promise((resolve,reject) => {
    post('/reserve/order',{testId}).then((res) => {
      if(res.code === 200){
        resolve(res.msg)
      }else{
        reject(res.msg)
      }
    }).catch((err) => {
      reject(err.msg)
    })
  })
}

/**
 * 获取学期列表
 */
const handleGetSemeter = () => {
  return new Promise((resolve,reject) => {
    get('/semester').then((res) => {
      if(res.code !== 200){
         reject(res.data)
      }else{
          resolve(res.data)
      }
    }).catch(err => reject(err))
  })
}

/**
 * 获取历史免测信息
 */
const handleGetFreeHistoryList = ({name,userName}) => {
  return new Promise((resolve,reject) => {
    get('/freeTest/freeInfo',{name,userName}).then((res) => {
      resolve(res.data)
    }).catch((err) => reject(err.msg))
  })
}

/**
 * 获取是否有未读的消息
 */
const handleGetMessage = () => {
  return new Promise((resolve,reject) => {
    get('/freeTest/hasMessage').then((res) => {
      resolve(res.data)
    }).catch((err) => reject(err))
  })
}
/**
 * 置为已读消息
 * @param {通过免测id获得信息} param0 
 */
const handleUsedReady = ({id}) => {
  return new Promise((resolve,reject) => {
    get('/freeTest/getById',{id}).then((res) => {
      resolve(res)
    }).catch((err) => reject(err))
  })
}





export {
  getAppiontList,
  getUsedAppiontInfo,
  handleApplyFree,
  handleaAppoint,
  handleGetSemeter,
  handleGetFreeHistoryList,
  handleGetMessage,
  handleUsedReady
}