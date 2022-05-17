import Notify from "../miniprogram_npm/@vant/weapp/notify/notify";
import Dialog  from "../miniprogram_npm/@vant/weapp/dialog/dialog";

export { Notify,Dialog }; // vant 的弹出窗
// 重写存储
export {getStorageItem,setStorageItem,removeStorageItem} from "./store"
// 登录校验

export {idReg,pasReg,validForm} from "./regUtil"

// 重写的组件构造 ---》 vue
export {profileComponent} from "./profileComponent"

// 封装批量上传 formData
export {FormData,dateFormater} from "./formData"

// 权限
export {isAuthToInfo} from "./auth"


// error 提示
const handleOwnNotify = (message, type = "warning") => {
  // let top = app.globalData.statusBarHeight;
  Notify({
    type,
    message,
    // top
  });
}
export {handleOwnNotify}