

function setStorageItem(valueObj) {
  for (const key in valueObj) {
    if (Object.hasOwnProperty.call(valueObj, key)) {
      const value = valueObj[key];
      //  处理重复添加元素报错的情况
      //  如果元素的值相同就跳过
      if (getStorageItem(key) !== value) {
        removeStorageItem(key);
        wx.setStorageSync(key, value);
      }
    }
  }
}
function getStorageItem(key) {
  let value = wx.getStorageSync(key);
  // todo 针对一些异常处理
  return value;
  
}
/**
 * @param {键值数组} keyArr 针对键值获取
 * */
function removeStorageItem(keyArr) {
  if (typeof keyArr === "string") {
    return wx.removeStorageSync(keyArr);
  }
  for (const key of keyArr) {
    wx.removeStorageSync(key);
  }
}


export {
  getStorageItem,
  setStorageItem,
  removeStorageItem
}