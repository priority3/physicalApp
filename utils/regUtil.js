
// 验证
/**
 * 
 * @param {学号} userid
 *  
 */
const idReg = (userid) => {
  if(userid.trim() === ''){
    return false
  }

  return true
}

/**
 * 校验密码 数字和英文 6-20位
 * @param {密码} word 
 */
const pasReg = (word) => {
  let flag = true
  const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/
  if(!reg.test(word)){
    flag = false
  }
  return flag

}
/**
 * 校验表单信息
 */
const validForm = (form) => {
    let res = ''
    const regMap = {
        "phone":"手机号",
        "idCard":"身份证号",
        "birth":"出生日期"
    }
    const phoneReg = /^1(3\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\d|9[0-35-9])\d{8}$/
    const idCardReg = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
    
    const {phone,idCard,birth} = form
    !phoneReg.test(phone) && (res = regMap['phone'])
    !idCardReg.test(idCard) && (res = regMap['idCard'])
    new Date(birth).getTime() > new Date().getTime() && (res = regMap['birth'])
    return res
}



export {
  idReg,
  pasReg,
  validForm
}