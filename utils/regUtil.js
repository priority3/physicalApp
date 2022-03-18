
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

const pasReg = (word) => {
  let flag = true
  const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/
  if(!reg.test(word)){
    flag = false
  }
  return flag

}


export {
  idReg,
  pasReg
}