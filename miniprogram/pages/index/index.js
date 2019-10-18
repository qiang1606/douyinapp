//index.js
const app = getApp()


Page({
  data: {
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    allVideo: [],
  },

  onLoad: function() {
    if (!wx.cloud) {
      wx.redirectTo({
        url: '../chooseLib/chooseLib',
      })
      return
    }
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo
              })
            }
          })
        }
      }
    })
  },
  // 获取用户信息
  onGetUserInfo: function (e) {
    if (e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
    }
  },
  // 上传视频
  doUpload: function() {
    // 选择视频
    var self = this;
    wx.chooseVideo({
      sourceType: ['album', 'camera'],
      maxDuration: 60,
      camera: 'back',
      success(res) {
        wx.showLoading({
          title: '上传中...',
          mask: false,
        })

        wx.cloud.callFunction({
          // 云函数名称
          name: 'addVideo',
          // 传给云函数的参数
          data: {
            url: res.tempFilePath
          },
          success: function(res) {
            wx.hideLoading();
            wx.showToast({
              // 上传成功
              title: "上传成功",
              icon: "success",
            })
          },
          fail: console.error
        })
      }
    })
  },

})