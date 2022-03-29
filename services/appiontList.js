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
const handleApplyFree = ({reason,semester,images}) => {
  return post('/freeTest/application',{reason,semester,images})
}

/**
 * 预约该条体测
 * @param {预约信息id} param0 
 */
const handleaAppoint = ({testId}) => {
  return post('/reserve/order',{testId})
}

/**
 * 获取学期列表
 */
const handleGetSemeter = () => {
  return new Promise((resolve,reject) => {
    get('/semester').then((res) => {
      resolve(res.data)
    }).catch(err => reject(err))
  })
}

/**
 * 获取历史免测信息
 */
const handleGetFreeHistoryList = () => {
  return new Promise((resolve,reject) => {
    get('/freeTest/freeInfo').then((res) => {
      resolve(res.data)
    }).catch((err) => reject(err))
  })
}



export {
  getAppiontList,
  getUsedAppiontInfo,
  handleApplyFree,
  handleaAppoint,
  handleGetSemeter,
  handleGetFreeHistoryList
}