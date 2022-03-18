import Notify from "../miniprogram_npm/@vant/weapp/notify/notify";
import Dialog  from "../miniprogram_npm/@vant/weapp/dialog/dialog";
export { Notify,Dialog }; // vant 的弹出窗
// 重写存储
export {getStorageItem,setStorageItem,removeStorageItem} from "./store"
// 登录校验
export {idReg,pasReg} from "./regUtil"