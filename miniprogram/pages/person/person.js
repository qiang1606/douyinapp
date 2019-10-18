// pages/person/person.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    videoUrl: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
    var self = this;
    wx.getStorage({
      key: 'allVideo',
      success(res) {
        self.setData({
          videoUrl: JSON.parse(res.data)
        })
        // 播放第一个视频
        self.videoContext = wx.createVideoContext('myVideo-0')
        self.videoContext.play()
      }
    })
  },
  onPlayEnd: function (e) {
    var self = this;
    // 播放视频的索引
    var index = Number(e.currentTarget.id.split("-")[1]);
    if (index < self.data.videoUrl.length - 1) {
      self.videoContext = wx.createVideoContext(`myVideo-${index + 1}`)
      self.videoContext.play()
    } else if (index >= self.data.videoUrl.length - 1) {
      // 播放第一个
      self.videoContext = wx.createVideoContext('myVideo-0')
      self.videoContext.play()
    }
    
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