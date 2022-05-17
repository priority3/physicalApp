function isAuthToInfo(){
    return !!(wx.getStorageItem(wx.KEYS['TOKEN']) || wx.getStorageItem(wx.KEYS['AUTH_INFO']))
}

export {
    isAuthToInfo,
}