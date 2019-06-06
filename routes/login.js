const router = require('koa-router')()
router.prefix('/login')

router.post('/accountLogin', function (ctx, next) {
  ctx.success({
    token: '12312312312',
    userInfo: {
      openId: '13212312',
      nickName: '朱光勇',
      mobile: '18585511152',
    }
  })
})



module.exports = router
